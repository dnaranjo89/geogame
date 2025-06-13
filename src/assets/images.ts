// import photo1 from "../photos/photo1.jpg";
// import photo2 from "../photos/photo2.jpg";
// import photo3 from "../photos/photo3.jpg";
// import photo4 from "../photos/photo4.jpg";
// import photo5 from "../photos/photo5.jpg";
import photo6 from "../photos/photo6.jpg";
// import photo7 from "../photos/photo7.jpg";
import photo8 from "../photos/photo8.jpg";
// import photo9 from "../photos/photo9.jpg";
// import photo10 from "../photos/photo10.jpg";
// import photo11 from "../photos/photo11.jpg";
// import photo12 from "../photos/photo12.jpg";
// import photo13 from "../photos/photo13.jpg";
// import photo14 from "../photos/photo14.jpg";
// import photo15 from "../photos/photo15.jpg";
import photo16 from "../photos/photo16.jpg";
import photo17 from "../photos/photo17.jpg";
// import photo18 from "../photos/photo18.jpg";
import photo19 from "../photos/photo19.jpg";
// import photo20 from "../photos/photo20.jpg";
import photo21 from "../photos/photo21.jpg";
import photo22 from "../photos/photo22.jpg";
// import photo23 from "../photos/photo23.jpg";
import photo24 from "../photos/photo24.jpg";
import photo25 from "../photos/photo25.jpg";
import photo26 from "../photos/photo26.jpg";
import photo28 from "../photos/photo28.jpg";
// import photo29 from "../photos/photo29.jpg";
// import photo30 from "../photos/photo30.jpg";
// import photo31 from "../photos/photo31.jpg";
// import photo32 from "../photos/photo32.jpg";
// import photo33 from "../photos/photo33.jpg";
// import photo34 from "../photos/photo34.jpg";
// import photo35 from "../photos/photo35.jpg";
import photo36 from "../photos/photo36.jpg";
import photo37 from "../photos/photo37.jpg";
import photo38 from "../photos/photo38.jpg";
import photo39 from "../photos/photo39.jpg";
import photo40 from "../photos/photo40.jpg";
import photo41 from "../photos/photo41.jpg";
import photo42 from "../photos/photo42.jpg";
import photo43 from "../photos/photo43.jpg";
import { getLocationFromImage } from "../utils/getLocationFromImage";

// Hardcoded image data with locations
// You can add more images and locations as needed
export const imageData = [
  //   {
  //     id: 1,
  //     src: photo1,
  //     alt: "Photo 1",
  //     threshold: 3,
  //     location: { lat: 0, lng: 0 },
  //   },
  //   { id: 2, src: photo2, alt: "Photo 2", location: { lat: 0, lng: 0 } },
  //   { id: 3, src: photo3, alt: "Photo 3", location: { lat: 0, lng: 0 } },
  //   { id: 4, src: photo4, alt: "Photo 4", location: { lat: 0, lng: 0 } },
  //   { id: 5, src: photo5, alt: "Photo 5", location: { lat: 0, lng: 0 } },
  //   { id: 7, src: photo7, alt: "Photo 7", location: { lat: 0, lng: 0 } },
  { id: 8, src: photo8, alt: "Photo 8" },
  //   { id: 10, src: photo10, alt: "Photo 10", location: { lat: 0, lng: 0 } },
  //   { id: 11, src: photo11, alt: "Photo 11", location: { lat: 0, lng: 0 } },
  //   { id: 12, src: photo12, alt: "Photo 12", location: { lat: 0, lng: 0 } },
  //   { id: 13, src: photo13, alt: "Photo 13", location: { lat: 0, lng: 0 } },
  //   { id: 14, src: photo14, alt: "Photo 14", location: { lat: 0, lng: 0 } },
  //   { id: 15, src: photo15, alt: "Photo 15", location: { lat: 0, lng: 0 } },
  { id: 6, src: photo6, alt: "Photo 6" },
  { id: 16, src: photo16, alt: "Photo 16" },
  { id: 17, src: photo17, alt: "Photo 17" },
  //   { id: 18, src: photo18, alt: "Photo 18", location: { lat: 0, lng: 0 } },
  { id: 19, src: photo19, alt: "Photo 19" },
  //   { id: 20, src: photo20, alt: "Photo 20", location: { lat: 0, lng: 0 } },
  { id: 21, src: photo21, alt: "Photo 21" },
  { id: 22, src: photo22, alt: "Photo 22" },
  //   { id: 23, src: photo23, alt: "Photo 23", location: { lat: 0, lng: 0 } },
  { id: 24, src: photo24, alt: "Photo 24" },
  { id: 25, src: photo25, alt: "Photo 25" },
  {
    id: 26,
    src: photo26,
    alt: "Photo 26",
    location: { lat: 37.98192327999714, lng: -0.6625270800106 },
  },
  {
    id: 28,
    src: photo28,
    alt: "Photo 28",
    threshold: 2,
  }, // 2km radio
  //   { id: 29, src: photo29, alt: "Photo 29", location: { lat: 0, lng: 0 } },
  //   { id: 30, src: photo30, alt: "Photo 30", location: { lat: 0, lng: 0 } },
  //   { id: 31, src: photo31, alt: "Photo 31", location: { lat: 0, lng: 0 } },
  //   { id: 32, src: photo32, alt: "Photo 32", location: { lat: 0, lng: 0 } },
  //   { id: 33, src: photo33, alt: "Photo 33", location: { lat: 0, lng: 0 } },
  //   { id: 35, src: photo35, alt: "Photo 35", location: { lat: 0, lng: 0 } },
  { id: 36, src: photo36, alt: "Photo 36" },
  {
    id: 37,
    src: photo37,
    alt: "Photo 37",
    location: { lat: 38.42955727537757, lng: -6.410496871811166 },
  },
  {
    id: 38,
    src: photo38,
    alt: "Photo 38",
    location: { lat: 37.98219699766419, lng: -0.6614807150205037 },
  },
  { id: 39, src: photo39, alt: "Photo 39" },
  {
    id: 40,
    src: photo40,
    alt: "Photo 40",
    location: { lat: 37.98192327999714, lng: -0.6625270800106 },
  },
  {
    id: 41,
    src: photo41,
    alt: "Photo 41",
    location: { lat: 38.42925957681168, lng: -6.414608740290974 },
  },
  {
    id: 42,
    src: photo42,
    alt: "Photo 42",
    location: { lat: 37.98219699766419, lng: -0.6614807150205037 },
  },
  {
    id: 43,
    src: photo43,
    alt: "Photo 43",
    location: { lat: 38.42902701424308, lng: -6.414841608868102 },
  },
];

// WITHOUT GPS data
//   { id: 9, src: photo9, alt: "Photo 9", location: { lat: 0, lng: 0 } },
//   { id: 27, src: photo27, alt: "Photo 27", location: { lat: 0, lng: 0 } },
//   { id: 34, src: photo34, alt: "Photo 34", location: { lat: 0, lng: 0 } },

const checkGPSData = async () => {
  const missing = await Promise.all(
    imageData.map(async (image) => {
      const metaLoc = await getLocationFromImage(image.src);
      if (!metaLoc) {
        return image.id;
      }
      return null;
    })
  );
  console.log(
    "Images missing GPS data:",
    missing.filter((id) => id !== null)
  );
};

checkGPSData();
