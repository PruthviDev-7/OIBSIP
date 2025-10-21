# 💳 Razorpay Payment Gateway - Complete Setup Guide

**Version:** 2.0 (Updated with Complete Instructions)  
**Status:** Demo Application (Test Mode Ready, Production Guide Included)  
**Last Updated:** October 21, 2025

---

## 📊 CURRENT STATUS

Your PizzaHub application currently has:
- ✅ Razorpay SDK installed (`razorpay` package)
- ✅ Payment controller with order creation and verification
- ✅ Frontend integration ready
- ✅ Backend route configured
- ⏳ **Needs:** Razorpay API keys in `.env` file

**Available Payment Options:**
1. ✅ **Place Order** (Works now - no payment required, test/demo)
2. ⏳ **Checkout with Payment** (Requires Razorpay keys - real transaction flow)

---

## 🚀 QUICK START (5 MINUTES)

### **Option A: Test Payment (Recommended for Demo)**

Use these test keys in your `.env` files:

**1. Update `server/.env`:**
```env
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=test_secret_key_1234567890
```

**2. Update `client/.env.local`:**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890
```

**3. Restart servers:**
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

**4. Test payment with card:** `4111 1111 1111 1111`

✅ **No real charges with test keys!**

### **Option B: Create Real Razorpay Account (15 minutes)**

If you want to use real API keys:

1. Go to: https://razorpay.com
2. Click "Sign Up"
3. Choose "Business"
4. Fill in your details
5. Verify email
6. Go to: Dashboard → Settings → API Keys
7. Copy your test keys (use test first!)
8. Add to `.env` files
9. Restart servers

---

## 💡 TWO PAYMENT OPTIONS IN YOUR APP

### **Option 1: "Place Order" Button (Works Now)**
```
Features:
✅ No payment required
✅ Creates order immediately
✅ Shows in "My Orders"
✅ Perfect for demo
✅ No API keys needed
```

### **Option 2: "Checkout" Button (Requires Razorpay)**
```
Features:
✅ Real payment processing
✅ Razorpay modal checkout
✅ Payment verification
✅ Order linked to payment
✅ Test or live payments
❌ Requires API keys
```

---

## 🧪 TESTING WITH TEST KEYS

### **Test Cards Available**

| Card | Number | Expiry | CVV | Result |
|------|--------|--------|-----|--------|
| Visa | 4111 1111 1111 1111 | Any future | Any 3 | ✅ Success |
| MasterCard | 5555 5555 5555 4444 | Any future | Any 3 | ✅ Success |
| Amex | 3782 822463 10005 | Any future | Any 4 | ✅ Success |
| Declined | 4000 0000 0000 0002 | Any future | Any 3 | ❌ Fails |

### **How to Test:**
1. Click "Checkout" button
2. Razorpay modal opens
3. Enter test card: `4111 1111 1111 1111`
4. Enter any future date (e.g., 12/25)
5. Enter any 3 digits for CVV
6. Click "Pay"
7. Auto-confirms in test mode
8. ✅ Success message

---

## 📋 COMPLETE SETUP INSTRUCTIONS

### **Step 1: Create Razorpay Account (If Needed)**

```
1. Visit: https://razorpay.com
2. Click: "Sign Up" 
3. Fill: Email, password
4. Verify: Email verification link
5. Login: To dashboard
```

### **Step 2: Get API Keys**

```
1. Login: https://dashboard.razorpay.com
2. Go to: Settings (⚙️ icon)
3. Click: API Keys
4. Find: Test Mode Keys section
5. Copy: Key ID (starts with rzp_test_)
6. Copy: Key Secret
```

### **Step 3: Update Backend (.env)**

**File:** `server/.env`

```env
# Database
MONGODB_URI=mongodb://localhost:27017/pizza_delivery

# JWT
JWT_SECRET=pizza_hub_secret_key_2024_development_only
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# 💳 RAZORPAY (TEST MODE - For Demo)
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET

# For production later, switch to:
# RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
# RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

### **Step 4: Update Frontend (.env.local)**

**File:** `client/.env.local`

```env
# API Configuration
VITE_API_BASE=http://localhost:5000

# 💳 Razorpay Test Key
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
```

### **Step 5: Restart Services**

```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

### **Step 6: Test Payment**

```
1. Visit: http://localhost:5173
2. Login: admin@example.com / Admin@123
3. Go to: Pizza Builder
4. Click: Checkout
5. Fill: Address (if needed)
6. Click: Pay button
7. Use test card
8. Verify: Success message
```

---

## ⚙️ HOW IT WORKS - TECHNICAL DETAILS

### **Frontend Flow**

**File:** `client/src/pages/PizzaBuilder.jsx`

```javascript
// 1. User clicks "Checkout"
const handleCheckout = async () => {
  // 2. Get Razorpay key from env
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  
  // 3. Create order on backend
  const r = await createRazorpayOrder(token, { amount });
  
  // 4. Initialize Razorpay checkout
  const options = {
    key: razorpayKey,
    amount: order.amount,
    order_id: order.id,
    handler: function (response) {
      // 5. Verify payment
      // 6. Show success
    }
  };
  
  // 7. Open payment modal
  new window.Razorpay(options).open();
};
```

### **Backend Flow**

**File:** `server/controllers/paymentController.js`

```javascript
// 1. Create order endpoint
export const createRazorpayOrder = async (req, res, next) => {
  // Validate keys exist
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  
  // Create order in Razorpay
  const order = await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: 'INR'
  });
  
  return order; // Send to frontend
};

