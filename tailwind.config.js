/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        transparent: 'transparent',
        "green-main": "#1EC96B",
        "black-900": "#212121",
        disable: "#D0D0D0",
      },
      backgroundImage: {
        authBg: "url('../images/authbg.png')",
        mainGradient: "linear-gradient(267deg, #1BB287 0%, #1EC96B 80.45%)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
