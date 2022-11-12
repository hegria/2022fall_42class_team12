import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "components/common/Navbar";
import { GlobalStyle } from "styles/GlobalStyle";
import { theme } from "styles/theme";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </CookiesProvider>
  );
}

export default MyApp;
