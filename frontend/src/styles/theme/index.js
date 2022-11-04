import { extendTheme } from "@chakra-ui/react";
import { CustomButton } from "./button";
import { CustomContainer } from "./container";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: "gray.50",
        minWidth: "1280px",
      },
    },
  },
  fonts: {
    heading: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  components: {
    Button: CustomButton,
    Container: CustomContainer,
  },
});
