"use client";

import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Card from './components/Card';
import SortButton from './components/SortButton';

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number>(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const hotelsData = data.data.map((hotel: any) => {
            const fullAddress = [hotel.address.address1, hotel.address.address2, hotel.address.address3]
              .filter(Boolean)
              .join(", ");

            return {
              id: hotel.id,
              name: hotel.name,
              regionName: hotel.regionName,
              city: hotel.address.city,
              stars: hotel.stars,
              address: fullAddress,
              pricePerNight: parseFloat(hotel.pricePerNight.toFixed(2)),
              originalPricePerNight: parseFloat(hotel.originalPricePerNight.toFixed(2)),
              imageUrl: hotel.photos,
              mealType: typeof hotel.mealType === 'object' && hotel.mealType.text ? hotel.mealType.text : hotel.mealType,
              discount: hotel.discounts[0],
              hasRefundableOptions: hotel.hasRefundableOptions
            };
          });
          setHotels(hotelsData);
        } else {
          setError('No se pudieron cargar los datos.');
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sortedHotels = [...hotels].sort((a, b) => {
    switch (clickedIndex) {
      case 0:
        return a.pricePerNight - b.pricePerNight;
      case 1:
        return b.pricePerNight - a.pricePerNight;
      case 2:
        return a.stars - b.stars;
      case 3:
        return b.stars - a.stars;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <DotLottieReact
        className="w-3/4 h-auto m-auto"
        src="https://lottie.host/22a00728-31ff-40e1-a8df-8bb8fb105702/pMwD2aBWQn.lottie"
        loop
        autoplay
      />
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col flex-wrap justify-around font-montserrat">
      {sortedHotels.map((hotel) => (
        <Card
          key={hotel.id}
          id={hotel.id}
          name={hotel.name}
          regionName={hotel.regionName}
          city={hotel.city}
          stars={hotel.stars}
          address={hotel.address}
          pricePerNight={hotel.pricePerNight}
          originalPricePerNight={hotel.originalPricePerNight}
          imageUrl={hotel.imageUrl}
          mealType={hotel.mealType}
          discount={hotel.discount}
          hasRefundableOptions={hotel.hasRefundableOptions}
        />
      ))}
      <SortButton setClickedIndex={setClickedIndex} />
    </div>
  );
};

export default Home;