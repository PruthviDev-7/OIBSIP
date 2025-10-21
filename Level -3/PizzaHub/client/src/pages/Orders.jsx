import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';

export default function Orders(){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    (async()=>{
      const token = localStorage.getItem('token');
      if(!token) return;
      const res = await getOrders(token);
      if(res.success) setOrders(res.data);
    })();
  },[]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'out_for_delivery': return '🚚';
      case 'delivered': return '🎉';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'preparing': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'out_for_delivery': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 Your Orders</h1>
        <p className="text-gray-600">Track your delicious pizza orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍕</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-6">Start building your first pizza!</p>
          <a 
            href="/builder"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            🔧 Build Your Pizza
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)} mt-2 sm:mt-0`}>
                    <span className="mr-1">{getStatusIcon(order.status)}</span>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>

                {/* Pizza Details */}
                {order.pizzaConfiguration && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">🍕 Pizza Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      {order.pizzaConfiguration.pizzaBase && (
                        <div>
                          <span className="font-medium">Base:</span> {order.pizzaConfiguration.pizzaBase.ingredient?.name || 'Standard'}
                        </div>
                      )}
                      {order.pizzaConfiguration.sauce && (
                        <div>
                          <span className="font-medium">Sauce:</span> {order.pizzaConfiguration.sauce.ingredient?.name || 'Standard'}
                        </div>
                      )}
                      {order.pizzaConfiguration.cheese && (
                        <div>
                          <span className="font-medium">Cheese:</span> {order.pizzaConfiguration.cheese.ingredient?.name || 'Standard'}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    <span className="text-sm text-gray-600">
                      📦 Quantity: {order.quantity || 1}
                    </span>
                    {order.customerPhone && (
                      <span className="text-sm text-gray-600">
                        📞 {order.customerPhone}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">
                      ₹{order.totalAmount}
                    </div>
                    <div className="text-sm text-gray-500">
                      Including tax
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                {order.deliveryAddress && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-1">🏠 Delivery Address</h5>
                    <p className="text-sm text-gray-600">
                      {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.zipCode}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
