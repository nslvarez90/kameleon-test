"use client";

import { getSession, logout } from '@/src/app/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import UsersTable from '../components/userstable';
import CompaniesTable from '../components/companiestable';
import  { DashboardBI} from "../components/dashboardBI";
export default function DashboardPage() {
  const router = useRouter();
  const session = getSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'companies'>('dashboard');


  useEffect(() => {
    if (!session) 
      router.push('/auth/login');
   
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
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center p-3 rounded-md w-full text-left text-gray-700 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-600'} transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="curr##101828">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  {sidebarOpen && <span className="ml-3">Dashboard</span>}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center p-3 rounded-md w-full text-left text-gray-700 ${activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-600'} transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#101828">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {sidebarOpen && <span className="ml-3">Users</span>}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('companies')}
                  className={`flex items-center p-3 rounded-md w-full text-left text-gray-700 ${activeTab === 'companies' ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-600'} transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="#101828">
                    <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                  </svg>
                  {sidebarOpen && <span className="ml-3">Companies</span>}
                </button>
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
              <h1 className="text-xl font-semibold text-gray-900">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'companies' && 'Company Management'}
              </h1>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' &&  <DashboardBI />}

          {activeTab === 'users' && <UsersTable />}

          {activeTab === 'companies' && <CompaniesTable /> }
        </main>
      </div>
    </div>
  );
}