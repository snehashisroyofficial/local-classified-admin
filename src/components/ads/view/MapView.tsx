"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";

const defaultIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  lat?: number | null;
  lon?: number | null;
  city?: string | null;
}

const DEFAULT_POSITION = [22.566105985925578, 88.38534784240551] as [
  number,
  number
];
// const DEFAULT_POPUP = "Default Location";

const MapView = ({ lat, lon, city }: MapViewProps) => {
  const [position, setPosition] = useState<[number, number]>(DEFAULT_POSITION);
  // const [popupText, setPopupText] = useState<string>(DEFAULT_POPUP);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCityCoords = async () => {
      setIsLoading(true);
      try {
        if (city) {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              city
            )}&format=json&limit=1`
          );
          const data = await res.json();

          if (data && data.length > 0) {
            setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
            // setPopupText(data[0].display_name);
          } else {
            console.warn(`City "${city}" not found. Using default location.`);
            setPosition(DEFAULT_POSITION);
            // setPopupText(`City not found. Showing default: ${DEFAULT_POPUP}`);
          }
        } else if (lat && lon) {
          setPosition([lat, lon]);
          // setPopupText(`Location at ${lat}, ${lon}`);
        } else {
          setPosition(DEFAULT_POSITION);
          // setPopupText(DEFAULT_POPUP);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setPosition(DEFAULT_POSITION);
        // setPopupText(`Error finding location. ${DEFAULT_POPUP}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCityCoords();
  }, [city, lat, lon]);
  const openGoogleMaps = () => {
    const gmapURL = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
    window.open(gmapURL, "_blank");
  };
  if (isLoading) {
    return <p className="text-center p-4">Loading map...</p>;
  }

  return (
    <>
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={defaultIcon}>
          <Popup>
            <button
              className="bg-red-500 text-white p-2 rounded-md "
              onClick={openGoogleMaps}
            >
              Open in Google Maps
            </button>
          </Popup>
        </Marker>

        <ChangeView center={position} zoom={13} />
      </MapContainer>
    </>
  );
};

import { useMap } from "react-leaflet";

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default MapView;
