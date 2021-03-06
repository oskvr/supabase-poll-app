import type { AppProps } from "next/app";
import {
  ChakraProvider,
  extendTheme,
  theme as defaultTheme,
} from "@chakra-ui/react";
import "focus-visible";
import DarkModeButton from "@/components/DarkModeButton";
import Navbar from "@/components/Navbar";

const theme = extendTheme({
  colors: {
    primary: defaultTheme.colors.blue,
    secondary: defaultTheme.colors.purple,
    success: defaultTheme.colors.green,
    danger: defaultTheme.colors.red,
    warning: defaultTheme.colors.yellow,
    info: defaultTheme.colors.cyan,
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <DarkModeButton />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
