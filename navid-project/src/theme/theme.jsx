import { createTheme } from '@mui/material/styles';
import Overrides from './overrides/index';

const theme = createTheme({
    components: Overrides(),
    direction: 'rtl',
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
            xxxl: 1920,
        },
    },
    palette: {
        primary: {
            main: '#2f5358',
        },
        secondary: {
            main: '#ff6262',
        },
        customGreen: {
            main: '#38c813',
        },
        customPink: {
            main: '#ff19b7',
        },
        customBlue: {
            main: '#0070ff',
        },
    },
});

export default theme;
