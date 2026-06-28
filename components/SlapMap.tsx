"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SlapMap({ data }: { data: any[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Aggregate spots by location to calculate count
  const locations = data.reduce((acc, spot) => {
    const key = `${spot.lat},${spot.lng}`;
    if (!acc[key]) {
      acc[key] = { ...spot, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});

  const markers = Object.values(locations);

  return (
    <MapContainer 
      center={[42.5834, -71.8023]} 
      zoom={14} 
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      {markers.map((spot: any) => (
        <Marker 
          key={`${spot.lat}-${spot.lng}`} 
          position={[spot.lat, spot.lng]} 
          icon={icon}
        >
          <Popup className="text-black font-mono text-xs">
            <div className="font-bold border-b border-zinc-200 mb-1 pb-1">
              {spot.name || "Unknown"}
            </div>
            <div>{spot.description}</div>
            <div className="mt-2 pt-1 border-t border-zinc-200 text-[10px] text-zinc-500 uppercase tracking-widest">
              Total Slaps Here: <span className="font-bold text-black">{spot.count}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}