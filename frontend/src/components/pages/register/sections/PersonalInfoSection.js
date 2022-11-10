import { Container, Flex, Heading, Text, Input } from "@chakra-ui/react";

function PersonalInfoSection() {
  return (
    <Container maxW="80%" paddingY="20px">
      <Flex direction="column">
        <Heading fontSize="30px" marginBottom="28px">
          개인 정보를 입력해주세요.
        </Heading>
        <Heading fontSize="16px" marginBottom="28px">
          입력한 정보는 모든 사람이 볼 수 있습니다.
        </Heading>

        <Flex marginBottom="8px">
          <Text size="md" width="464px" marginRight="16px">
            이름
          </Text>
          <Text size="md" width="464px">
            학과
          </Text>
        </Flex>
        <Flex marginBottom="16px">
          <Input placeholder="홍길동" size="md" bg="white" width="464px" marginRight="16px"></Input>
          <Input placeholder="소프트웨어학과" size="md" bg="white" width="464px"></Input>
        </Flex>

        <Text size="md" marginBottom="8px">
          이메일
        </Text>
        <Input
          placeholder="honggildong@gmail.com"
          size="md"
          bg="white"
          width="944px"
          marginBottom="16px"
        ></Input>

        <Text size="md" marginBottom="8px">
          링크(선택)
        </Text>
        <Input
          placeholder="https://github.com/honggildong"
          size="md"
          bg="white"
          width="944px"
          marginBottom="16px"
        ></Input>

        <Text size="md" marginBottom="8px">
          한 줄 자기소개
        </Text>
        <Input
          placeholder="안녕하세요! 개발자 홍길동입니다."
          size="md"
          bg="white"
          width="944px"
          height="80px"
          marginBottom="16px"
        ></Input>

        <Text size="md" marginBottom="8px">
          프로필 사진
        </Text>
        <Input placeholder="" size="md" bg="white" width="944px" marginBottom="16px"></Input>

        <Text size="md" marginBottom="8px">
          기술 스택
        </Text>
        <Input
          placeholder="엔터로 입력해주세요"
          size="md"
          bg="white"
          width="944px"
          marginBottom="16px"
        ></Input>
      </Flex>
    </Container>
  );
}

export default PersonalInfoSection;
