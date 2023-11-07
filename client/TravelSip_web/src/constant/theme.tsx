import {
  createTheme,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';

// Augment the palette to include a violet color
declare module '@mui/material/styles' {
  interface Palette {
    blue: Palette['primary'];
    red: Palette['primary'];  
    green: Palette['primary'];
    white: Palette['primary'];  
    orange: Palette['primary']; 
    black: Palette['primary'];  
    dark: Palette['primary'];  
    gray: Palette['primary'];  
    yellow: Palette['primary'];
  }

  interface PaletteOptions {
    blue: PaletteOptions['primary'];
    red: PaletteOptions['primary'];
    green: PaletteOptions['primary'];
    white: PaletteOptions['primary'];
    orange: PaletteOptions['primary'];
    black: PaletteOptions['primary'];
    dark: PaletteOptions['primary'];
    gray: PaletteOptions['primary'];
    yellow: PaletteOptions['primary'];
  }
  
}

// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blue: true,
    red: true,
    green: true,
    white: true,
    orange: true,
    black: true,
    dark: true,
    gray: true,
    yellow: true,
  }
}

const blueBase = '#4267b2';
const redBase = '#eb6A58';
const greenBase = '#339282';
const whiteBase = '#fbfbfb';
const orangeBase = '#ffe7c8';
const blackBase = '#121212';
const darkBase = '#3D3A45';
const grayBase = '#8c8896';
const yellowBase = '#f5d837';

const blueMain = alpha(blueBase, 1);
const redMain = alpha(redBase, 1);
const greenMain = alpha(greenBase, 1);
const whiteMain = alpha(whiteBase, 1);
const orangeMain = alpha(orangeBase, 1);
const blackMain = alpha(blackBase, 1);
const darkMain = alpha(darkBase, 1);
const grayMain = alpha(grayBase, 1);
const yellowMain = alpha(yellowBase, 1);


export const theme = createTheme({
  palette: {
    blue: {
      main: blueMain,
      light: alpha(blueBase, 0.5),
      dark: alpha(blueBase, 0.9),
      contrastText: getContrastRatio(blueMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    red: {
      main: redMain,
      light: alpha(redBase, 0.5),
      dark: alpha(redBase, 0.9),
      contrastText: getContrastRatio(redMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    green: {
      main: greenMain,
      light: alpha(greenBase, 0.5),
      dark: alpha(greenBase, 0.9),
      contrastText: getContrastRatio(greenMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    white: {
      main: whiteMain,
      light: alpha(whiteBase, 0.5),
      dark: alpha(whiteBase, 0.9),
      contrastText: getContrastRatio(whiteMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    orange: {
      main: orangeMain,
      light: alpha(orangeBase, 0.5),
      dark: alpha(orangeBase, 0.9),
      contrastText: getContrastRatio(orangeMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    black: {
      main: blackMain,
      light: alpha(blackBase, 0.5),
      dark: alpha(blackBase, 0.9),
      contrastText: getContrastRatio(blackMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    dark: {
      main: darkMain,
      light: alpha(darkBase, 0.5),
      dark: alpha(darkBase, 0.9),
      contrastText: getContrastRatio(darkMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    gray: {
      main: grayMain,
      light: alpha(grayBase, 0.5),
      dark: alpha(grayBase, 0.9),
      contrastText: getContrastRatio(grayMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    yellow: {
      main: yellowMain,
      light: alpha(yellowBase, 0.5),
      dark: alpha(yellowBase, 0.9),
      contrastText: getContrastRatio(yellowMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});
