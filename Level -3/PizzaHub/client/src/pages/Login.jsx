import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login(email, password);
      console.log('Login response', res);
      if (res && res.success && res.token) {
        contextLogin(res.token, res.user);
        navigate('/builder');
      } else {
        // if validation errors from express-validator
        if (res && res.errors && Array.isArray(res.errors)) {
          const msgs = res.errors.map(e => `${e.param || e.path || e.location || e.msg}: ${e.msg || JSON.stringify(e)}`);
          setError(msgs.join('; '));
        } else {
          setError((res && (res.message || JSON.stringify(res))) || 'Login failed');
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Login error', err);
      setError('Network error: ' + msg);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🍕</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to order your favorite pizza</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email"
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                placeholder="Enter your email" 
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                placeholder="Enter your password" 
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                required
              />
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

            {/* Login Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              🔓 Sign In
            </button>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Don't have an account? {' '}
                <a href="/register" className="text-orange-600 hover:text-orange-700 font-semibold">
                  Create Account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
