"use client";

import { useState, useEffect } from 'react';
import {Company} from '../models/company';
import CompanyForm from './companyform';

export default function CompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  useEffect(() => {
        if (!localStorage.getItem('companies')) {
      const sampleCompanies = [
        {
          id: '1',
          name: 'Tech Solutions Inc.',
          address: '123 Tech Street, Silicon Valley',
          sales: 1500000,
          categories: ['Tech', 'Services'],
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Retail World',
          address: '456 Commerce Ave, New York',
          sales: 2500000,
          categories: ['Retail'],
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('companies', JSON.stringify(sampleCompanies));
    }
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
    setLoading(false);
  }, []);

  const deleteCompany = (id: string) => {
    if (confirm('¿Do you cant delete a company?')) {
      const updatedCompanies = companies.filter(company => company.id !== id);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      setCompanies(updatedCompanies);
    }
  };

  const handleFormSubmit = (companyData: Omit<Company, 'id' | 'createdAt'>) => {
    let updatedCompanies: Company[];
    
    if (editingCompany?.id) {
      // Editar empresa existente
      updatedCompanies = companies.map(c => 
        c.id === editingCompany.id ? { ...c, ...companyData } : c
      );
    } else {
      // Crear nueva empresa
      const newCompany: Company = {
        ...companyData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      updatedCompanies = [...companies, newCompany];
    }
    
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    setCompanies(updatedCompanies);
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-gray-900">Companies</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add new
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Don&apos;t exist any company yet
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{company.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${company.sales.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {company.categories.map((category, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCompany(company);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => company.id && deleteCompany(company.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {editingCompany ? 'Edit' : 'Add New'}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCompany(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <CompanyForm 
                company={editingCompany || undefined}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setIsModalOpen(false);
                  setEditingCompany(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}