import React, { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';

interface SortButtonProps {
  setClickedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SortButton: React.FC<SortButtonProps> = ({ setClickedIndex }) => {
  const [clickedIndex, setLocalClickedIndex] = useState<number>(0);

  const handlePriceClick = () => {
    const newIndex = clickedIndex !== 0 ? 0 : 1;
    setLocalClickedIndex(newIndex);
    setClickedIndex(newIndex);
  };

  const handleStarsClick = () => {
    const newIndex = clickedIndex !== 2 ? 2 : 3;
    setLocalClickedIndex(newIndex);
    setClickedIndex(newIndex);
  };

  return (
    <div
      className={`flex flex-col fixed right-4 top-4 rounded-md w-1/6 h-24 xl:h-10 z-10 text-xs xl:text-sm font-montserrat bg-white text-black transition-all duration-300 ease-in-out`}
    >
      <div className={`flex p-2`}>
        <p className="m-auto">Ordenar :</p>
      </div>
      <div
        className={`flex items-center p-2 rounded-md transition-all duration-300 ease-in-out hover:cursor-pointer ${clickedIndex === 1 || clickedIndex === 0 ? 'bg-black text-white' : ''}`}
        onClick={handlePriceClick}
      >
        <FaArrowDown
          className={`transition-transform duration-300 size-2 md:size-4 ${
            clickedIndex === 1 ? 'rotate-180' : 'rotate-0'
          }`}
        />
        <p className="ml-2">Precio</p>
      </div>
      <div
        className={`flex items-center p-2 rounded-md transition-all duration-300 ease-in-out hover:cursor-pointer ${clickedIndex === 3 || clickedIndex === 2 ? 'bg-black text-white' : ''}`}
        onClick={handleStarsClick}
      >
        <FaArrowDown
          className={`transition-transform duration-300 size-2 md:size-4 ${
            clickedIndex === 3 ? 'rotate-180' : 'rotate-0'
          }`}
        />
        <p className="ml-2">Estrellas</p>
      </div>
    </div>
  );
};

export default SortButton;