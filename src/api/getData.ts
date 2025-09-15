export default async function getData(url: string, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Request error, ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (e: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('url', e.message);
    }
    return null;
  }
}
