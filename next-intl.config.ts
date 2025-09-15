import { getRequestConfig } from 'next-intl/server';

const messagesMap: Record<string, any> = {
  ru: () => import('@/locales/ru.json'),
  en: () => import('@/locales/en.json'),
  es: () => import('@/locales/es.json'),
};

export default getRequestConfig(async ({ locale }) => {
  const lang = locale ?? 'ru';
  const loader = messagesMap[lang] ?? messagesMap['ru'];
  return {
    locale: lang,
    messages: (await loader()).default,
  };
});
