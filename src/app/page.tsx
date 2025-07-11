import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/login'); // Redirige al login
}