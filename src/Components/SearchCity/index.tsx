'use client';

import { useSearchCity } from './useSearchCity';
import { SearchCityPropsType } from '@/Types';
import ListAvailableCityNames from '../ListAvailableCityNames';
import CityButton from '../CityButton';
import InputCity from '../InputCity';

export default function SearchCity({
  initialCityName,
  initialCountryCode,
  initialId,
}: SearchCityPropsType) {
  const {
    refContainer,
    refInput,
    isHasFocus,
    isSearchCity,
    setIsSearchCity,
    handleSearchClick,
    handleCityChange,
    handleEnterKeyDown,
    handleInputFocus,
    selectedCity,
    setSelectedCity,
  } = useSearchCity({
    name: initialCityName,
    lat: '',
    lon: '',
    countryCode: initialCountryCode,
    id: '',
    toponymname: initialId,
  });

  return (
    <div
      ref={refContainer}
      className='col-start-2 col-span-3 md:col-start-3 md:col-span-2 row-start-1 flex justify-end mr-[15px]'
    >
      {!isSearchCity ? (
        <CityButton
          handleSearchClick={handleSearchClick}
          selectedCity={selectedCity}
        />
      ) : (
        <>
          <InputCity
            refInput={refInput}
            selectedCity={selectedCity}
            handleCityChange={handleCityChange}
            handleEnterKeyDown={handleEnterKeyDown}
            handleInputFocus={handleInputFocus}
          />
          {isHasFocus && (
            <ListAvailableCityNames
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              setIsSearchCity={setIsSearchCity}
            />
          )}
        </>
      )}
    </div>
  );
}
