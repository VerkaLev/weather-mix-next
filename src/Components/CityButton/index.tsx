import { CityButtonPropsType } from '@/Types';

export default function CityButton({
  handleSearchClick,
  selectedCity,
}: CityButtonPropsType) {
  return (
    <button
      onClick={handleSearchClick}
      className='w-fit h-[30px] cursor-pointer'
    >
      {selectedCity.name + ', ' + selectedCity.countryCode}
    </button>
  );
}
