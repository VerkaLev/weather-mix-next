'use client';

import { useEffect, useRef, useState } from 'react';
import { SelectedCityType } from '@/Types';

export const useSearchCity = (initialCity: SelectedCityType) => {
  const [isSearchCity, setIsSearchCity] = useState(false);
  const [isHasFocus, setIsHasFocus] = useState(false);
  const [selectedCity, setSelectedCity] =
    useState<SelectedCityType>(initialCity);
  const [prevSelectedCity, setPrevSelectedCity] =
    useState<SelectedCityType>(initialCity);

  const refContainer = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setPrevSelectedCity(selectedCity);
    setSelectedCity({
      name: '',
      lat: '',
      lon: '',
      countryCode: '',
      id: '',
      toponymname: '',
    });
    setIsSearchCity(true);
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setSelectedCity(prevSelectedCity);
      setIsSearchCity(false);
    }
  };

  const handleInputFocus = () => {
    setIsHasFocus(true);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  useEffect(() => {
    refInput.current?.focus();
  }, [isSearchCity]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        isSearchCity &&
        refContainer.current &&
        !refContainer.current.contains(e.target as Node)
      ) {
        setSelectedCity(prevSelectedCity);
        setIsSearchCity(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isSearchCity, prevSelectedCity]);

  return {
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
  };
};
