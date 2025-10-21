import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-4">
        <div className="text-8xl mb-6">🍕❓</div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! This page seems to have been delivered to the wrong address.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            🏠 Go Home
          </Link>
          <Link 
            to="/builder"
            className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            🍕 Build a Pizza
          </Link>
        </div>
      </div>
    </div>
  );
}