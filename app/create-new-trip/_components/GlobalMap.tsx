"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTripDetail } from "@/app/provider";
import { Activity, Itinerary } from "./ChatBox";

// importa as imagens padrão do Leaflet
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

// converte StaticImageData -> string
const DefaultIcon = new L.Icon({
  iconUrl: (marker as any).src ?? (marker as any),
  iconRetinaUrl: (marker2x as any).src ?? (marker2x as any),
  shadowUrl: (shadow as any).src ?? (shadow as any),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const FlyToMarkers = ({ coordinates }: { coordinates: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates.length) {
      const bounds = L.latLngBounds(coordinates);
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.2 });
    }
  }, [coordinates, map]);
  return null;
};

const GlobalMap = () => {
  const tripContext = useTripDetail();
  const tripDetailInfo = tripContext?.tripDetailInfo;

  const markers: { position: [number, number]; name: string }[] = [];
  tripDetailInfo?.itinerary?.forEach((it: Itinerary) => {
    it.activities.forEach((a: Activity) => {
      if (a?.geo_coordinates?.latitude && a?.geo_coordinates?.longitude) {
        markers.push({
          position: [a.geo_coordinates.latitude, a.geo_coordinates.longitude],
          name: a.place_name,
        });
      }
    });
  });

  return (
    <div style={{ width: "95%", height: "85vh", borderRadius: 20 }}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ width: "100%", height: "100%", borderRadius: 20 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {markers.map((m, i) => (
          <Marker key={i} position={m.position}>
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
        <FlyToMarkers coordinates={markers.map((m) => m.position)} />
      </MapContainer>
    </div>
  );
};

export default GlobalMap;
