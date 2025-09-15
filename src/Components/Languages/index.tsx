'use client';

import { useState } from 'react';
import { useLanguages } from './useLanguages';

export function Languages() {
  const langs = ['es', 'en', 'ru'];
  const { currentLang, handleChangeLangClick } = useLanguages(langs);

  return (
    <>
      {langs.map((item, i) => (
        <button
          onClick={handleChangeLangClick}
          key={item}
          className={`h-[30px] px-[15px] ${
            i !== langs.length - 1 ? 'border-r border-black' : ''
          } ${
            currentLang === item ? 'text-emerald-400 font-bold' : ''
          } cursor-pointer`}
        >
          {item}
        </button>
      ))}
    </>
  );
}

export function LanguagesDropdown() {
  const langs = ['es', 'en', 'ru'];
  const [isOpen, setIsOpen] = useState(false);
  const { currentLang, handleChangeLangClick } = useLanguages(langs);
  const handleOpenClick = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={handleOpenClick}
        className='relative w-[30px] h-[30px] font-bold text-emerald-400'
      >
        {currentLang}
      </button>

      <div
        className={`absolute flex md:flex-col transition-all duration-300 transform 
      ${
        isOpen
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none'
      }`}
      >
        {langs.map((item) =>
          item !== currentLang ? (
            <button
              onClick={handleChangeLangClick}
              key={item}
              className='h-[30px] w-[30px] md:mb-1 mr-1 border-[3px] border-emerald-400 rounded-full bg-white hover:bg-emerald-600 hover:text-white'
            >
              {item}
            </button>
          ) : (
            ''
          )
        )}
      </div>
    </>
  );
}
