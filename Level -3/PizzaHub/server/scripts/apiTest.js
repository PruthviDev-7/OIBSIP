import dotenv from 'dotenv';

dotenv.config();

const BASE = process.env.API_BASE || 'http://localhost:5000';

const test = async () => {
  try {
    console.log('Testing health...');
    let r = await fetch(`${BASE}/api/health`);
    console.log('Health:', await r.json());

    // Login with seeded admin
    console.log('Logging in as admin...');
    r = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: process.env.SEED_ADMIN_EMAIL || 'admin@example.com', password: process.env.SEED_ADMIN_PASSWORD || 'Admin@123' })
    });
    const loginRes = await r.json();
    console.log('Login response:', loginRes);
    if (!loginRes.token) return console.error('Login failed, cannot continue tests');

    const token = loginRes.token;

    // Create ingredient (as admin)
    console.log('Creating test pizza base...');
    r = await fetch(`${BASE}/api/ingredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ type: 'pizza-base', payload: { name: 'Test Base', price: 100, size: 'medium', baseType: 'thin-crust', stockQuantity: 50 } })
    });
    const createdBase = await r.json();
    console.log('Created base:', createdBase);

    if (createdBase.data) {
      const baseId = createdBase.data._id;
      // Create a sauce, cheese for order
      console.log('Creating sauce and cheese...');
      await fetch(`${BASE}/api/ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: 'sauce', payload: { name: 'Tomato Sauce', price: 20, sauceType: 'tomato', stockQuantity: 50 } })
      });
      await fetch(`${BASE}/api/ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: 'cheese', payload: { name: 'Mozzarella', price: 30, cheeseType: 'mozzarella', stockQuantity: 50 } })
      });

      // Fetch lists to get IDs for sauce and cheese
      r = await fetch(`${BASE}/api/ingredients`);
      const lists = await r.json();
      const sauce = lists.data.sauces.find(s => s.name === 'Tomato Sauce');
      const cheese = lists.data.cheeses.find(c => c.name === 'Mozzarella');

      if (!sauce || !cheese) return console.error('Could not find sauce or cheese');

      // Create an order as admin (customer field uses admin id for testing)
      console.log('Placing an order...');
      r = await fetch(`${BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          customer: loginRes.user._id,
          pizzaConfiguration: {
            pizzaBase: { ingredient: baseId, size: 'medium' },
            sauce: { ingredient: sauce._id, quantity: 'regular' },
            cheese: { ingredient: cheese._id, quantity: 'regular' },
            vegetables: [],
            meat: []
          },
          quantity: 1,
          itemPrice: 150,
          tax: 15,
          totalAmount: 165,
          customerPhone: loginRes.user.phone,
          deliveryAddress: loginRes.user.address
        })
      });

      const orderRes = await r.json();
      console.log('Order response:', orderRes);
    }
  } catch (error) {
    console.error('Test error:', error);
  }
};

test();
