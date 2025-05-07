// app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const token = cookies().get('token')?.value;

  const res = await fetch('http://localhost:8080/api/v1/me', {
    headers: {
      Cookie: `token=${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    redirect('/login'); // SSR redirect
  }

  const user = await res.json();
//   console.log(user);

  return <div className='pt-40 text-center min-h-[200vh]'>Welcome, {user}</div>;
}
