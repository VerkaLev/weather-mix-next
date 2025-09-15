import getData from './getData';

export async function getTranslateCityName(id: string, locale: string) {
  const dataCityName = await getData(
    `http://api.geonames.org/getJSON?geonameId=${id}&username=verkalev&lang=${locale}`,
    { next: { revalidate: 21600 } }
  );

  return dataCityName;
}
