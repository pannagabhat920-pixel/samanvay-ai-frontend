/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        background: "#080a0c",
        surface: "#0d1114",
        surface2: "#13191d",
        surface3: "#1b2429",
        border: "#253036",
        "border-strong": "#3a4850",
        text: {
          primary: "#f2f5f4",
          secondary: "#a5b0b2",
          muted: "#6b797e",
        },
        accent: {
          DEFAULT: "#d94b50",
          strong: "#f06a6e",
          soft: "#3a2024",
        },
        status: {
          emergency: "#e15d63",
          warning: "#d8a04b",
          safe: "#68bb8c",
          info: "#89abb8",
          muted: "#718086",
        },
        dept: {
          engineering: "#86aeba",
          st: "#d7a45d",
          trd: "#71b68d",
        },
      },
      borderRadius: {
        xl: "1rem",
        lg: "0.75rem",
        md: "0.625rem",
        sm: "0.45rem",
      },
      boxShadow: {
        panel: "0 22px 70px rgba(0, 0, 0, 0.22)",
        rail: "0 0 0 1px rgba(217, 75, 80, 0.08), 0 24px 90px rgba(0, 0, 0, 0.28)",
        glow: "0 0 0 1px rgba(217, 75, 80, 0.18), 0 0 44px rgba(217, 75, 80, 0.12)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.035)",
      },
      fontFamily: {
        sans: ["DM Sans", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.055em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.38" },
          "50%": { opacity: "1" },
        },
        "rail-scan": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(520%)" },
        },
        "signal-dash": {
          "0%": { strokeDashoffset: "28" },
          "100%": { strokeDashoffset: "0" },
        },
        "signal-blink": {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        "sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 720ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "soft-pulse": "soft-pulse 2.8s ease-in-out infinite",
        "rail-scan": "rail-scan 5.5s linear infinite",
        "signal-dash": "signal-dash 2.8s linear infinite",
        "signal-blink": "signal-blink 2.8s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        sweep: "sweep 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
