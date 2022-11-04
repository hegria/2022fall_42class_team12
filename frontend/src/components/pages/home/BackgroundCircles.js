import { Box } from "@chakra-ui/react";

function BackgroundCircles() {
  return (
    <Box position="absolute" w="100%" top="0" left="0" zIndex={-1}>
      <Box
        position="absolute"
        top="-76px"
        left="-160px"
        borderRadius="50%"
        bgColor="green.100"
        w="800px"
        h="800px"
      ></Box>

      <Box
        position="absolute"
        top="431px"
        left="auto"
        right="-160px"
        borderRadius="50%"
        bgColor="green.300"
        w="400px"
        h="400px"
      ></Box>
    </Box>
  );
}

export default BackgroundCircles;
