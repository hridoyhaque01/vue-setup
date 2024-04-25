/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",

        "green-main": "#1EC96B",
        disabled: "#D0D0D0",
        // main
        mainColor100: "#EFFEFD",
        mainColor500: "#03BBBE",
        mainColor400: "#1CE5E5",
        mainColor700: "#047B81",
        mainColor900: "#0D5054",
        mainColor: "#234B4C",
        // secondary
        secondaryColor500: "#03BBBE",
        secondaryColor400: "#D2875E",

        // grey veriants
        'grey-300': '#828282',


        // info

        info: "#54A0FF",

        error: "#FF6B6B",

        // white
        whiteHigh: "#FFFFFF",
        whiteLow: "#f6f6f6",
        whiteMid: "#F1F1F1",
        "white-300": "#D1D1D1",

        // green veriants
        "green-main": "#1EC96B",

        // black

        black900: "#212121",
        black800: "#121217",
        black700: "#616161",
        black600: "#757575",
        'black-900': '#212121',

        //neutral
        neutral100: "#F5F5F5",
        neutral200: "#EEE",
        neutral300: "#E0E0E0",
        neutral400: "#BDBDBD",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
