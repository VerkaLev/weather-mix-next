'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCityByCoords } from '@/api/getCityByCoords';
import { useListCities } from './useListCities';
import { useLocation } from '@/Components/ListAvailableCityNames/useLocation';
import { ListAvailableCityNamesPropsType } from '@/Types';

export default function ListAvailableCityNames({
  selectedCity,
  setSelectedCity,
  setIsSearchCity,
}: ListAvailableCityNamesPropsType) {
  const router = useRouter();
  const locale = useLocale();
  const { location, errorMessage } = useLocation();
  const [isSearch, setIsSearch] = useState(false);
  const t = useTranslations('ListAvailableCityNames');
  const { debouncedValue, cities, handleCityClick } = useListCities({
    selectedCity,
    setSelectedCity,
    setIsSearchCity,
  });

  const handleSearchLocationClick = () => setIsSearch((prev) => !prev);

  const fetchSearchCity = async () => {
    if (!location) return;
    const data = await getCityByCoords(location.lat, location.lon, locale);
    if (!data) return;

    router.push(
      `/${locale}/weather/${data.countryCode}/${data.toponymname}/${data.id}?lat=${data.lat}&lon=${data.lon}`
    );
  };

  useEffect(() => {
    if (isSearch) {
      fetchSearchCity();
    }
  }, [isSearch, location, locale]);

  const locationItem = (
    <li
      onClick={handleSearchLocationClick}
      className='mt-[50px] last:mb-[50px] hover:bg-amber-200/50 '
    >
      {t('location')}
    </li>
  );

  const errorItem =
    errorMessage && isSearch ? (
      <li className='m-[10px] last:mb-[50px] text-red-800'>{errorMessage}</li>
    ) : null;

  const cityItem =
    debouncedValue.length < 3 || cities.length === 0 ? null : (
      <>
        {cities.map((item) => (
          <li
            onClick={handleCityClick}
            className='hover:bg-amber-200/50 m-[10px] last:mb-[30px]'
            key={item.lat}
            data-lat={item.lat}
            data-lon={item.lng}
            data-city={item.name}
            data-countrycode={item.countryCode}
            data-id={item.geonameId}
            data-toponymname={item.toponymName}
          >
            {item.name}, {item.countryCode}
          </li>
        ))}
      </>
    );

  return (
    <ul
      className={`absolute left-[50%] translate-x-[-50%] top-[49px] lg:w-[50%] w-[80%] text-center bg-white cursor-pointer`}
    >
      {locationItem}
      {errorItem}
      {cityItem}
    </ul>
  );
}
