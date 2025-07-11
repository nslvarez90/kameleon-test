"use client";

import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import { Company } from '../models/company';

type CompanyFormProps = {
  company?: Company;
  onSubmit: (company: Omit<Company, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
};

const defaultCategories = ['Retail', 'Tech','Services', 'Foods'];

export default function CompanyForm({ company, onSubmit, onCancel }: CompanyFormProps) {
  const [formData, setFormData] = useState<Omit<Company, 'id' | 'createdAt'>>({
    name: '',
    address: '',
    sales: 0,
    categories: [],
  });

  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (company) {
      const { ...companyData } = company;
      setFormData(companyData);
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddCategory = () => {
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, newCategory],
      });
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(cat => cat !== categoryToRemove),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre de la Empresa
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="sales" className="block text-sm font-medium text-gray-700">
            Ventas ($)
          </label>
          <input
            type="number"
            id="sales"
            min="0"
            step="0.01"
            required
            value={formData.sales}
            onChange={(e) => setFormData({ ...formData, sales: parseFloat(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categorías
          </label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="Agregar categoría"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
            >
              Agregar
            </button>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {defaultCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  if (!formData.categories.includes(category)) {
                    setFormData({
                      ...formData,
                      categories: [...formData.categories, category],
                    });
                  }
                }}
                className={`px-3 py-1 text-xs rounded-full ${
                  formData.categories.includes(category)
                    ? 'bg-blue-100 text-blue-800 cursor-default'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Categories:</h4>
            {formData.categories.length === 0 ? (
              <p className="text-sm text-gray-500">No selected Categories</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((category) => (
                  <span 
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-1 text-blue-600 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiSave /> Save
          </button>
        </div>
      </div>
    </form>
  );
}