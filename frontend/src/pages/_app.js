import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/common/Navbar";
import { GlobalStyle } from "../styles/GlobalStyle";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default MyApp;
