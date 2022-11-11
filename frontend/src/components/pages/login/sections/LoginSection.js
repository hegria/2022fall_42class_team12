import { Button, Container, Flex, Input, FormControl, FormLabel } from "@chakra-ui/react";
import Link from "next/link";

function LoginSection() {
  return (
    <Container position="relative" maxW="480px" paddingY="40px">
      <Flex direction="column" alignItems="center">
        <Container marginBottom="60px">
          <FormControl marginBottom="16px">
            <FormLabel>아이디</FormLabel>
            <Input type="text" placeholder="" bg="white" required />
          </FormControl>

          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input type="password" placeholder="" bg="white" required />
          </FormControl>
        </Container>

        <Container>
          <Button type="submit" width="100%" height="40px" marginBottom="16px">
            로그인
          </Button>
          <Link href="/register" passHref>
            <Button
              as="a"
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
