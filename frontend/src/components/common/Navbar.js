import { Button, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export const NAVBAR_HEIGHT = 60;

function Navbar() {
  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      h={`${NAVBAR_HEIGHT}px`}
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

          <Button borderRadius="99px">로그인</Button>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Navbar;
