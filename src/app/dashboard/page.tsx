"use client";

import { getSession, logout } from '@/src/app/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const session = getSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex flex-col h-full">
          {/* Botón para expandir/contraer sidebar */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-6 p-2 rounded-md hover:bg-gray-100 self-end"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#101828">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#101828">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Enlaces del sidebar */}
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#" 
                  className="flex items-center p-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#101828">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  {sidebarOpen && <span className="ml-3 text-gray-700 ">Sales Status</span>}
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="flex items-center p-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#101828">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {sidebarOpen && <span className="ml-3 text-gray-700 "> Users</span>}
                </Link>
                   <Link 
                  href="#" 
                  className="flex items-center p-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#101828" className="w-5 h-5">
                        <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                 </svg>
                  {sidebarOpen && <span className="ml-3 text-gray-700 "> Companies</span>}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Información del usuario */}
          {sidebarOpen && (
            <div className="mt-auto p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-700">{session.name}</p>
              <p className="text-xs text-gray-500">{session.email}</p>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                ¡Bienvenido, {session.name}!
              </h2>
              <p className="text-gray-500">
                Has iniciado sesión correctamente.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}