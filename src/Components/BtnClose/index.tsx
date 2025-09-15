import { getColorAccent } from '@/helpers/getColorAccent';

export type BtnClosePropsType = {
  handleCloseSourceClick: () => void;
};

export default function BtnClose({
  handleCloseSourceClick,
}: BtnClosePropsType) {
  const { borderAccent } = getColorAccent();
  return (
    <button
      onClick={handleCloseSourceClick}
      className={`absolute right-[-40] top-[-10] w-[30px] h-[30px] my-2 border-[2.5] ${borderAccent} rounded-full bg-[var(--bg-color)] cursor-pointer`}
    >
      X
    </button>
  );
}
