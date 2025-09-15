import { NextRequest, NextResponse } from 'next/server';
import getCurrentWeather from '@/api/getCurrentWeather';
import getHourlyWeather from '@/api/getHourlyWeather';
import getWeeklyWeather from '@/api/getWeeklyWeather';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 });
  }

  const [dataCurrentWeather, dataWeeklyWeather, dataHourlyWeather] =
    await Promise.all([
      getCurrentWeather({ lat: Number(lat), lon: Number(lon) }),
      getWeeklyWeather({ lat: Number(lat), lon: Number(lon) }),
      getHourlyWeather({ lat: Number(lat), lon: Number(lon) }),
    ]);

  return NextResponse.json({
    dataCurrentWeather,
    dataWeeklyWeather,
    dataHourlyWeather,
  });
}
