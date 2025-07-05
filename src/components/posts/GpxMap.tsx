"use client";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import GpxParser from "gpxparser";
import { useState, useEffect } from "react";
import { LatLngExpression } from "leaflet";

interface GpxMapProps {
  src: string;
}

export default function GpxMap({ src }: GpxMapProps) {
  const [positions, setPositions] = useState<LatLngExpression[] | null>(null);

  useEffect(() => {
    const fetchGPX = async () => {
      const response = await fetch(src);
      const text = await response.text();

      const parser = new GpxParser();
      parser.parse(text);
      const positions = parser.tracks[0].points.map((p) => [p.lat, p.lon]);
      setPositions(positions as LatLngExpression[]);
    };

    fetchGPX();
  }, [src]);

  if (!positions) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <MapContainer center={positions[0]} zoom={12} className="h-[500px] w-full rounded-xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline pathOptions={{ fillColor: "#615fff", color: "#615fff" }} positions={positions} />
    </MapContainer>
  );
}
