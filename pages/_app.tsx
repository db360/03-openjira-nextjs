import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../themes";
import { UIProvider } from "../context/ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider> {/*Se hace wrap a toda la app con el UIProvider */}
      <ThemeProvider theme={darkTheme}> {/*Wrap el componente con el tema*/}
        <CssBaseline /> {/*Para que tomen efecto los cambios del theme*/}
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  );
}

export default MyApp;
