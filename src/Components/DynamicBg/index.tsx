'use client';

import { useContext } from 'react';
import { position } from '@/consts';
import { BgContext } from '@/Context/BgContext';

export default function DinamycBg() {
  const { bg } = useContext(BgContext);
  const isNight = bg.includes('night');
  const bgPosition = position[bg];
  return (
    <>
      <div
        style={{
          backgroundImage: `url(/images/bg/bg-home-${bg}.webp)`,
          backgroundPosition: bgPosition,
        }}
        className={`absolute inset-0 bg-no-repeat bg-cover`}
      />

      {isNight ? (
        <div
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%)',
          }}
          className='absolute inset-0 z-10'
        />
      ) : (
        <div
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.79) 0%, rgba(240, 245, 255, 0) 80%)',
          }}
          className='absolute inset-0 z-10'
        />
      )}
    </>
  );
}
