import { extendTheme } from "@chakra-ui/react";
import { CustomButton, CustomContainer, CustomTag } from "./components";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: "gray.50",
        minWidth: "1280px",
        overflowX: { base: "scroll", xl: "hidden" },
      },
    },
  },

  colors: {
    brand: {
      500: "#48BB78",
      600: "#38A169",
      700: "#2F855A",
    },
  },

  fonts: {
    heading: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },

  components: {
    Button: CustomButton,
    Container: CustomContainer,
    Tag: CustomTag,
  },
});
