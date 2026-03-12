import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFAF5",
          100: "#F7F0E0",
          200: "#EDE2C8",
        },
        stone: {
          200: "#E4D9C8",
          300: "#CCC0AD",
          400: "#B0A090",
          500: "#8B7A68",
          600: "#6B5C4C",
          700: "#4D4035",
          800: "#352C22",
          900: "#1C1610",
        },
        sage: {
          300: "#AFCAAF",
          400: "#8DAD8D",
          500: "#6A9070",
          600: "#4D7352",
          700: "#365A3B",
        },
        amber: {
          300: "#DFAD6B",
          400: "#C9923A",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "1.4" }],
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.55" }],
        xl: ["20px", { lineHeight: "1.45" }],
        "2xl": ["24px", { lineHeight: "1.35" }],
        "3xl": ["30px", { lineHeight: "1.25" }],
        "4xl": ["36px", { lineHeight: "1.15" }],
        "5xl": ["48px", { lineHeight: "1.1" }],
        "6xl": ["60px", { lineHeight: "1.08" }],
        "7xl": ["72px", { lineHeight: "1.05" }],
        "8xl": ["96px", { lineHeight: "1.0" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
        xl: "32px",
        "2xl": "44px",
      },
      boxShadow: {
        xs: "0 1px 3px rgba(28, 22, 16, 0.06)",
        sm: "0 2px 8px rgba(28, 22, 16, 0.08)",
        md: "0 6px 20px rgba(28, 22, 16, 0.10)",
        lg: "0 16px 40px rgba(28, 22, 16, 0.12)",
        xl: "0 30px 60px rgba(28, 22, 16, 0.14)",
        card: "0 4px 24px rgba(28, 22, 16, 0.08)",
        "card-hover": "0 20px 48px rgba(28, 22, 16, 0.14)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-smooth": "cubic-bezier(0.37, 0, 0.63, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s infinite linear",
        float: "float 4s ease-in-out infinite",
      },
      backgroundImage: {
        "cream-gradient": "linear-gradient(160deg, #FDFAF5 0%, #F0E8D8 100%)",
        "sage-gradient": "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)",
        "warm-gradient": "linear-gradient(135deg, #DFAD6B 0%, #C9923A 100%)",
        "hero-radial": "radial-gradient(ellipse at 60% 40%, rgba(173, 200, 173, 0.15) 0%, rgba(253, 250, 245, 0) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
