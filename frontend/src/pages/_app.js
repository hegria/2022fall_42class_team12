import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "components/common/Navbar";
import { GlobalStyle } from "styles/GlobalStyle";
import { theme } from "styles/theme";
import { CookiesProvider } from "react-cookie";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Head>
        <title>스꾸팀플</title>
      </Head>
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
