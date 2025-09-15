import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { getAllAvailableCityNames } from '@/api/getAllAvailableCityNames';
import { InfoCity, UseListCitiesPropsType } from '@/Types';

export const useListCities = ({
  selectedCity,
  setSelectedCity,
  setIsSearchCity,
}: UseListCitiesPropsType) => {
  const router = useRouter();
  const params = useParams();

  const [cities, setCities] = useState<InfoCity[]>([]);

  const debouncedValue = useDebounce(selectedCity.name, 500);

  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale ?? 'es';

  const handleCityClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { city, lat, lon, countrycode, id, toponymname } = (
      e.target as HTMLElement
    ).dataset as Record<
      'city' | 'lat' | 'lon' | 'countrycode' | 'id' | 'toponymname',
      string
    >;
    if (!lat || !lon || !city || !countrycode || !id || !toponymname) {
      return;
    }
    setSelectedCity({
      name: city,
      lat: lat,
      lon: lon,
      countryCode: countrycode,
      id: id,
      toponymname: toponymname,
    });
    setIsSearchCity(false);

    router.push(
      `/${locale}/weather/${countrycode}/${toponymname}/${id}?lat=${lat}&lon=${lon}`
    );
  };

  useEffect(() => {
    if (debouncedValue.length < 3) {
      setCities([]);
    } else {
      const fetchCities = async () => {
        const data = await getAllAvailableCityNames(debouncedValue, locale);

        setCities(data || []);
      };
      fetchCities();
    }
  }, [debouncedValue]);
  return { debouncedValue, cities, handleCityClick };
};
