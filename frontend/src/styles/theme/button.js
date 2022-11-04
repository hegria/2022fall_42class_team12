import { defineStyleConfig } from "@chakra-ui/react";

export const CustomButton = defineStyleConfig({
  variants: {
    solid: {
      bg: "green.400",
      color: "white",
      _hover: {
        bg: "green.500",
      },
      _active: {
        bg: "green.600",
      },
    },
  },
});
