"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SlapMap({ data }: { data: any[] }) {
  return (
    <MapContainer 
      center={[42.5834, -71.8023]} 
      zoom={14} 
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={customIcon}>
          <Popup className="text-black font-mono text-xs">
            <strong>{spot.description}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}