import { MainHeaderPropsType } from '@/Types';

export default function MainHeader({ t }: MainHeaderPropsType) {
  return (
    <div className='sm:col-span-3 sm:col-start-4 sm:row-start-1 lg:row-start-1 lg:col-span-3 xl:col-span-4 flex justify-center py-10'>
      <h1 className='text-center px-2 lg:px-10 text-[1.9rem] md:text-[1.9rem] lg:text-[3rem]'>
        {t('part_1')} <br className='hidden lg:block' /> {t('part_2')}{' '}
        <br className='hidden lg:block' />
        {t('part_3')} {t('part_4')}
      </h1>
    </div>
  );
}
