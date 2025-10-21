// API Service - All HTTP requests to the backend server
// This file contains functions to communicate with the Node.js backend

// Get the backend URL from environment variable or use localhost as default
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

// Login function - Sends email and password to backend for authentication
export async function login(email, password) {
  // Clean the email input to remove extra spaces
  const cleanEmail = (email || '').toString().trim();
  const payload = { email: cleanEmail, password };
  console.log('API login payload', payload);
  
  // Make HTTP POST request to login endpoint
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // Tell server we're sending JSON
    body: JSON.stringify(payload) // Convert JS object to JSON string
  });
  
  const json = await res.json(); // Convert response back to JS object
  console.log('API login response', json);
  return json;
}

// Register function - Creates new user account
export async function register(payload) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function createIngredient(token, type, payload) {
  const res = await fetch(`${API_BASE}/api/ingredients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ type, payload })
  });
  return res.json();
}

export async function listIngredients(type) {
  const q = type ? `?type=${encodeURIComponent(type)}` : '';
  const res = await fetch(`${API_BASE}/api/ingredients${q}`);
  return res.json();
}

export async function placeOrder(token, order) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(order)
  });
  return res.json();
}

export async function getOrders(token) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function createRazorpayOrder(token, payload) {
  const res = await fetch(`${API_BASE}/api/payments/razorpay/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export default { login, register, createIngredient, listIngredients, placeOrder, getOrders, createRazorpayOrder };
