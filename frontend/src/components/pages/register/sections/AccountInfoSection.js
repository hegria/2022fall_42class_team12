import { Container, Flex, Heading, Text, Input } from "@chakra-ui/react";

function AccountInfoSection() {
  return (
    <Container maxW="80%" paddingY="20px">
      <Flex direction="column">
        <Heading size="md" fontSize="30px" marginBottom="28px">
          계정 정보를 입력해주세요.
        </Heading>
        <Text size="md" marginBottom="8px">
          아이디
        </Text>
        <Input placeholder="" size="md" bg="white" width="320px"></Input>

        <Text size="md" marginTop="16px" marginBottom="8px">
          비밀번호
        </Text>
        <Input placeholder="" size="md" bg="white" width="320px"></Input>

        <Text size="md" marginTop="16px" marginBottom="8px">
          비밀번호 확인
        </Text>
        <Input placeholder="" size="md" bg="white" width="320px"></Input>
      </Flex>
    </Container>
  );
}

export default AccountInfoSection;
