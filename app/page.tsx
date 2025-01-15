"use client";

import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Card } from './components/Comp';

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Usamos fetch para hacer la solicitud a la API
    fetch('https://api-dev.outletdehoteles.com/api/availability/public')
      .then((response) => {
        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        return response.json();
      })
      .then((data) => {
        // Verificamos si la respuesta es exitosa según el campo 'success'
        if (data.success) {
          // Mapear los datos de los hoteles
          const hotelsData = data.data.map((hotel: any) => {
            // Combinamos las direcciones si existen
            const fullAddress = [hotel.address.address1, hotel.address.address2, hotel.address.address3]
              .filter(Boolean)  // Filtramos las direcciones vacías
              .join(", ");  // Unimos las direcciones con coma

            return {
              id: hotel.id,
              name: hotel.name,
              regionName: hotel.regionName,
              city: hotel.address.city,
              stars: hotel.stars,
              address: fullAddress,  // Usamos la dirección combinada
              pricePerNight: parseFloat(hotel.pricePerNight.toFixed(2)),
              originalPricePerNight: parseFloat(hotel.originalPricePerNight.toFixed(2)),
              imageUrl: hotel.photos,
              mealType: typeof hotel.mealType === 'object' && hotel.mealType.text ? hotel.mealType.text : hotel.mealType,
              discount: hotel.discounts[0],
              hasRefundableOptions: hotel.hasRefundableOptions,
              latitude: hotel.location.latitude,
              longitude: hotel.location.longitude
            };
          });
          setHotels(hotelsData);
        } else {
          setError('No se pudieron cargar los datos.');
        }
      })
      .catch((err) => {
        // Manejamos el error
        setError(err.message);
      })
      .finally(() => {
        // Indicamos que la solicitud ha terminado
        setLoading(false);
      });
  }, []);

  if (loading) {
    return  <DotLottieReact
              className="w-3/4 h-auto m-auto"
              src="https://lottie.host/22a00728-31ff-40e1-a8df-8bb8fb105702/pMwD2aBWQn.lottie"
              loop
              autoplay
            />
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col flex-wrap justify-around font-montserrat">
      {hotels.map((hotel) => (
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
          latitude={hotel.latitude}
          longitude={hotel.longitude}
        />
      ))}
    </div>
  );
};

export default Home;
