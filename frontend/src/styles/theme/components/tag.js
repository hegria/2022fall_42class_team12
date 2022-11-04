import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "99px",
  },
});

const solid = definePartsStyle({
  container: {
    bg: "green.400",
    color: "white",
  },
});

export const CustomTag = defineMultiStyleConfig({
  baseStyle,
  variants: {
    solid,
  },
  defaultProps: {
    variant: "solid",
  },
});
