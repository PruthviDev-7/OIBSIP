Postman testing for Pizza Delivery API

1) Import collection and environment
- Import `postman_collection.json` as a collection
- Import `postman_environment.json` as an environment

2) Select the environment in Postman
- Choose `Pizza Delivery Environment` from the top-right environment selector

3) Run requests in order
- Health Check
- Auth - Login (this will set `token` and `userId` environment variables)
- Create Pizza Base (uses `{{token}}`)
- Create Sauce
- Create Cheese
- Place Order (uses saved ids)
- Get Orders
- Update Order Status

4) Tips
- If a request fails with 401, re-run the Login step and ensure `token` was set by Postman test script
- For email notifications and payments, make sure `.env` includes working EMAIL_* and RAZORPAY_* values

5) Troubleshooting
- Server must be running: `cd server && npm run dev`
- If using MongoDB Atlas, update `MONGODB_URI` in `.env`
- If low-stock emails fail, check SMTP settings and consider using Mailtrap for testing

6) Automating with Newman
- Install newman globally: `npm i -g newman`
- Run collection: `newman run postman_collection.json -e postman_environment.json`

7) Notes
- The admin seeded account is `admin@example.com` / `Admin@123` by default (change via `.env` SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD or re-seed)
- The collection uses environment variables; you can edit them to match your settings
