import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries";

import { darkTheme, lightTheme } from "../themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
        <UIProvider> {/*Se hace wrap a toda la app con el UIProvider */}
          <ThemeProvider theme={darkTheme}> {/*Wrap el componente con el tema*/}
            <CssBaseline /> {/*Para que tomen efecto los cambios del theme*/}
            <Component {...pageProps} />
          </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}

export default MyApp;
