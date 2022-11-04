import { extendTheme } from "@chakra-ui/react";
import { CustomButton, CustomContainer, CustomTag } from "./components";

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
    Tag: CustomTag,
  },
});
