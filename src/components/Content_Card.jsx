import React, { useState } from "react";
import LazyImage from "./LazyImage";
import arrowIcon from '../img/arrow-right.svg';
import TextModal from "./TextModal";

const Content_Card = ({ image, title, summary, fullText, youtubeId, youtubeIds = [], youtubeTypes = [], videoLayout = 'auto' }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<TextModal
				isOpen={isModalOpen}
				title={title}
				content={fullText || summary}
				youtubeIds={youtubeIds}
				youtubeId={youtubeId}
				youtubeTypes={youtubeTypes}
				videoLayout={videoLayout}
				onClose={() => setIsModalOpen(false)}
			/>
			<div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border-2 flex flex-col self-start" style={{ borderColor: '#D0B68A', minHeight: '500px' }}>
				<LazyImage className="w-full h-48 object-cover" src={image} alt={title} />
				<div className="p-4 flex flex-col flex-1">
					<div className="font-bold text-xl mb-2" style={{ color: '#304B52' }}>{title}</div>
					<p className="text-gray-700 text-base mb-4 flex-1">{summary}</p>
					<button
						onClick={() => setIsModalOpen(true)}
						className="text-gray-900 hover:text-gray-700 font-semibold text-sm flex items-center gap-2 transition w-fit"
					>
						Ver más
						<img 
							src={arrowIcon} 
							alt="Ver más" 
							className="w-4 h-4"
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default Content_Card;
