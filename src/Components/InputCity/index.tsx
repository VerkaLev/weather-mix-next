import { InputCityPropsType } from '@/Types';

export default function InputCity({
  refInput,
  selectedCity,
  handleCityChange,
  handleEnterKeyDown,
  handleInputFocus,
}: InputCityPropsType) {
  return (
    <input
      ref={refInput}
      className='w-full text-center bg-amber-200/50 focus:outline-none'
      type='text'
      name='city'
      value={selectedCity.name}
      onChange={handleCityChange}
      onKeyDown={handleEnterKeyDown}
      onFocus={handleInputFocus}
      placeholder='city'
      autoComplete='off'
    />
  );
}
