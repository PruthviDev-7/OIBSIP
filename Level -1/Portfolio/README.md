# 👨‍💻 Pruthviraj - Full Stack Developer Portfolio

A clean, professional personal portfolio website showcasing a Full Stack Developer's projects, skills, and contact information. Built with **HTML5** and **CSS3** with a modern, minimalist design.

---

## 📋 Project Overview

This is a **personal portfolio website** for Pruthviraj, a Full Stack Developer passionate about building responsive web applications. The portfolio highlights key projects, professional information, and provides easy contact methods.

### Key Features:
- 👤 Professional profile section
- 📸 Profile picture display
- 🎯 Project showcase
- 📞 Contact information (Email, Phone, Location)
- 🎨 Clean, modern UI design
- 📱 Fully responsive layout
- ✨ Smooth transitions and hover effects

---

## 🎯 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── README.md           # Project documentation
└── Img/                # Images folder
    └── Pruthi.jpg.JPEG # Profile picture
```

---

## 🖼️ Demo Screenshots

### Profile Section
![Profile Picture](./Img/Pruthi.jpg.JPEG)
*Professional profile photo*

### Portfolio Preview
- **Header**: Profile image, name, and professional bio
- **Projects Section**: Showcase of completed projects
- **Contact Section**: Email, phone, and location
- **Footer**: Copyright and credits

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup and content structure |
| **CSS3** | Modern styling and responsive design |
| **Flexbox** | Layout and alignment |
| **Responsive Design** | Mobile-first approach |
| **Google Fonts** | Typography (Poppins font family) |

---

## 📦 Installation & Setup

1. **Clone or download** the project folder:
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Add profile picture** to the `Img/` folder:
   - Replace `Pruthi.jpg.JPEG` with your profile image
   - Recommended: Square format (500x500px minimum)
   - Supported formats: JPG, PNG, JPEG

3. **Open in browser**:
   ```bash
   # Simply open index.html in your web browser
   double-click index.html
   ```

---

## 📝 Content Overview

### Header Section
- **Profile Image**: Circular profile picture
- **Name**: Pruthviraj
- **Title/Bio**: "I'm a Full Stack Developer passionate about building responsive web applications."

### Projects Section
Lists completed projects:
1. Password Generator Project
2. Portfolio Website
3. Todo List App

### Contact Section
- **Email**: [Email link]
- **Phone**: +91 contact number
- **Location**: India

### Footer
- Copyright notice
- Built with HTML & CSS credit

---

## 🎨 Design Features

### Color Scheme
- **Background**: Light gray (#f5f6fa)
- **Card Background**: White (#fff)
- **Text**: Dark gray (#333, #555)
- **Accent Color**: Blue (#007bff)
- **Hover Effect**: Light blue (#cde1ff)

### Typography
- **Font Family**: Poppins, sans-serif
- **Main Heading**: 1.8rem
- **Section Titles**: Blue color (#007bff)
- **Descriptive Text**: Light gray (#555)

### Layout Components

#### Container
- Max-width: 700px
- 90% width on mobile
- Centered layout
- White background with shadow
- Border-radius: 20px

#### Profile Image
- Size: 120x120px
- Circular shape (border-radius: 50%)
- Object-fit: cover (maintains aspect ratio)

#### Projects Section
- Background: Light blue (#e8f0fe)
- Rounded corners: 10px
- Hover effect: Darker blue (#cde1ff)
- List styling: Custom styling

#### Contact Section
- Email, phone, and location info
- Links styled in blue
- Emoji icons for visual interest

---

## 🎯 Customization Guide

### Update Profile Information

Edit `index.html` to modify:

#### Change Profile Picture
```html
<img src="/Img/YOUR_IMAGE.jpg" alt="Profile Picture" class="profile-img" />
```

#### Update Name
```html
<h1>Hello, I'm Your Name</h1>
```

#### Update Bio
```html
<p>I'm a [Your Title] passionate about [Your Passion].</p>
```

#### Update Projects
```html
<ul>
  <li>Your Project 1</li>
  <li>Your Project 2</li>
  <li>Your Project 3</li>
</ul>
```

#### Update Contact Details
```html
<p>📧 Email: <a href="mailto:your-email@gmail.com">your-email@gmail.com</a></p>
<p>📱 Phone: +91 XXXXXXXXXX</p>
<p>📍 Location: Your City, Country</p>
```

### Modify Styling

Edit `style.css` to customize colors:

```css
/* Accent color */
section h2 {
  color: #007bff;  /* Change to your preferred color */
}

/* Hover effect color */
.projects li:hover {
  background: #cde1ff;  /* Change hover background */
}

/* Container shadow and styling */
.container {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);  /* Adjust shadow */
}
```

---

## 📱 Responsive Design

The portfolio is fully responsive across all devices:

| Device | Breakpoint | Features |
|--------|-----------|----------|
| Mobile | < 600px | Single column, optimized padding |
| Tablet | 600px - 1024px | 90% width, moderate padding |
| Desktop | > 1024px | Full width (max 700px), comfortable spacing |

---

## 🔗 Links & Navigation

### Email Link
```html
<a href="mailto:your-email@gmail.com">your-email@gmail.com</a>
```

### Add Social Media Links
You can extend the contact section to include:
- GitHub
- LinkedIn
- Twitter
- Portfolio website

Example:
```html
<p>🔗 GitHub: <a href="https://github.com/yourprofile" target="_blank">Your GitHub</a></p>
```

---

## 🎬 Interactive Elements

### Project Hover Effect
```css
.projects li:hover {
  background: #cde1ff;  /* Hover state */
  transition: 0.3s;      /* Smooth transition */
}
```

### Link Styling
```css
.contact a {
  color: #007bff;        /* Link color */
  text-decoration: none; /* Remove underline */
}

.contact a:hover {
  text-decoration: underline;  /* Show underline on hover */
}
```

---

## ✅ Checklist Before Publishing

- [ ] Update profile picture
- [ ] Edit name and bio
- [ ] Update project list with real projects
- [ ] Verify email address and phone number
- [ ] Update location information
- [ ] Test email link functionality
- [ ] Check responsiveness on mobile
- [ ] Verify image aspect ratio and quality
- [ ] Add social media links
- [ ] Consider adding GitHub/LinkedIn links

---

## 🚀 Future Enhancements

- [ ] Add dark mode toggle
- [ ] Create individual project pages
- [ ] Add project images/screenshots
- [ ] Include skills section
- [ ] Add experience/education timeline
- [ ] Integrate contact form (with backend)
- [ ] Add animations and transitions
- [ ] Include testimonials section
- [ ] Add blog section
- [ ] Deploy to hosting platform

---

## 📊 Project Showcase Ideas

Consider expanding the projects section with:
- Project descriptions
- Technologies used
- Live demo links
- GitHub repository links
- Project images/screenshots

Example enhancement:
```html
<div class="project-item">
  <h3>Project Name</h3>
  <p>Brief description of the project</p>
  <p>Tech: HTML, CSS, JavaScript</p>
  <a href="#">View Project</a>
</div>
```

---

## 🔒 Privacy Considerations

- [ ] Obfuscate or update real contact information
- [ ] Use professional email address
- [ ] Consider privacy for personal details
- [ ] Review content before publishing

---

## 📧 Contact & Support

For portfolio updates or professional inquiries, use the contact information provided on the website.

---

## 📄 License

This portfolio project is created as part of the **OASIS INFOBYTE** training program.

---

**Last Updated**: October 2025  
**Status**: ✅ Active  
**Author**: Pruthviraj
