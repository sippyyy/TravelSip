/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue: '#4267b2',
        red: '#eb6A58',
        green: '#339282',
        white: '#fbfbfb',
        lightWhite: '#fff',
        lightBlue: '#6885c1',
        lightRed: '#eb9c98',
        lightGreen: '#73ada1',
        black: '#121212',
        dark: '#3D3A45',
        gray: '#8c8896',
        lightGrey: '#d1cfd5',
      },
      fontSize:{
        xxSmall: '11px',
        xSmall: '13px',
        small: '15px',
        medium: '17px',
        large: '21px',
        xLarge: '27px',
        xxLarge: '32px',
      },
      space:{
        xSmall: '10px',
        small: '12px',
        medium: '16px',
        large: '20px',
        xLarge: '24px',
        xxLarge: '44px',
      },
      padding:{
        "2":"2px",
        "4":"4px",
        "8":"8px",
        "12":"12px",
        "16":"16px",
        "20":"20px"
      },
      fontWeight:{
        light: 300,
        regular:400,
        medium:500,
        bold:700,
        xBold:1000
      }
    },
  },
  plugins: [],
}