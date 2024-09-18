const MAPS_API_KEY = "df0b56e7a7274367bca4ebced4be4d68";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=400&height=300&center=lonlat:${lng},${lat}&zoom=14&marker=lonlat:${lng},${lat};color:%23ff0000;size:small;color:%23ff0000;size:small&scaleFactor=2&apiKey=${MAPS_API_KEY}
`;

  return imagePreviewUrl;
}
