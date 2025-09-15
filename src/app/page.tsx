import { redirect } from 'next/navigation';

export default async function Home() {
  redirect(`/es/weather/ES/Valencia/2509954?lat=39.4702&lon=-0.3768`);
}
