import React, { useState } from "react";
import LazyImage from "./LazyImage";
import arrowIcon from '../img/arrow-right.svg';

const Content_Card = ({ image, title, summary, fullText, youtubeId }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border-2 flex flex-col self-start" style={{ borderColor: '#D0B68A', minHeight: isExpanded ? 'auto' : '500px' }}>
				<LazyImage className="w-full h-48 object-cover" src={image} alt={title} />
				<div className="p-4 flex flex-col flex-1">
					<div className="font-bold text-xl mb-2" style={{ color: '#304B52' }}>{title}</div>
					<p className="text-gray-700 text-base mb-4">{summary}</p>
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className="text-gray-900 hover:text-gray-700 font-semibold text-sm flex items-center gap-2 transition mt-auto"
					>
						{isExpanded ? 'Ver menos' : 'Ver más'}
						<img 
							src={arrowIcon} 
							alt={isExpanded ? 'Ver menos' : 'Ver más'} 
							className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
						/>
					</button>
					
				{isExpanded && (
					<div className="mt-4 pt-4 border-t border-gray-200">
						<p className="text-gray-700 text-base leading-relaxed">{fullText || summary}</p>
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

export default Content_Card;
