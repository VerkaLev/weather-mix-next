import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DateContextProvider } from '@/Context/DateContextProvider';

export const metadata: Metadata = {
  title: 'Weather Mix',
  icons: {
    icon: '/favicon.png',
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <DateContextProvider>{children}</DateContextProvider>
      </body>
    </html>
  );
}
