'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const useLanguages = (langs: string[]) => {
  const router = useRouter();
  const path = usePathname();

  const searchParams = useSearchParams();

  const parts = path.split('/');
  const langIndex = parts.findIndex((part) => langs.includes(part));
  const currentLang = parts[langIndex];

  const handleChangeLangClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    parts[langIndex] = target.innerText;

    const newPath = parts.join('/');
    const query = searchParams.toString();
    const fullUrl = query ? `${newPath}?${query}` : newPath;
    router.push(fullUrl);
  };

  return { currentLang, handleChangeLangClick };
};
