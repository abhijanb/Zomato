// hooks/useGeo.ts
import { useState, useEffect } from "react";

interface GeoData {
  latitude: number | null;
  longitude: number | null;
  street: string;
  city: string;
  loading: boolean;
  error: string | null;
}

export const useGeo = (): GeoData => {
  const [geoData, setGeoData] = useState<GeoData>({
    latitude: null,
    longitude: null,
    street: "",
    city: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoData((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocoding using Nominatim (OpenStreetMap) - free, no API key required
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          const address = data.address;
          const street = address.road || address.pedestrian || address.street || address.hamlet || "";
          const city = address.city || address.town || address.village || address.municipality || "";

          setGeoData({
            latitude,
            longitude,
            street,
            city,
            loading: false,
            error: null,
          });
        } catch (err) {
          setGeoData((prev) => ({
            ...prev,
            latitude,
            longitude,
            loading: false,
            error: "Failed to retrieve address details",
          }));
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setGeoData((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []); // Run only once on mount

  return geoData;
};