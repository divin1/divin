"use client";

import { useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer and TileLayer to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});

interface GpxMapProps {
  src: string;
}

function GpxLayer({ src }: { src: string }) {
  const map = useMap();
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && map) {
      import("leaflet")
        .then((LModule) => {
          const L = LModule.default;

          // HACK: Fix for missing default marker icons in Leaflet
          // @ts-expect-error annoying to type
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            // Using a known CDN for Leaflet's default images
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          });

          import("leaflet-gpx")
            .then(() => {
              if (L.GPX) {
                setLeafletLoaded(true);

                const gpx = new L.GPX(src, {
                  async: true,
                  polyline_options: {
                    color: "#615fff",
                    opacity: 0.75,
                    weight: 5,
                    lineCap: "round",
                  },
                })
                  .on("loaded", function (e) {
                    map.fitBounds(e.target.getBounds());
                  })
                  .addTo(map);

                return () => {
                  map.removeLayer(gpx);
                };
              } else {
                console.error("L.GPX is not defined after importing leaflet-gpx.");
              }
            })
            .catch((err) => console.error("Failed to load leaflet-gpx:", err));
        })
        .catch((err) => console.error("Failed to load Leaflet:", err));
    }
  }, [src, map]);

  if (!leafletLoaded) {
    return null;
  }

  return null;
}

export default function GpxMap({ src }: GpxMapProps) {
  return (
    <MapContainer center={[0, 0]} zoom={2} className="h-[500px] w-full rounded-xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GpxLayer src={src} />
    </MapContainer>
  );
}
