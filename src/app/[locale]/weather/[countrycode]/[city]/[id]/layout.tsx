import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getTranslateCityName } from '@/api/getTranslateCityName';
import NavPage from '@/Components/NavPage';
import { MyLayoutProps } from '@/Types';

export default async function RootLayout({ children, params }: MyLayoutProps) {
  const { locale, id, countrycode } = await params;

  const messages = await getMessages({ locale: locale });
  const initialCityName = await getTranslateCityName(id, locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NavPage
        initialCityName={initialCityName.name}
        initialCountryCode={countrycode}
        initialId={id}
      />
      {children}
    </NextIntlClientProvider>
  );
}
