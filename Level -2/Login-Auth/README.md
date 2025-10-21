# 🔐 Login Authentication System

A simple yet functional user authentication system with register and login capabilities using HTML, CSS, and JavaScript with localStorage for data persistence.

## 📋 Overview

This is a dual-mode authentication application that allows users to register new accounts and log in with their credentials. The application uses browser localStorage to securely store user data locally and provides a welcome page after successful authentication.

## ✨ Features

- **Register Mode**: Create new user accounts with username and password
- **Login Mode**: Authenticate with existing credentials
- **Mode Switching**: Toggle between Register and Login modes
- **Data Persistence**: User credentials stored in localStorage
- **Secure Page**: Welcome page after successful authentication
- **Form Validation**: Checks for empty fields before submission
- **Logout Functionality**: Clear session and return to login page
- **Responsive Design**: Modern gradient interface with smooth transitions

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and form elements
- **CSS3**: Gradient backgrounds, flexbox, and responsive design
- **JavaScript (ES6+)**: Authentication logic and DOM manipulation
- **localStorage API**: Client-side data persistence

## 📁 File Structure

```
Login-Auth/
├── index.html      # Main HTML with form and login UI
├── style.css       # Styling and layout
├── app.js          # Authentication logic
└── README.md       # This file
```

## 🚀 How to Use

### Getting Started
1. **Open** `index.html` in your web browser
2. You'll see the **Register** mode by default

### Registration (First Time)
1. Enter a **username** in the username field
2. Enter a **password** in the password field
3. Click **Register** button
4. Success message will appear
5. Interface automatically switches to **Login** mode

### Login
1. Enter your **registered username**
2. Enter your **registered password**
3. Click **Login** button
4. On success, you'll see the **Welcome Page** with your username
5. Click **Logout** to return to the login page

### Switching Modes
- Click **"Switch to Login"** button when in Register mode
- Click **"Switch to Register"** button when in Login mode

## 💡 How It Works

### Data Storage (localStorage)
```javascript
// Registration - stores credentials
localStorage.setItem("username", username);
localStorage.setItem("password", password);

// Login - retrieves and validates
const storedUser = localStorage.getItem("username");
const storedPass = localStorage.getItem("password");
```

### Authentication Flow
1. User submits form in either Register or Login mode
2. System validates input fields are not empty
3. **Register Mode**: Stores credentials and switches to login
4. **Login Mode**: Compares input with stored credentials
5. On success: Displays welcome page with username
6. On failure: Shows error alert

### Mode Switching
- `isLogin` boolean flag tracks current mode
- Updates UI elements (title, button text) accordingly
- Username field hidden in Login mode (optional)

## 🎨 UI Components

### Register Form
```
┌─────────────────────────┐
│      Register           │
│  ┌─────────────────┐   │
│  │ Username        │   │
│  ├─────────────────┤   │
│  │ Password        │   │
│  ├─────────────────┤   │
│  │   Register      │   │
│  │ Switch to Login │   │
│  └─────────────────┘   │
└─────────────────────────┘
```

### Welcome Page (After Login)
```
Welcome, [Username] 🎉
        Logout
```

## 🔧 Customization

### Change Color Scheme
Edit CSS in `style.css`:
```css
body {
  background: linear-gradient(135deg, #667eea, #764ba2);  /* Change gradient */
}

button {
  background: #764ba2;  /* Change button color */
}
```

### Modify Form Fields
Add additional fields in `index.html`:
```html
<div class="input-field">
  <input type="email" id="email" placeholder="Email" required>
</div>
```

### Add Form Styling
Update validation in `app.js` for new fields

## ⚠️ Important Security Notes

⚠️ **This application is for educational purposes only!**

**Security Concerns:**
- Passwords stored in **plain text** in localStorage (never do this in production!)
- No encryption of stored data
- localStorage is accessible to JavaScript (XSS vulnerability)
- No server-side validation or authentication

**For Production, Use:**
- HTTPS protocol
- Secure server-side authentication
- Password hashing (bcrypt, argon2)
- JWT tokens or sessions
- CSRF protection
- Rate limiting

## 🐛 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Partial (localStorage supported, some CSS features may not work)

## 📝 Example Workflow

```
1. First Visit:
   - Register mode visible
   - Enter: username="john", password="pass123"
   - Click Register
   
2. Automatic Switch:
   - "Registration successful!" alert
   - Switches to Login mode
   
3. Login:
   - Username: john
   - Password: pass123
   - Click Login
   
4. Success:
   - Welcome page shows: "Welcome, john 🎉"
   
5. Logout:
   - Back to login form
```

## 🔄 Clearing Data

To reset and remove stored credentials:
1. Open Browser DevTools (F12)
2. Go to **Application** → **Local Storage**
3. Delete entries for `username` and `password`
4. Page will reset to register mode

Or in JavaScript console:
```javascript
localStorage.removeItem("username");
localStorage.removeItem("password");
location.reload();
```

## 📝 Future Enhancements

- [ ] Email verification
- [ ] Password strength checker
- [ ] Forgot password functionality
- [ ] Multiple user support
- [ ] User profile management
- [ ] Session timeout
- [ ] Two-factor authentication
- [ ] Password reset via email

## 👨‍💻 Author

Part of the OASIS INFOBYTE Level -2 Projects

## 📄 License

Free to use and modify for educational purposes.

---

**Note**: For production applications, integrate with a backend authentication service!
