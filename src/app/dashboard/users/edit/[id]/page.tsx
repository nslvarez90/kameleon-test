"use client";

import { useParams } from 'next/navigation';
import UserForm from '@/src/app/components/userform'; 

export default function EditUserPage() {
  const params = useParams();
  const userId = params.id as string;

  return <UserForm userId={userId} />;
}