import {
  Avatar,
  Button,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import useMe from "hooks/useMe";
import Link from "next/link";

function Navbar() {
  const { loggedIn, logout, user } = useMe();

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

          {loggedIn && user ? (
            <HStack spacing="8px">
              <Link href="/recruitments/write" passHref>
                <Button as="a" variant="ghost" colorScheme="gray">
                  새 글 쓰기
                </Button>
              </Link>

              <Menu>
                <MenuButton as={Button} colorScheme="gray" variant="ghost">
                  <HStack spacing="18px">
                    <Avatar src={user?.photoUrl} size="sm" />
                    <Text fontSize="16px">{user.name}</Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <Link href={`/users/${user.userId}`} passHref>
                    <MenuItem as="a">마이페이지</MenuItem>
                  </Link>
                  <MenuItem onClick={logout} color="red">
                    로그아웃
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <Link href="/login" passHref>
              <Button as="a" borderRadius="99px">
                로그인
              </Button>
            </Link>
          )}
        </Flex>
      </Container>
    </Flex>
  );
}

export default Navbar;
