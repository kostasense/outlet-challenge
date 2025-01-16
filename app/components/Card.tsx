"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FaRegStar } from "react-icons/fa";
import { BiDish } from "react-icons/bi";

const Stars = ({ rating }: { rating: number }) => {
  const stars = Array(rating).fill(<FaRegStar color="black" size={24} />);

  return (
    <div className='flex gap-4'>
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

const IMG_BASE = "https://media.travelartmedia.com/hotels/";

type CardProps = {
  id: string;
  name: string;
  regionName: string;
  city: string;
  stars: number;
  address: string;
  pricePerNight: number;
  originalPricePerNight: number;
  imageUrl: string[];
  mealType: string;
  discount: number;
  hasRefundableOptions: boolean;
  latitude: string;
  longitude: string;
};

const Card: React.FC<CardProps> = ({ name, regionName, city, stars, address, pricePerNight, originalPricePerNight, imageUrl, mealType, discount, hasRefundableOptions, latitude, longitude }) => {

  const handleMapClick = () => {
    const url = `https://www.google.com/maps?q=${name}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-80 max-w-3xl rounded-lg border border-gray-300 overflow-hidden my-4 mx-auto md:flex md:w-10/12 md:h-60">
      <Swiper className={`w-full h-40 object-contain md:h-full md:w-1/4 ${imageUrl.length === 0 ? 'bg-slate-500' : ''}`} modules={[Navigation]} spaceBetween={0} slidesPerView={1} navigation loop>
          {imageUrl.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={`${IMG_BASE}${image}`} alt={`Imagen ${index + 1} de ${name}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="p-4 h-3/6 flex flex-col md:h-full md:w-3/4 md:flex-row">
        <div className="flex flex-col md:w-1/2">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-500">{regionName}, {city}</p>
          <Stars rating={stars}></Stars>
          <p className={`rounded-md bg-green-400 text-sm text-white p-1 mr-auto my-auto mt-2 ${hasRefundableOptions ? '' : 'hidden'}`}>Cuenta con opciones de reembolso</p>
          <p className="mt-auto text-sm md:w-2/3 text-gray-700 hidden md:inline-block">{address}</p>
        </div>
        <div className="flex flex-col md:w-1/2">
          <div className="flex gap-1 ml-auto">
            <BiDish color="black" size="24" className="mt-1"></BiDish>
            <p className="mt-2 text-sm text-gray-700">{mealType}</p>
          </div>
          <div className="flex flex-col md:mt-auto md:ml-auto">
            <p className="mt-2 text-sm rounded-md text-white bg-blue-400 p-1 ml-auto">{discount}% de descuento</p>
            <div className="flex flex-col mt-2 ml-auto">
              <p className="text-md my-auto ml-auto line-through">MXN${originalPricePerNight}</p>
              <p className="text-2xl font-medium my-auto">MXN${pricePerNight}</p>
            </div>
            <div className="flex gap-2 ml-auto">
              <button onClick={handleMapClick} className="mt-2 rounded-md text-sm text-white bg-blue-400 p-2 hover:shadow-md hover:bg-white hover:text-blue-400 transition-all duration-200">Ver en Google Maps</button>
              <button className="mt-2 rounded-md text-sm text-white bg-blue-400 p-2 hover:shadow-md hover:bg-white hover:text-blue-400 transition-all duration-200">Reserva ya</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
