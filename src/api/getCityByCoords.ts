import getData from './getData';

export async function getCityByCoords(
  lat: number,
  lon: number,
  locale: string
) {
  const url = `https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=verkalev&lang=${locale}`;

  const data = await getData(url, {});

  if (data.geonames && data.geonames.length > 0) {
    return {
      city: data.geonames[0].name,
      countryCode: data.geonames[0].countryCode,
      lat: data.geonames[0].lat,
      lon: data.geonames[0].lng,
      toponymname: data.geonames[0].toponymName,
      id: data.geonames[0].geonameId,
    };
  } else {
    return null;
  }
}
