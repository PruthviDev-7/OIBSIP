import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
    console.log('🧪 Starting comprehensive API test...\n');
    
    try {
        // 1. Test health endpoint
        console.log('1️⃣ Testing health endpoint...');
        const health = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health:', health.data);
        
        // 2. Test registration
        console.log('\n2️⃣ Testing user registration...');
        const newUser = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            password: 'password123',
            phone: '1234567890',
            address: {
                street: 'Test Street',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345'
            }
        };
        
        let registerResponse;
        try {
            registerResponse = await axios.post(`${BASE_URL}/auth/register`, newUser);
            console.log('✅ Registration successful:', registerResponse.data.success);
        } catch (error) {
            if (error.response?.data?.message?.includes('already exists')) {
                console.log('ℹ️ User already exists, continuing...');
            } else {
                throw error;
            }
        }
        
        // 3. Test login
        console.log('\n3️⃣ Testing user login...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('✅ Login successful:', loginResponse.data.success);
        
        const token = loginResponse.data.token;
        const user = loginResponse.data.user;
        
        // 4. Test ingredients endpoint
        console.log('\n4️⃣ Testing ingredients endpoint...');
        const ingredients = await axios.get(`${BASE_URL}/ingredients`);
        console.log('✅ Ingredients loaded:');
        console.log(`   - Bases: ${ingredients.data.data.bases.length}`);
        console.log(`   - Sauces: ${ingredients.data.data.sauces.length}`);
        console.log(`   - Cheeses: ${ingredients.data.data.cheeses.length}`);
        
        // 5. Test order placement
        console.log('\n5️⃣ Testing order placement...');
        const orderData = {
            customer: user._id,
            pizzaConfiguration: {
                pizzaBase: { 
                    ingredient: ingredients.data.data.bases[0]._id, 
                    size: 'medium' 
                },
                sauce: { 
                    ingredient: ingredients.data.data.sauces[0]._id, 
                    quantity: 'regular' 
                },
                cheese: { 
                    ingredient: ingredients.data.data.cheeses[0]._id, 
                    quantity: 'regular' 
                },
                vegetables: [],
                meat: []
            },
            quantity: 1,
            itemPrice: 150,
            tax: 15,
            totalAmount: 165,
            customerPhone: user.phone,
            deliveryAddress: user.address
        };
        
        const orderResponse = await axios.post(`${BASE_URL}/orders`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Order placed successfully:', orderResponse.data.data.orderNumber);
        
        // 6. Test order retrieval
        console.log('\n6️⃣ Testing order retrieval...');
        const ordersResponse = await axios.get(`${BASE_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Orders retrieved:', ordersResponse.data.data.length, 'orders');
        
        // 7. Test admin login and functionality
        console.log('\n7️⃣ Testing admin functionality...');
        const adminLogin = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'admin@example.com',
            password: 'Admin@123'
        });
        const adminToken = adminLogin.data.token;
        console.log('✅ Admin login successful');
        
        // Create a new ingredient as admin
        const newIngredient = {
            name: 'Test Cheese Premium',
            price: 80,
            stockQuantity: 25,
            lowStockThreshold: 5,
            cheeseType: 'mozzarella'
        };
        
        const ingredientResponse = await axios.post(`${BASE_URL}/ingredients`, {
            type: 'cheese',
            payload: newIngredient
        }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ New ingredient created:', ingredientResponse.data.data.name);
        
        // 8. Test Razorpay order creation
        console.log('\n8️⃣ Testing payment order creation...');
        try {
            const paymentOrderResponse = await axios.post(`${BASE_URL}/payments/razorpay/create-order`, {
                amount: 165
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Payment order created:', paymentOrderResponse.data.data.id);
        } catch (error) {
            if (error.response?.data?.message?.includes('Razorpay')) {
                console.log('⚠️ Razorpay not configured (expected in development)');
            } else {
                throw error;
            }
        }
        
        console.log('\n🎉 All API tests completed successfully!');
        console.log('\n📋 Summary:');
        console.log('✅ Health check working');
        console.log('✅ User registration working');
        console.log('✅ User login working');
        console.log('✅ Ingredients API working');
        console.log('✅ Order placement working');
        console.log('✅ Order retrieval working');
        console.log('✅ Admin functionality working');
        console.log('⚠️ Payment integration needs Razorpay keys');
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        process.exit(1);
    }
}

testAPI();