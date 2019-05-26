import React, { useState, useEffect } from 'react';

export default function App() {
  const [location, setLocation] = useState({});

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords;

    setLocation({ latitude, longitude });
    console.log('locatiooon: ');
    console.log(location);
  }

  useEffect(() => {
    navigator.geolocation.watchPosition(handlePositionReceived);
  }, []);

  return (
    <>
      Latitude:
      {location.latitude}
      <br />
      Longitude:
      {location.longitude}
    </>
  );
}
