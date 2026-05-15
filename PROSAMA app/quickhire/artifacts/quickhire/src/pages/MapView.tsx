import { useEffect, useRef } from "react";
import L from "leaflet";
import { getSuburbCoords } from "../lib/suburbs";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Job { 
  id: number; 
  title: string; 
  location: string; 
  salary: string; 
  type: string; 
}

interface Props { jobs: Job[]; }

export default function MapView({ jobs }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    
    mapInstance.current = L.map(mapRef.current).setView([-33.8688, 151.2093], 12);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance.current);
    
    jobs.forEach((job) => {
      const coords = getSuburbCoords(job.location);
      if (!coords) return;
      L.marker([coords.lat, coords.lng])
        .addTo(mapInstance.current!)
        .bindPopup(`<b>${job.title}</b><br/>${job.type} · ${job.salary}`);
    });
    
    return () => { 
      mapInstance.current?.remove(); 
      mapInstance.current = null; 
    };
  }, [jobs]);

  return <div ref={mapRef} style={{ height: "420px", width: "100%", borderRadius: "12px" }} />;
}