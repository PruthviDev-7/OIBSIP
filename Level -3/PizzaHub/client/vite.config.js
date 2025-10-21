// Vite Configuration - Build tool settings for the React frontend
// Vite is a fast build tool that helps develop and build React apps

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // For CSS styling
import react from "@vitejs/plugin-react"; // For React support

// Configure Vite with plugins
export default defineConfig({
  plugins: [
    react(), // Enables React development features
    tailwindcss() // Enables Tailwind CSS for styling
  ],
});
