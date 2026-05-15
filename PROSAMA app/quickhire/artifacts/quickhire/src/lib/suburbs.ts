export interface SuburbCoords { lat: number; lng: number; }

export const SYDNEY_SUBURBS: Record<string, SuburbCoords> = {
  "Surry Hills": { lat: -33.8885, lng: 151.2113 },
  "Newtown": { lat: -33.8969, lng: 151.1796 },
  "Bondi": { lat: -33.8914, lng: 151.2743 },
  "Sydney CBD": { lat: -33.8688, lng: 151.2093 },
  "Parramatta": { lat: -33.8150, lng: 151.0011 },
  "Chatswood": { lat: -33.7969, lng: 151.1830 },
  "Pyrmont": { lat: -33.8697, lng: 151.1948 },
  "Ultimo": { lat: -33.8784, lng: 151.1989 },
  "Melbourne": { lat: -37.8136, lng: 144.9631 },
  "Remote": { lat: -33.8688, lng: 151.2093 },
};

export function getSuburbCoords(location: string): SuburbCoords | null {
  if (!location) return null;
  const direct = SYDNEY_SUBURBS[location];
  if (direct) return direct;
  const lower = location.toLowerCase();
  for (const [suburb, coords] of Object.entries(SYDNEY_SUBURBS)) {
    if (lower.includes(suburb.toLowerCase())) return coords;
  }
  return null;
}