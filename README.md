# 🌐 My Portfolio

A modern, responsive, and animated personal portfolio website built with **React**, **Vite**, and **Tailwind CSS**.  
The site showcases projects, skills, and contact details with smooth animations and a dynamic background.

---

## ✨ Features

- ⚡ **Fast & Responsive UI** – optimized for mobile and desktop  
- 🎨 **Modern design** – glassmorphism, smooth transitions, and animated SVG blob backgrounds  
- 🌀 **Framer Motion animations** – smooth reveal and scroll effects  
- 🌗 **Dark/Light theme toggle**  
- 📩 **Contact form with EmailJS** – send real emails directly from the site  
- 📊 **Dynamic sections** – skills, projects, and about me  
- 🧩 **Reusable components** – clean modular structure for scalability  

---

## 🛠️ Tech Stack

- [React.js](https://reactjs.org/) – component-based UI  
- [Vite](https://vitejs.dev/) – fast build tool and dev server  
- [Tailwind CSS](https://tailwindcss.com/) – utility-first styling  
- [Framer Motion](https://www.framer.com/motion/) – smooth animations  
- [EmailJS](https://www.emailjs.com/) – email integration  
- [Lucide React](https://lucide.dev/) – modern icons  

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/my-portfolio.git
cd my-portfolio
```
### 2. Install Dependencies
```bash
npm install
```
### 3.Set up environment variables
Create a .env file in the root directory and add your EmailJS credentials:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### ⚡ Performance Notes

The project includes animations (Framer Motion + animated SVG backgrounds) which can impact initial load.
Some optimizations to improve performance:

✅ Code-splitting & lazy loading for heavy components (animated background, particles, etc.)

✅ Skeleton loading placeholders for smoother UX

✅ Image optimization (use WebP/AVIF & lazy-loading)

✅ Preload critical fonts & hero images

✅ Respect prefers-reduced-motion for accessibility

✅ Bundle analysis via rollup-plugin-visualizer

