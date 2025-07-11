// src/app/auth/login/layout.tsx
import { ReactNode } from 'react';

// Opción 1: Layout específico para /auth/login
export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>{children}</main>
    </div>
  );
}