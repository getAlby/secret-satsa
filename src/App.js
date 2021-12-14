import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./components/Header";
import Tweets from "./components/Tweets";


const theme = createTheme({
  palette: {
    background: {
      default: "rgb(225, 31, 35)",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Tweets />
    </ThemeProvider>
  );
}

export default App;
