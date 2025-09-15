import getData from './getData';

export async function getAllAvailableCityNames(
  letters: string,
  locale: string
) {
  const dataAvailableCityNames = await getData(
    `http://api.geonames.org/searchJSON?name_startsWith=${letters}&maxRows=10&lang=${locale}&username=verkalev&featureClass=P`,
    { next: { revalidate: 21600 } }
  );

  return (dataAvailableCityNames.geonames || []).filter(
    (item: { population: number }) => item.population > 1000
  );
}
