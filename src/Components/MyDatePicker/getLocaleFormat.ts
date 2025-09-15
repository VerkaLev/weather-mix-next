import { ru, es, enUS } from 'date-fns/locale';

export const getLocaleFormat = (locale?: string) => {
  if (locale === 'es') {
    return { currentLocale: es, currentFormat: 'dd/MM/yyyy, eee' };
  } else if (locale === 'ru') {
    return { currentLocale: ru, currentFormat: 'dd.MM.yyyy, eee' };
  } else {
    return { currentLocale: enUS, currentFormat: 'M/d/yyyy, eee' };
  }
};
