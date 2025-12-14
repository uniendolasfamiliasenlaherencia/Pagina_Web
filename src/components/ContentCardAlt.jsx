import React, { useState } from "react";
import LazyImage from "./LazyImage";
import arrowIcon from '../img/arrow-right.svg';

const ContentCardAlt = ({ image, orangeTitle, title, description, fullText, youtubeId, isLarge = false, whiteBadge = false, textButton = "Conoce más", imageRight = false }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	if (isLarge) {
		// Layout alternativo: imagen a la izquierda o derecha, texto al otro lado (compacto)
		return (
			<>
			<div className="flex flex-row gap-0 items-stretch rounded-lg overflow-hidden shadow-lg bg-white border-2 self-start" style={{ borderColor: '#C47A59', minHeight: isExpanded ? 'auto' : '500px' }}>
				{imageRight ? (
					<>
						<div className="w-1/2 p-4 flex flex-col justify-start">
							<p className={whiteBadge ? "inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit" : "font-semibold text-xs mb-1 uppercase"} style={{ color: whiteBadge ? undefined : '#C47A59' }}>{orangeTitle}</p>
							<h3 className="text-lg font-bold mb-2" style={{ color: '#304B52' }}>{title}</h3>
							<p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-2">{description}</p>
							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className="text-gray-900 hover:text-gray-700 font-semibold text-sm flex items-center gap-2 transition w-fit"
							>
								{isExpanded ? 'Ver menos' : textButton}
								<img 
									src={arrowIcon} 
									alt={isExpanded ? 'Ver menos' : textButton} 
									className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
								/>
							</button>
							
							{isExpanded && (
								<div className="mt-4 pt-4 border-t border-gray-200 overflow-auto max-h-96">
									<p className="text-gray-700 text-base leading-relaxed">{fullText || description}</p>
								</div>
							)}
						</div>
						<div className="w-1/2 flex-shrink-0 overflow-hidden">
							<LazyImage src={image} alt={title} className="w-full h-full object-cover object-left" style={{ maxHeight: '500px' }} />
						</div>
					</>
				) : (
					<>
						<div className="w-1/2 flex-shrink-0 overflow-hidden">
							<LazyImage src={image} alt={title} className="w-full h-full object-cover object-right" style={{ maxHeight: '500px' }} />
						</div>
						<div className="w-1/2 p-4 flex flex-col justify-start">
							<p className={whiteBadge ? "inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit" : "font-semibold text-xs mb-1 uppercase"} style={{ color: whiteBadge ? undefined : '#C47A59' }}>{orangeTitle}</p>
							<h3 className="text-lg font-bold mb-2" style={{ color: '#304B52' }}>{title}</h3>
							<p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-2">{description}</p>
							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className="text-gray-900 hover:text-gray-700 font-semibold text-sm flex items-center gap-2 transition w-fit"
							>
								{isExpanded ? 'Ver menos' : textButton}
								<img 
									src={arrowIcon} 
									alt={isExpanded ? 'Ver menos' : textButton} 
									className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
								/>
							</button>
							
							{isExpanded && (
								<div className="mt-4 pt-4 border-t border-gray-200 overflow-auto max-h-96">
									<p className="text-gray-700 text-base leading-relaxed">{fullText || description}</p>
								</div>
							)}
						</div>
					</>
				)}
			</div>
			</>
		);
	}

	// Layout normal (como Content_Card)
	return (
		<>
		<div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border-2 flex flex-col self-start" style={{ borderColor: '#C47A59', minHeight: isExpanded ? 'auto' : '500px' }}>
			<LazyImage className="w-full h-64 object-cover" src={image} alt={title} />
		<div className="p-4 flex flex-col">
			<p className={whiteBadge ? "inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit" : "font-semibold text-xs mb-1 uppercase"} style={{ color: whiteBadge ? undefined : '#C47A59' }}>{orangeTitle}</p>
			<div className="font-bold text-xl mb-2" style={{ color: '#304B52' }}>{title}</div>
			<p className="text-gray-700 text-base mb-4">{description}</p>
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="text-gray-900 hover:text-gray-700 font-semibold text-sm flex items-center gap-2 transition"
			>
				{isExpanded ? 'Ver menos' : textButton}
				<img 
					src={arrowIcon} 
					alt={isExpanded ? 'Ver menos' : textButton} 
					className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
				/>
			</button>
			
			{isExpanded && (
				<div className="mt-4 pt-4 border-t border-gray-200">
					<p className="text-gray-700 text-base leading-relaxed">{fullText || description}</p>
					{/* 
						CÓDIGO DE VIDEO COMENTADO - Descomenta cuando los videos estén listos
						{youtubeId && (
						   <div className="mt-4">
						     <div className="w-full aspect-video">
						       <iframe
						         width="100%"
						         height="100%"
						         src={`https://www.youtube.com/embed/${youtubeId}`}
						         title={title}
						         frameBorder="0"
						         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						         allowFullScreen
						         className="rounded"
						       />
						     </div>
						   </div>
						 )}
					*/}
				</div>
			)}
		</div>
		</div>
		</>
	);
};

export default ContentCardAlt;