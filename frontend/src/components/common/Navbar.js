import { Button, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

function Navbar() {
  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      h="60px"
      align="center"
      boxShadow="base"
      bgColor="white"
      zIndex="sticky"
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Link href="/" passHref>
            <Text as="a" fontFamily="BinggraeSamanco" fontSize="32px">
              스꾸팀플
            </Text>
          </Link>
          <Link href="/login" passHref>
            <Button borderRadius="99px">로그인</Button>
          </Link>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Navbar;
