import { WeatherTempIconPropsType } from '@/Types';

export default function WeatherTempIcon({
  averageTemp,
  altIcon,
  srcIcon,
}: WeatherTempIconPropsType) {
  return (
    <div className='flex items-center'>
      <div className='flex items-center'>
        <div className='py-[10px] text-[6rem]'>{averageTemp}</div>
        <p className='self-start pt-[30px] text-[2rem]'>℃</p>
      </div>
      <img alt={altIcon} src={srcIcon} className='w-[90px] h-[90px]' />
    </div>
  );
}
