import { Box, Container } from "@chakra-ui/react";

function HomeSectionLayout({ children, ...props }) {
  return (
    <Box as="section" {...props}>
      <Container maxW="container.xl" paddingY="80px">
        {children}
      </Container>
    </Box>
  );
}

export default HomeSectionLayout;
