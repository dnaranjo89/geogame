import exifr from "exifr";

/**
 * Extracts GPS location from an imported image file (e.g., photo1) using exifr.
 * @param imageSrc The imported image (string URL from import)
 * @returns Promise<{ lat: number, lng: number } | null>
 */
export async function getLocationFromImage(
  imageSrc: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    // Fetch the image as a blob
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    // Parse EXIF GPS data
    const gps = await exifr.gps(blob);
    if (
      gps &&
      typeof gps.latitude === "number" &&
      typeof gps.longitude === "number"
    ) {
      return { lat: gps.latitude, lng: gps.longitude };
    }
    return null;
  } catch (e) {
    return null;
  }
}
