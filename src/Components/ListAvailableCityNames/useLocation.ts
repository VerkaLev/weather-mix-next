'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CoordsType } from '@/Types';

export const useLocation = () => {
  const [location, setLocation] = useState<CoordsType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const t = useTranslations('ListAvailableCityNames');

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMessage(t('errorLocation'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        setErrorMessage(t('errorMessage') + error.message);
        setLocation(null);
      }
    );
  }, []);

  return { location, errorMessage };
};
