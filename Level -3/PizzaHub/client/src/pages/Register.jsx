import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Register(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const payload = { firstName, lastName, email, password, phone, address: { street, city, state, zipCode } };
    const res = await register(payload);
    if (res.success && res.token) {
      contextLogin(res.token, res.user);
      navigate('/builder');
    } else {
      setError(res.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🍕</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Pizza Family</h2>
            <p className="text-gray-600">Create your account and start ordering delicious pizzas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Full Name</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  value={firstName} 
                  onChange={e=>setFirstName(e.target.value)} 
                  placeholder="First name" 
                  className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  required
                />
                <input 
                  value={lastName} 
                  onChange={e=>setLastName(e.target.value)} 
                  placeholder="Last name" 
                  className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email"
                  value={email} 
                  onChange={e=>setEmail(e.target.value)} 
                  placeholder="your@email.com" 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel"
                  value={phone} 
                  onChange={e=>setPhone(e.target.value)} 
                  placeholder="+91 98765 43210" 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                placeholder="Create a secure password" 
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Address</label>
              <div className="space-y-4">
                <input 
                  value={street} 
                  onChange={e=>setStreet(e.target.value)} 
                  placeholder="Street address" 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    value={city} 
                    onChange={e=>setCity(e.target.value)} 
                    placeholder="City" 
                    className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                    required
                  />
                  <input 
                    value={state} 
                    onChange={e=>setState(e.target.value)} 
                    placeholder="State" 
                    className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                    required
                  />
                  <input 
                    value={zipCode} 
                    onChange={e=>setZipCode(e.target.value)} 
                    placeholder="ZIP Code" 
                    className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200" 
                    required
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">⚠️</span>
                  {error}
                </div>
              </div>
            )}

            {/* Register Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              🎉 Create Account
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account? {' '}
                <a href="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
