import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { listIngredients, createIngredient } from '../services/api';

export default function AdminDashboard(){
  const { token } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState({});
  const [message, setMessage] = useState('');

  useEffect(()=>{
    (async()=>{
      const res = await listIngredients();
      if(res.success) setIngredients(res.data);
    })();
  },[]);

  const addTestBase = async () => {
    if(!token) return setMessage('Login as admin');
    const res = await createIngredient(token, 'pizza-base', { name: 'Admin Base', price: 120, size: 'medium', baseType: 'thin-crust', stockQuantity: 30 });
    if(res.success) setMessage('Created');
    else setMessage('Failed');
    // refresh
    const res2 = await listIngredients();
    if(res2.success) setIngredients(res2.data);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">⚙️ Admin Dashboard</h1>
        <p className="text-gray-600">Manage your pizza ingredients and inventory</p>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105" 
            onClick={addTestBase}
          >
            ➕ Create Test Base
          </button>
        </div>
        
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('Created') || message.includes('success') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bases */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            🫓 Pizza Bases ({(ingredients.bases || []).length})
          </h3>
          <div className="space-y-3">
            {(ingredients.bases || []).length === 0 ? (
              <p className="text-gray-500 text-center py-4">No bases available</p>
            ) : (
              (ingredients.bases || []).map(base => (
                <div key={base._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">{base.name}</h4>
                      <p className="text-sm text-gray-600">₹{base.price}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      base.stockQuantity > 10 
                        ? 'bg-green-100 text-green-800' 
                        : base.stockQuantity > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {base.stockQuantity} left
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sauces */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            🍅 Sauces ({(ingredients.sauces || []).length})
          </h3>
          <div className="space-y-3">
            {(ingredients.sauces || []).length === 0 ? (
              <p className="text-gray-500 text-center py-4">No sauces available</p>
            ) : (
              (ingredients.sauces || []).map(sauce => (
                <div key={sauce._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">{sauce.name}</h4>
                      <p className="text-sm text-gray-600">Sauce</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      sauce.stockQuantity > 10 
                        ? 'bg-green-100 text-green-800' 
                        : sauce.stockQuantity > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {sauce.stockQuantity} left
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Cheeses */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            🧀 Cheeses ({(ingredients.cheeses || []).length})
          </h3>
          <div className="space-y-3">
            {(ingredients.cheeses || []).length === 0 ? (
              <p className="text-gray-500 text-center py-4">No cheeses available</p>
            ) : (
              (ingredients.cheeses || []).map(cheese => (
                <div key={cheese._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">{cheese.name}</h4>
                      <p className="text-sm text-gray-600">₹{cheese.price}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cheese.stockQuantity > 10 
                        ? 'bg-green-100 text-green-800' 
                        : cheese.stockQuantity > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cheese.stockQuantity} left
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
