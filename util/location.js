const API_KEY = "df0b56e7a7274367bca4ebced4be4d68"; //geoapify

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=400&height=300&center=lonlat:${lng},${lat}&zoom=14&marker=lonlat:${lng},${lat};color:%23ff0000;size:small;color:%23ff0000;size:small&scaleFactor=2&apiKey=${API_KEY}
`;

  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Something went wrong!, Failed to fetch address");
  }

  const data = await response.json();
  const address = data.results[0].formatted;
  return address;
}
