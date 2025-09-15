import { NavPagePropsType } from '@/Types';
import Logo from '../Logo';
import SearchCity from '../SearchCity';
import InputDate from '../InputDate';
import { Languages, LanguagesDropdown } from '../Languages';

export default function NavPage({
  initialCityName,
  initialCountryCode,
  initialId,
}: NavPagePropsType) {
  return (
    <nav className='fixed top-0 z-50 grid grid-cols-8 items-center w-full h-[50px] bg-white'>
      <div className='hidden lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:flex items-center'>
        <Logo />
        <Languages />
      </div>

      <div className='lg:hidden col-span-1 col-start-1 row-start-1 md:col-span-2 justify-self-start mx-5'>
        <LanguagesDropdown />
      </div>
      <div className='lg:hidden row-start-1 col-span-2 col-start-7 md:col-span-1 md:col-start-8 justify-self-end '>
        <Logo />
      </div>

      <SearchCity
        initialCityName={initialCityName}
        initialCountryCode={initialCountryCode}
        initialId={initialId}
      />
      <div className='absolute left-1/2 -translate-x-1/2 h-[30px] border-r border-black'></div>
      <InputDate />
    </nav>
  );
}
