
// PUBLIC API
//lấy địa chỉ public GPS

import * as Location from "expo-location";

export const getAddressByLocation = async (useMock = false): Promise<string> => {
  try {
    let latitude: number, longitude: number;

    if (useMock) {
      latitude = 10.762622;
      longitude = 106.660172;
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return "Không thể xác định vị trí";
      }

      const location = await Location.getCurrentPositionAsync({});
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
    }

    const result = await Promise.race([
      Location.reverseGeocodeAsync({ latitude, longitude }),
    ]);

    console.log("Raw reverse geocode result:", result);

    const geocode = result as Location.LocationGeocodedAddress[];

    if (geocode.length > 0) {
      const { name, street, city, district, region, country, subregion } = geocode[0];

      const fullAddress = [
        street || name,
        district || region,
        city,
        subregion || country,
        country,
      ]
        .filter(Boolean)
        .join(", ");

      console.log("Parsed address:", fullAddress);

      return fullAddress || "Không thể xác định vị trí";
    }

    return "Không thể xác định vị trí";
  } catch (error: any) {
    console.error("Error getting address from coordinates:", error.message || error);
    return "Không thể xác định vị trí";
  }
};