// 2. Verify payment endpoint
export const verifyRazorpayPayment = async (req, res, next) => {
  // Verify signature matches
  const generated_signature = crypto.createHmac('sha256', 
    process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  
  // Compare with received signature
  if (generated_signature === razorpay_signature) {
    // ✅ Payment verified
    return res.json({ success: true });
  }
  // ❌ Invalid signature
  return res.status(400).json({ success: false });
};
```

---

## 🔒 SECURITY NOTES

### **What's Safe to Share**
- ✅ Key ID: `rzp_test_1234567890` - Can be in frontend code
- ✅ Test credentials - Cannot charge real money

### **What's Secret**
- ❌ Key Secret: Keep in `server/.env` only
- ❌ Live keys: Never in code
- ❌ Never commit `.env` files

### **Best Practices**
1. Use test keys for development
2. Switch to live keys for production
3. Keep secrets in `.env` (not in code)
4. Use environment variables in production
5. Rotate keys periodically
6. Monitor for unauthorized usage

---

## ❌ TROUBLESHOOTING

### **Problem 1: "Razorpay keys not configured"**

**Error Message:**
```
Razorpay keys are not configured
```

**Solution:**
```bash
# Check server/.env has:
1. RAZORPAY_KEY_ID=rzp_test_xxxxx
2. RAZORPAY_KEY_SECRET=test_xxxxx

# If missing:
1. Open server/.env
2. Add the keys
3. Save file
4. Restart: npm run dev
```

### **Problem 2: "Cannot read property of undefined"**

**Error Message:**
```
TypeError: Cannot read property 'amount' of undefined
```

**Solution:**
```bash
# Check:
1. Backend keys are set
2. Frontend env has VITE_RAZORPAY_KEY_ID
3. Restart both servers
4. Check console (F12) for actual error
5. Check server logs
```

### **Problem 3: "Invalid Signature"**

**Error Message:**
```
Invalid signature
```

**Solution:**
```bash
# This means:
1. RAZORPAY_KEY_SECRET might be wrong
2. Payment data was tampered
3. Order ID doesn't match

# Fix:
1. Verify KEY_SECRET is correct
2. Check exact key from Razorpay dashboard
3. Copy without extra spaces
4. Restart server
```

### **Problem 4: "Payment modal doesn't open"**

**Error Message:**
```
Razorpay is not defined
```

**Solution:**
```bash
# Check:
1. VITE_RAZORPAY_KEY_ID in client/.env.local
2. No spaces in key
3. Check browser console (F12)
4. Razorpay script loads (Network tab)
5. restart: npm run dev
```

### **Problem 5: "Test mode, no real charges"**

**Question:** Will my card be charged?

**Answer:**
```
✅ NO - Test mode keys NEVER charge:
- No real transactions
- No money transfers
- No bank involvement
- Test data only
- Safe for testing

❌ YES - Live mode keys WILL charge:
- Real transactions
- Real money transfers
- From actual banks
- Use only for production
```

---

## 📊 RAZORPAY DASHBOARD FEATURES

Once you have account:

### **Test Dashboard**
- URL: https://dashboard.razorpay.com (Test Mode)
- See: All test transactions
- View: Orders created
- Check: Payment status
- Download: Receipts
- No real charges

### **Live Dashboard**
- URL: https://dashboard.razorpay.com (Live Mode - after KYC)
- See: All real transactions
- Manage: Real payments
- Settlement: Money to bank
- Reporting: For accounting

### **API Keys Page**
- Location: Settings → API Keys
- Test Mode: Always available
- Live Mode: After KYC approval
- Regenerate: Create new keys
- Rotate: For security

---

## 🎯 DEPLOYMENT STEPS

### **Step 1: Development**
```
1. Create Razorpay account
2. Get TEST keys
3. Add to development .env
4. Test with test cards
5. Verify flow works
```

### **Step 2: Staging**
```
1. Can use same test keys
2. Or get live keys after KYC
3. Deploy to staging server
4. Test with real (but capped) transactions
```

### **Step 3: Production**
```
1. Complete KYC with Razorpay
2. Get LIVE keys (rzp_live_xxxxx)
3. Add to production .env
4. Deploy to production
5. Real payments enabled
```

---

## ✅ VERIFICATION CHECKLIST

### Before Testing
- [ ] Razorpay account created?
- [ ] API keys copied?
- [ ] server/.env updated?
- [ ] client/.env.local updated?
- [ ] Servers restarted?
- [ ] No syntax errors in .env?

### During Testing
- [ ] Checkout button opens modal?
- [ ] Can enter test card?
- [ ] Payment processes?
- [ ] Success message shows?
- [ ] Order appears in database?

### After Payment
- [ ] Order in "My Orders"?
- [ ] Payment verified?
- [ ] No real money charged?
- [ ] Can see transaction in Razorpay?

---

## 🎯 DEMO FEATURES WORKING

✅ **User Registration & Login**  
✅ **Interactive Pizza Builder**  
✅ **Real-time Pricing**  
✅ **Order Placement** (two options):
  - Place Order button (works now, no payment)
  - Checkout with Payment (with Razorpay)
✅ **Order Tracking**  
✅ **Admin Dashboard**  
✅ **Payment Verification** (once keys added)  

---

## 📞 RAZORPAY SUPPORT

- **Website:** https://razorpay.com
- **Dashboard:** https://dashboard.razorpay.com
- **Docs:** https://razorpay.com/docs/
- **Support:** support@razorpay.com
- **Status:** https://razorpay.com/status

---

## 🎉 SUMMARY

Your app is **ready for Razorpay!**

**Status:**
- ✅ Backend configured
- ✅ Frontend ready
- ⏳ Just need API keys
- 🚀 Then payments work!

**Time to add payment:** ~5 minutes

---

## 📝 QUICK COPY-PASTE (.env Values)

### **For Testing (No Real Charges)**
```
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=test_secret_key_1234567890
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890
```

### **After Creating Account**
Replace with actual keys from your Razorpay dashboard Settings → API Keys