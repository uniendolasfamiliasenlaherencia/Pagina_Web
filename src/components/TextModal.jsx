import React, { useEffect, useMemo, useRef, useState } from 'react';

const TextModal = ({ isOpen, title, content, onClose, youtubeId, youtubeIds = [], youtubeTypes = [], videoLayout = 'auto' }) => {
  const playersRef = useRef({});
  const iframeRefMap = useRef({});
  const ytApiPromiseRef = useRef(null);
  const [availableVideos, setAvailableVideos] = useState(null);
  const [failedVideoIds, setFailedVideoIds] = useState([]);
  const [isCheckingVideos, setIsCheckingVideos] = useState(false);
  const [instanceId, setInstanceId] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Bloquea el scroll de la página
      document.body.style.overflow = 'hidden';
      setFailedVideoIds([]);
      setInstanceId((prev) => prev + 1);
    } else {
      // Desbloquea el scroll y limpia todos los videos
      document.body.style.overflow = 'unset';
      Object.values(iframeRefMap.current).forEach((iframe) => {
        if (iframe) {
          iframe.src = '';
        }
      });
      iframeRefMap.current = {};
      Object.values(playersRef.current).forEach((player) => {
        if (player && typeof player.destroy === 'function') {
          player.destroy();
        }
      });
      playersRef.current = {};
    }

    // Limpia el efecto cuando el componente se desmonta
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const videosRaw = useMemo(() => {
    const ids = youtubeIds.length > 0 ? youtubeIds : (youtubeId ? [youtubeId] : []);
    return ids.map((id, index) => ({ id, type: youtubeTypes[index] || 'video' }));
  }, [youtubeId, youtubeIds, youtubeTypes]);

  useEffect(() => {
    if (!isOpen) {
      setAvailableVideos(null);
      setIsCheckingVideos(false);
      return;
    }

    let isActive = true;
    const controllers = [];

    setIsCheckingVideos(true);
    setAvailableVideos([]);

    const checkByOEmbed = async (videoId, controller, type) => {
      const videoUrl = type === 'short'
        ? `https://www.youtube.com/shorts/${videoId}`
        : `https://www.youtube.com/watch?v=${videoId}`;
      const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          return false;
        }
        return true;
      }
      return true;
    };

    const checkByThumbnail = (videoId) => (
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      })
    );

    const checkAvailability = async () => {
      const results = await Promise.all(
        videosRaw.map(async (video) => {
          const controller = new AbortController();
          controllers.push(controller);
          try {
            const oembedOk = await checkByOEmbed(video.id, controller, video.type);
            const thumbOk = await checkByThumbnail(video.id);
            return oembedOk && thumbOk;
          } catch (error) {
            return true;
          }
        })
      );

      if (isActive) {
        const filtered = videosRaw.filter((_, index) => results[index]);
        setAvailableVideos(filtered);
        setIsCheckingVideos(false);
      }
    };

    checkAvailability();

    return () => {
      isActive = false;
      controllers.forEach((controller) => controller.abort());
    };
  }, [isOpen, videosRaw]);

  const videos = availableVideos ?? videosRaw;
  const filteredVideos = videos.filter((video) => !failedVideoIds.includes(video.id));
  const videoElements = useMemo(
    () => filteredVideos.map((video, index) => ({ ...video, elementId: `yt-${instanceId}-${video.id}-${index}` })),
    [filteredVideos, instanceId]
  );

  const loadYouTubeApi = () => {
    if (ytApiPromiseRef.current) return ytApiPromiseRef.current;
    ytApiPromiseRef.current = new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(null);
        return;
      }
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
        return;
      }
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
      }
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previous === 'function') {
          previous();
        }
        resolve(window.YT);
      };
    });
    return ytApiPromiseRef.current;
  };

  useEffect(() => {
    if (!isOpen || isCheckingVideos || videoElements.length === 0) return undefined;

    let isActive = true;

    const initPlayers = async () => {
      const ytApi = await loadYouTubeApi();
      if (!isActive || !ytApi || !ytApi.Player) return;

      videoElements.forEach((video) => {
        if (playersRef.current[video.elementId]) return;
        const player = new ytApi.Player(video.elementId, {
          videoId: video.id,
          playerVars: {
            autoplay: 0,
            playsinline: 1
          },
          events: {
            onReady: (event) => {
              try {
                event.target.cueVideoById(video.id);
              } catch (error) {
                setFailedVideoIds((prev) => (
                  prev.includes(video.id) ? prev : [...prev, video.id]
                ));
              }
            },
            onError: () => {
              const activePlayer = playersRef.current[video.elementId];
              if (activePlayer && typeof activePlayer.destroy === 'function') {
                activePlayer.destroy();
              }
              delete playersRef.current[video.elementId];
              setFailedVideoIds((prev) => (
                prev.includes(video.id) ? prev : [...prev, video.id]
              ));
            }
          }
        });
        playersRef.current[video.elementId] = player;
      });
    };

    initPlayers();

    return () => {
      isActive = false;
    };
  }, [isOpen, isCheckingVideos, videoElements]);

  const renderIframe = (video, iframeTitle) => (
    <iframe
      id={video.elementId}
      ref={(el) => {
        if (el) {
          iframeRefMap.current[video.elementId] = el;
        }
      }}
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1`}
      title={iframeTitle}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );

  const renderVideoBox = (video, index, titleSuffix) => (
    <div key={video.id} className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
      {renderIframe(video, `${title} - ${titleSuffix ?? `Video ${index + 1}`}`)}
    </div>
  );

  const renderShortBox = (video, index, titleSuffix) => (
    <div key={video.id} className="w-full max-w-[320px] md:max-w-[360px] mx-auto aspect-[9/16] rounded-lg overflow-hidden shadow-md">
      {renderIframe(video, `${title} - ${titleSuffix ?? `Video ${index + 1}`}`)}
    </div>
  );

  const renderVideoRow = (rowItems) => (
    <div className={`grid grid-cols-1 ${rowItems.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
      {rowItems.map((video, index) => renderVideoBox(video, index))}
    </div>
  );

  const renderShortRow = (rowItems) => (
    <div className={`grid grid-cols-1 ${rowItems.length > 1 ? 'md:grid-cols-2' : ''} gap-4 justify-items-center`}>
      {rowItems.map((video, index) => renderShortBox(video, index))}
    </div>
  );

  const renderStacked = (stackItems) => (
    <div className="flex flex-col gap-4">
      {stackItems.map((video, index) => (
        video.type === 'short'
          ? renderShortBox(video, index)
          : renderVideoBox(video, index)
      ))}
    </div>
  );

  const renderAutoLayout = () => {
    if (videoElements.length === 0) return null;

    const videoItems = videoElements.filter((video) => video.type === 'video');
    const shortItems = videoElements.filter((video) => video.type === 'short');

    if (videoElements.length === 1) {
      return videoElements[0].type === 'short'
        ? renderShortRow([videoElements[0]])
        : renderVideoRow([videoElements[0]]);
    }

    if (videoElements.length === 2) {
      if (videoItems.length === 2) return renderVideoRow(videoItems);
      if (shortItems.length === 2) return renderShortRow(shortItems);
      return renderStacked(videoElements);
    }

    if (videoElements.length === 3) {
      if (videoItems.length === 2 && shortItems.length === 1) {
        return (
          <div className="flex flex-col gap-4">
            {renderVideoRow(videoItems)}
            {renderShortRow(shortItems)}
          </div>
        );
      }
      if (shortItems.length === 2 && videoItems.length === 1) {
        return (
          <div className="flex flex-col gap-4">
            {renderShortRow(shortItems)}
            {renderVideoRow(videoItems)}
          </div>
        );
      }
      if (videoItems.length === 3) {
        return (
          <div className="flex flex-col gap-4">
            {renderVideoRow(videoItems.slice(0, 2))}
            {renderVideoRow([videoItems[2]])}
          </div>
        );
      }
      if (shortItems.length === 3) {
        return (
          <div className="flex flex-col gap-4">
            {renderShortRow(shortItems.slice(0, 2))}
            {renderShortRow([shortItems[2]])}
          </div>
        );
      }
      return renderStacked(videoElements);
    }

    if (videoElements.length === 4) {
      if (videoItems.length === 2 && shortItems.length === 2) {
        return (
          <div className="flex flex-col gap-4">
            {renderVideoRow(videoItems)}
            {renderShortRow(shortItems)}
          </div>
        );
      }
      if (videoItems.length === 3 && shortItems.length === 1) {
        return (
          <div className="flex flex-col gap-4">
            {renderVideoRow(videoItems.slice(0, 2))}
            {renderVideoRow([videoItems[2]])}
            {renderShortRow(shortItems)}
          </div>
        );
      }
      if (shortItems.length === 3 && videoItems.length === 1) {
        return (
          <div className="flex flex-col gap-4">
            {renderShortRow(shortItems.slice(0, 2))}
            {renderVideoRow(videoItems)}
            {renderShortRow([shortItems[2]])}
          </div>
        );
      }
      if (videoItems.length === 4) {
        return (
          <div className="flex flex-col gap-4">
            {renderVideoRow(videoItems.slice(0, 2))}
            {renderVideoRow(videoItems.slice(2, 4))}
          </div>
        );
      }
      if (shortItems.length === 4) {
        return (
          <div className="flex flex-col gap-4">
            {renderShortRow(shortItems.slice(0, 2))}
            {renderShortRow(shortItems.slice(2, 4))}
          </div>
        );
      }
      return renderStacked(videoElements);
    }

    return renderStacked(videoElements);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b flex justify-between items-center p-6" style={{ borderColor: '#D0B68A' }}>
          <h2 className="text-2xl font-bold" style={{ color: '#304B52' }}>{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Text */}
          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
            {content}
          </div>

          {/* Video(s) */}
          {!isCheckingVideos && videoElements.length > 0 && (
            <div className="mt-6">
              {videoLayout === 'auto' && renderAutoLayout()}
              {videoLayout === 'side-by-side' && videoElements.length === 1 && (
                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                  {renderIframe(videoElements[0], title)}
                </div>
              )}

              {videoLayout === 'side-by-side' && videoElements.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoElements.map((video, index) => (
                    <div key={video.id} className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                      {renderIframe(video, `${title} - Video ${index + 1}`)}
                    </div>
                  ))}
                </div>
              )}
              
              {videoLayout === 'stacked' && (
                <div className="flex flex-col gap-4">
                  {videoElements.map((video, index) => (
                    <div key={video.id} className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                      {renderIframe(video, `${title} - Video ${index + 1}`)}
                    </div>
                  ))}
                </div>
              )}

              {videoLayout === 'shorts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                  {videoElements.map((video, index) => (
                    <div key={video.id} className="w-full max-w-[320px] md:max-w-[360px] mx-auto aspect-[9/16] rounded-lg overflow-hidden shadow-md">
                      {renderIframe(video, `${title} - Video ${index + 1}`)}
                    </div>
                  ))}
                </div>
              )}

              {videoLayout === 'mixed' && videoElements.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                    {renderIframe(videoElements[0], `${title} - Video 1`)}
                  </div>
                  {videoElements[1] && (
                    <div className="w-full max-w-[320px] md:max-w-[360px] mx-auto aspect-[9/16] rounded-lg overflow-hidden shadow-md">
                      {renderIframe(videoElements[1], `${title} - Video 2`)}
                    </div>
                  )}
                </div>
              )}

              {videoLayout === 'shorts-video-shorts' && videoElements.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                    {videoElements.slice(0, 2).map((video, index) => (
                      <div key={video.id} className="w-full max-w-[320px] md:max-w-[360px] mx-auto aspect-[9/16] rounded-lg overflow-hidden shadow-md">
                        {renderIframe(video, `${title} - Video ${index + 1}`)}
                      </div>
                    ))}
                  </div>
                  {videoElements[2] && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                      {renderIframe(videoElements[2], `${title} - Video 3`)}
                    </div>
                  )}
                  {videoElements[3] && (
                    <div className="w-full max-w-[320px] md:max-w-[360px] mx-auto aspect-[9/16] rounded-lg overflow-hidden shadow-md">
                      {renderIframe(videoElements[3], `${title} - Video 4`)}
                    </div>
                  )}
                </div>
              )}

              {videoLayout === 'single' && videoElements.length > 0 && (
                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                  {renderIframe(videoElements[0], title)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex justify-end" style={{ borderColor: '#D0B68A' }}>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md text-white font-semibold transition"
            style={{ backgroundColor: '#C47A59' }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextModal;
