import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#FFFFFF',
              fontSize: '2rem',
            }
          },
        },
      },
    },
    colors: {
      'text': '#0e130f',
      'background': '#133020',
      'primary': '#327039',
      'secondary': '#F8EDD9',
      'accent': '#F0BE49',
      'accent2': 'DD5C36'
    },
  },
  plugins: [],
};
export default config;
