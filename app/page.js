export const dynamic = "force-dynamic";
// app/page.tsx (or app/page.jsx)
import { cookies } from 'next/headers';
import Hero from '@/components/Hero';
import Feed from '@/components/Feed';

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  // Show feed if token exists (user is logged in)
  return token ? <Feed /> : <Hero />;
}
