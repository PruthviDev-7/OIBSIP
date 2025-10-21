import React, { useEffect, useState } from 'react';
import { listIngredients, placeOrder } from '../services/api';
import { createRazorpayOrder } from '../services/api';

export default function PizzaBuilder(){
  const [bases, setBases] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedSauce, setSelectedSauce] = useState('');
  const [selectedCheese, setSelectedCheese] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(()=>{
    (async()=>{
      try {
        setLoading(true);
        const res = await listIngredients();
        if(res && res.success){
          setBases(res.data?.bases || []);
          setSauces(res.data?.sauces || []);
          setCheeses(res.data?.cheeses || []);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Failed to load ingredients', msg);
        setMessage('Failed to load ingredients');
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  const handleOrder = async () => {
    setOrderLoading(true);
    setMessage('');
    
    const token = localStorage.getItem('token');
    if(!token) {
      setMessage('Please login first');
      setOrderLoading(false);
      return;
    }
    const userJson = localStorage.getItem('user');
    if(!userJson) {
      setMessage('Please login first');
      setOrderLoading(false);
      return;
    }
    
    const user = JSON.parse(userJson);
    const order = {
      customer: user._id,
      pizzaConfiguration: {
        pizzaBase: { ingredient: selectedBase, size: 'medium' },
        sauce: { ingredient: selectedSauce, quantity: 'regular' },
        cheese: { ingredient: selectedCheese, quantity: 'regular' },
        vegetables: [],
        meat: []
      },
      quantity:1,
      itemPrice: (bases.find(b=>b._id===selectedBase)?.price ?? 100),
      tax: 10,
      totalAmount: ((bases.find(b=>b._id===selectedBase)?.price ?? 100) + 10),
      customerPhone: user.phone,
      deliveryAddress: user.address
    };

    try {
      const res = await placeOrder(token, order);
      if(res.success) setMessage('🎉 Order placed successfully! Order #' + res.data.orderNumber);
      else setMessage('❌ Order failed: ' + (res.message||'unknown'));
    } catch (err) {
      setMessage('❌ Order failed: Network error');
    } finally {
      setOrderLoading(false);
    }
  };

  const handleCheckout = async () => {
    setMessage('');
    
    // Check if payment is configured
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      setMessage('💳 Payment gateway not configured. Please use "Place Order" for now or contact admin.');
      return;
    }

    const amount = (bases.find(b=>b._id===selectedBase)?.price ?? 100) + 10;
    try {
      const token = localStorage.getItem('token');
      const r = await createRazorpayOrder(token, { amount });
      if (!r.success) {
        setMessage('❌ Payment initialization failed: ' + (r.message || 'Server error'));
        return;
      }
      
      const order = r.data;
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'PizzaHub',
        description: 'Pizza Order Payment',
        order_id: order.id,
        handler: function (response) {
          setMessage('🎉 Payment successful! Order ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: JSON.parse(localStorage.getItem('user') || '{}')?.firstName || '',
          email: JSON.parse(localStorage.getItem('user') || '{}')?.email || '',
          contact: JSON.parse(localStorage.getItem('user') || '{}')?.phone || ''
        },
        theme: {
          color: '#ea580c'
        },
        modal: {
          ondismiss: function() {
            setMessage('💰 Payment cancelled by user');
          }
        }
      };
      
      // Load checkout script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onerror = () => {
        setMessage('❌ Failed to load payment gateway. Please try again.');
      };
      script.onload = () => {
        try {
          // eslint-disable-next-line no-undef
          const rz = new window.Razorpay(options);
          rz.open();
        } catch (error) {
          setMessage('❌ Payment gateway initialization failed. Please use "Place Order" instead.');
        }
      };
      document.body.appendChild(script);
    } catch (err) {
      console.error('Payment error:', err);
      setMessage('❌ Payment error: ' + (err.response?.data?.message || err.message || 'Network error'));
    }
  };

  const totalPrice = ((selectedBase ? bases.find(b=>b._id===selectedBase)?.price : 0) ?? 0) + 10;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-16">
          <div className="text-8xl mb-4 animate-bounce">🍕</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Ingredients...</h2>
          <p className="text-gray-600">Getting ready to build your perfect pizza</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🍕 Build Your Perfect Pizza</h1>
        <p className="text-gray-600">Choose your favorite ingredients and create your dream pizza</p>
      </div>

      {/* Pizza Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Bases */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            🫓 Pizza Base
          </h3>
          <div className="space-y-3">
            {(bases || []).map((b) => (
              <div 
                key={b._id} 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedBase === b._id 
                    ? 'border-orange-500 bg-orange-50 shadow-md' 
                    : 'border-gray-200 hover:border-orange-300'
                }`} 
                onClick={() => setSelectedBase(b._id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{b?.name ?? 'Unnamed'}</span>
                  <span className="text-orange-600 font-bold">₹{b?.price ?? 0}</span>
                </div>
                {selectedBase === b._id && (
                  <div className="text-xs text-orange-600 mt-1">✓ Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sauces */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            🍅 Sauce
          </h3>
          <div className="space-y-3">
            {(sauces || []).map((s) => (
              <div 
                key={s._id} 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedSauce === s._id 
                    ? 'border-red-500 bg-red-50 shadow-md' 
                    : 'border-gray-200 hover:border-red-300'
                }`} 
                onClick={() => setSelectedSauce(s._id)}
              >
                <div className="font-medium text-gray-800">{s?.name ?? 'Unnamed'}</div>
                {selectedSauce === s._id && (
                  <div className="text-xs text-red-600 mt-1">✓ Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cheeses */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            🧀 Cheese
          </h3>
          <div className="space-y-3">
            {(cheeses || []).map((c) => (
              <div 
                key={c._id} 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedCheese === c._id 
                    ? 'border-yellow-500 bg-yellow-50 shadow-md' 
                    : 'border-gray-200 hover:border-yellow-300'
                }`} 
                onClick={() => setSelectedCheese(c._id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{c?.name ?? 'Unnamed'}</span>
                  <span className="text-yellow-600 font-bold">₹{c?.price ?? 0}</span>
                </div>
                {selectedCheese === c._id && (
                  <div className="text-xs text-yellow-600 mt-1">✓ Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Base:</span>
              <span className="font-medium">
                {selectedBase ? bases.find(b=>b._id===selectedBase)?.name : 'Not selected'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Sauce:</span>
              <span className="font-medium">
                {selectedSauce ? sauces.find(s=>s._id===selectedSauce)?.name : 'Not selected'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cheese:</span>
              <span className="font-medium">
                {selectedCheese ? cheeses.find(c=>c._id===selectedCheese)?.name : 'Not selected'}
              </span>
            </div>
            <hr className="my-3"/>
            <div className="flex justify-between text-sm">
              <span>Pizza Price:</span>
              <span>₹{(selectedBase ? bases.find(b=>b._id===selectedBase)?.price : 0) ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>₹10</span>
            </div>
            <hr className="my-3"/>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-orange-600">₹{totalPrice}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleOrder} 
              disabled={!selectedBase || !selectedSauce || !selectedCheese || orderLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              {orderLoading ? (
                <>
                  <div className="animate-spin mr-2">⏳</div>
                  Processing...
                </>
              ) : (
                <>🛒 Place Order (₹{totalPrice})</>
              )}
            </button>
            
            <button 
              onClick={handleCheckout} 
              disabled={!selectedBase || !selectedSauce || !selectedCheese || orderLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              💳 Pay Online (₹{totalPrice})
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes('success') || message.includes('placed') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Visual Pizza Preview */}
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Pizza Preview</h3>
        <div className="text-6xl mb-4">🍕</div>
        <div className="text-gray-600">
          {selectedBase && selectedSauce && selectedCheese 
            ? `${bases.find(b=>b._id===selectedBase)?.name} with ${sauces.find(s=>s._id===selectedSauce)?.name} and ${cheeses.find(c=>c._id===selectedCheese)?.name}`
            : 'Select your ingredients to see your pizza!'
          }
        </div>
      </div>
    </div>
  );
}
