import { NextRequest, NextResponse } from 'next/server';
import { getAllAvailableCityNames } from '@/api/getAllAvailableCityNames';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const letters = searchParams.get('letters');
  const locale = searchParams.get('locale');
  if (!letters || !locale) {
    return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 });
  }

  const dataAvailableCityNames = await getAllAvailableCityNames(
    letters,
    locale
  );

  return NextResponse.json({ dataAvailableCityNames });
}
