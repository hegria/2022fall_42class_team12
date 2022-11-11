import { Button, Container, Flex, Text, Input, Link } from "@chakra-ui/react";

function LoginSection() {
  return (
    <Container position="relative" maxW="480px" paddingY="40px" alignItems="center">
      <Flex direction="column" alignItems="center">
        <Container marginBottom="60px">
          <Text size="md" marginBottom="16px">
            아이디
          </Text>
          <Input type="text" placeholder="" size="md" bg="white" required></Input>

          <Text size="md" marginTop="16px" marginBottom="16px">
            비밀번호
          </Text>
          <Input type="password" placeholder="" size="md" bg="white" required></Input>
        </Container>

        <Container>
          <Button type="submit" width="100%" height="40px" marginBottom="16px">
            로그인
          </Button>
          <Link href="/register" passHref>
            <Button
              colorScheme="gray"
              variant="outline"
              width="100%"
              height="40px"
              marginBottom="16px"
            >
              회원가입
            </Button>
          </Link>
        </Container>
      </Flex>
    </Container>
  );
}

export default LoginSection;
