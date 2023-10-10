import React, { useState } from 'react';
import { useMapEvents, Marker } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface GetClickedPositionProps {
  setSelectedPosition: (position: LatLngExpression) => void;
}

const GetClickedPosition: React.FC<GetClickedPositionProps> = ({ setSelectedPosition }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const position: LatLngExpression = [lat, lng];
      setSelectedPosition(position); // Update the selected position
    },
  });
  return null;
};

export default GetClickedPosition;