/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#4267b2",
        red: "#eb6A58",
        green: "#339282",
        white: "#fbfbfb",
        lightWhite: "#fff",
        lightBlue: "#6885c1",
        lightRed: "#eb9c98",
        orange: "#ffe7c8",
        lightGreen: "#73ada1",
        black: "#121212",
        dark: "#3D3A45",
        gray: "#8c8896",
        lightGrey: "#d1cfd5",
        yellow: "#f5d837",
      },
      fontSize: {
        xxSmall: "11px",
        xSmall: "13px",
        small: "15px",
        medium: "17px",
        large: "21px",
        xLarge: "27px",
        xxLarge: "32px",
        "3xLarge": "46px",
      },
      space: {
        xSmall: "10px",
        small: "12px",
        medium: "16px",
        large: "20px",
        xLarge: "24px",
        xxLarge: "44px",
      },
      padding: {
        2: "2px",
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
      },
      margin: {
        2: "2px",
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        40: "40px",
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
        xBold: 1000,
      },
      height: {
        wallBig: "600px",
        wallSmall: "400px",
      },
      screens: {
        none: "100%",
        xsm: "368px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1025px",
        "2xl": "1201px",
      },
      boxShadow: {
        "3xl": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        "4xl":
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;",
      },
    },
  },
  plugins: [],
};
