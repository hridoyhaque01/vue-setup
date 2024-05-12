/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",

        "green-main": "#1EC96B",
        disabled: "#D0D0D0",
        disable: "#D0D0D0",
        white: "#fff",
        "white-200": "#E8E8E8",
        "black-600": "#808080",
        "black-700": "#474747",
        "black-800": "#1A1C21",
        "black-900": "#212121",
        "black-200": "#33363F",
        "black-100": "#333333",
        "black-60": "rgba(0, 0, 0, 0.60)",

        "grey-100": "#9E9E9E",
        "grey-200": "#4F4F4F",
        "grey-300": "#828282",
        "grey-400": "#BDBDBD",
        "grey-500": "#EDEDED",
        "gray-70": "#E0E0E0 ",
        "gray-60": "#6B6B6B",
        "grey-30": "#D6D6D6",
        "grey-20": "#BFBFBF",
        "grey-light": "#AAA",

        // main
        mainColor100: "#EFFEFD",
        mainColor500: "#03BBBE",
        mainColor400: "#1CE5E5",
        mainColor700: "#047B81",
        mainColor900: "#0D5054",
        mainColor: "#234B4C",
        "main-white": "#F0FDF5",
        "green-700": "#128345 ",
        // secondary
        secondaryColor500: "#03BBBE",
        secondaryColor400: "#D2875E",

        // grey veriants
        "grey-300": "#828282",

        // info

        info: "#54A0FF",

        error: "#FF6B6B",
        "error-2": "#FFE9E9",

        warning: "#FFF6E3",
        "warning-20": "#FFF0E1",

        // white
        whiteHigh: "#FFFFFF",
        whiteLow: "#f6f6f6",
        whiteMid: "#F1F1F1",
        "white-300": "#D1D1D1",
        "white-100": "#F5F5F5",

        // green veriants
        "green-main": "#1EC96B",

        // black

        black900: "#212121",
        black800: "#121217",
        black700: "#616161",
        black600: "#757575",
        "black-900": "#212121",

        //neutral
        neutral100: "#F5F5F5",
        neutral200: "#EEE",
        neutral300: "#E0E0E0",
        neutral400: "#BDBDBD",
        "neutral-20": "#eee",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        pricingCard: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)",
        darkBtn: " 0px 4px 8px 0px rgba(158, 158, 158, 0.16)",
        nav: "0px 8px 24px 0px rgba(0, 0, 0, 0.08)",
        btn: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
        messageBox: "0px 1.5px 2px 0px rgba(16, 24, 40, 0.10)",
        btnShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.16)",
        btnGreenShadow: "0px 4px 8px 0px rgba(30, 201, 107, 0.16)",
        barShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.16) inset",
        shadowSelect: "0px 2px 2px 0px rgba(0, 0, 0, 0.10)",
        input: "0px 1px 4px 0px rgba(0, 0, 0, 0.06)",
        progressBarShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.15)",
        analyticsBoxShadow: "0px 4px 34px 0px rgba(0, 0, 0, 0.08)",
        card: "0px 4px 28px 0px rgba(0, 0, 0, 0.08)",
        cardBtn: "0px 4px 10px 0px rgba(155, 155, 155, 0.12)",
      },
      backgroundImage: {
        mainGradient: "linear-gradient(267deg, #1BB287 0%, #1EC96B 80.45%)",
        gradientGreen: "linear-gradient(1deg, #1BB287 64.78%, #1EC96B 99.6%)",
        gradientYellow: "linear-gradient(90deg, #FF647C 4.76%, #F3C84D 92.38%)",
        gradientWarning:
          "linear-gradient(229deg, #F2C86B 6.19%, #F2C94C 94.94%)",
        bannerBg: "linear-gradient(262deg, #D282F0 11.3%, #4C8DF1 100.06%)",
        authBg: "url('../images/authentication/authbg.png')",
        vacationBg: "linear-gradient(269deg, #F6DD91 4.52%, #F2C963 97.75%)",
        progressGradient:
          "linear-gradient(267deg, #1BB287 57.81%, #1EC96B 80.45%)",
        serviceNameGradient:
          "linear-gradient(267deg, #1BB287 57.81%, #1EC96B 80.45%)",
        ornament: "url('@/assets/images/dashboard/ornament.png')",
        thumb: "url('@/assets/images/home/categoryThumb.png')",
        attachMoney: "url('@/assets/images/dashboard/attachMoney.png')",
        bannerGreen:
          "radial-gradient(292.64% 120.45% at -1.53% 102.16%, #1EC96B 0%, #94C5FF 100%)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
