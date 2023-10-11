import React from 'react';
import { useMapEvents } from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';

interface GetClickedPositionProps {
  setSelectedPosition: (position: LatLngTuple) => void;
}

const GetClickedPosition: React.FC<GetClickedPositionProps> = ({ setSelectedPosition }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const position: LatLngTuple = [lat, lng];
      setSelectedPosition(position); // Update the selected position
    },
  });
  return null;
};

export default GetClickedPosition;