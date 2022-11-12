import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
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
          <Flex>
            <Link href="/" passHref>
              <Text as="a" fontFamily="BinggraeSamanco" fontSize="32px" marginRight="32px">
                스꾸팀플
              </Text>
            </Link>

            <HStack spacing="8px">
              <Link href="/recruitments" passHref>
                <Button as="a" variant="ghost" colorScheme="gray">
                  모집글
                </Button>
              </Link>
              <Link href="/users" passHref>
                <Button as="a" variant="ghost" colorScheme="gray">
                  유저
                </Button>
              </Link>
            </HStack>
          </Flex>

          <HStack spacing="16px">
            <Link href="/login" passHref>
              <Button as="a" borderRadius="99px">
                로그인
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Navbar;
