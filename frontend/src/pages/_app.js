import { ChakraProvider } from "@chakra-ui/react";
import { GlobalStyle } from "../styles/GlobalStyle";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
