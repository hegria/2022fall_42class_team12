import { Box, Container } from "@chakra-ui/react";

function HomeSection({ children, ...props }) {
  return (
    <Box as="section" {...props}>
      <Container maxW="container.xl" paddingY="80px">
        {children}
      </Container>
    </Box>
  );
}

export default HomeSection;
