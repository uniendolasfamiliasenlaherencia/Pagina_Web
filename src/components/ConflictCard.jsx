import React, { useState } from "react";
import LazyImage from "./LazyImage";
import arrowIcon from '../img/arrow-right.svg';
import TextModal from "./TextModal";

const ConflictCard = ({ image, orangeTitle, title, description, fullText, whiteBadge = false, textButton = "Leer más" }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<TextModal
				isOpen={isModalOpen}
				title={title}
				content={fullText || description}
				onClose={() => setIsModalOpen(false)}
			/>
			<div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border-2 flex flex-col self-start" style={{ borderColor: '#C47A59', minHeight: '500px' }}>
				<LazyImage className="w-full h-64 object-cover" src={image} alt={title} />
				<div className="p-4 flex flex-col flex-1">
					<p className={whiteBadge ? "inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit" : "font-semibold text-xs mb-1 uppercase"} style={{ color: whiteBadge ? undefined : '#C47A59' }}>{orangeTitle}</p>
					<div className="font-bold text-xl mb-2" style={{ color: '#304B52' }}>{title}</div>
					<p className="text-gray-700 text-base mb-4 flex-1">{description}</p>
					<button
						onClick={() => setIsModalOpen(true)}
						className="text-gray-900 hover:text-gray-700 font-semibold text-sm flex items-center gap-2 transition w-fit"
					>
						{textButton}
						<img 
							src={arrowIcon} 
							alt={textButton} 
							className="w-4 h-4"
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default ConflictCard;
