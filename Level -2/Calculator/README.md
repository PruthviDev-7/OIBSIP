# 🧮 Smart Calculator

A modern, feature-rich web calculator built with HTML, CSS, and JavaScript with a sleek dark theme interface.

## 📋 Overview

This is a fully functional calculator application that supports basic arithmetic operations with a clean, user-friendly interface. The calculator features a gradient background and smooth animations for an enhanced user experience.

## ✨ Features

- **Basic Operations**: Addition, Subtraction, Multiplication, and Division
- **Advanced Functions**: Percentage calculations and parentheses support
- **Clear Button**: Reset the calculator with the 'C' button
- **Decimal Support**: Perform calculations with decimal numbers
- **Error Handling**: Displays error message for invalid expressions
- **Responsive Design**: Dark theme with gradient background
- **Smooth Animations**: Hover effects and transitions on buttons
- **Real-time Display**: Shows input as you type

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with gradients, grid layouts, and animations
- **JavaScript (ES6+)**: Calculator logic and event handling
- **Google Fonts**: Poppins font family for modern typography

## 📁 File Structure

```
Calculator/
├── index.html      # Main HTML structure
├── style.css       # Styling and layout
├── app.js          # Calculator logic
└── README.md       # This file
```

## 🚀 How to Use

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Enter numbers** by clicking the number buttons (0-9)
4. **Select operations**: Use `+`, `−`, `×`, `÷` buttons
5. **Calculate result**: Press the `=` button
6. **Clear**: Press `C` to reset the display
7. **Additional features**:
   - Use `%` for percentage calculations
   - Use `()` for grouping operations
   - Use `.` for decimal numbers

## 💡 Code Highlights

### Calculator Logic (app.js)
- Uses the `eval()` function to evaluate mathematical expressions
- Replaces custom symbols (×, ÷, −) with JavaScript operators (*, /, -)
- Maintains `currentInput` state to track user input
- Handles result display and error states

### Styling Features (style.css)
- **Grid Layout**: 4-column grid for button arrangement
- **Color Scheme**: 
  - Primary buttons: Slate gray (#334155)
  - Operators: Orange (#fb923c)
  - Clear: Red (#ef4444)
  - Equals: Green (#22c55e)
- **Responsive**: Uses flexbox for centering and alignment
- **Visual Feedback**: Hover effects on all interactive elements

## 🎨 UI Components

- **Display**: Read-only input field showing calculations
- **Number Buttons**: 0-9 with standard layout
- **Operation Buttons**: +, −, ×, ÷ in orange
- **Special Buttons**: 
  - C (Clear) in red
  - = (Equals) in green, spans 2 columns
  - % (Percentage)
  - () (Parentheses)

## 🔧 Customization

### Change Color Scheme
Edit the CSS variables in `style.css`:
```css
.btn.operator {
  background: #fb923c;  /* Change operator color */
}
```

### Modify Button Layout
Adjust the grid in `style.css`:
```css
.buttons {
  grid-template-columns: repeat(4, 1fr);  /* Change number of columns */
}
```

## ⚠️ Known Limitations

- Uses `eval()` for expression evaluation (not ideal for security in production)
- Doesn't persist calculation history
- Limited to basic mathematical operations

## 🐛 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Partial (some CSS features may not work)

## 📝 Future Enhancements

- [ ] Add calculation history
- [ ] Keyboard support (0-9, +, -, *, /, Enter, Backspace)
- [ ] More advanced functions (sin, cos, sqrt, etc.)
- [ ] Dark/Light mode toggle
- [ ] Scientific calculator mode
- [ ] Export calculation history

## 👨‍💻 Author

Part of the OASIS INFOBYTE Level -2 Projects

## 📄 License

Free to use and modify for personal or educational purposes.

---

**Happy Calculating!** 🎉
