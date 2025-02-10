import Overrides from "@/theme/overrides";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: Overrides().components,

  direction: "rtl",
  breakpoints: {
    values: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: "#124E66",
      dark: "#212A31",
      light: "#748D92",
      contrastText: "#2E3944",
    },
    secondary: {
      main: "#4C4E64",
    },
  },
});

export default theme;
