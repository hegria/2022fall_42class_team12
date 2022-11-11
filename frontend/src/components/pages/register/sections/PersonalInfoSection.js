import { Container, Flex, Heading, Input, FormControl, FormLabel } from "@chakra-ui/react";

function PersonalInfoSection() {
  return (
    <Container maxW="1024px" paddingY="20px">
      <Flex direction="column">
        <Heading fontSize="30px" marginBottom="28px">
          개인 정보를 입력해주세요.
        </Heading>
        <Heading fontSize="16px" marginBottom="28px">
          입력한 정보는 모든 사람이 볼 수 있습니다.
        </Heading>

        <Flex marginBottom="16px">
          <FormControl marginRight="16px">
            <FormLabel>이름</FormLabel>
            <Input type="text" placeholder="홍길동" bg="white" required />
          </FormControl>
          <FormControl>
            <FormLabel>학과</FormLabel>
            <Input type="text" placeholder="소프트웨어학과" bg="white" required />
          </FormControl>
        </Flex>

        <FormControl marginBottom="16px">
          <FormLabel>이메일</FormLabel>
          <Input type="email" placeholder="honggildong@gmail.com" bg="white" required />
        </FormControl>

        <FormControl marginBottom="16px">
          <FormLabel>링크(선택)</FormLabel>
          <Input type="url" placeholder="https://github.com/honggildong" bg="white" />
        </FormControl>

        <FormControl marginBottom="16px">
          <FormLabel>한 줄 자기소개</FormLabel>
          <Input
            type="text"
            placeholder="안녕하세요! 개발자 홍길동입니다."
            bg="white"
            height="80px"
            required
          />
        </FormControl>

        <FormControl marginBottom="16px">
          <FormLabel>프로필 사진</FormLabel>
          <Input placeholder="" bg="white" />
        </FormControl>

        <FormControl marginBottom="16px">
          <FormLabel>기술 스택</FormLabel>
          <Input placeholder="엔터로 입력해주세요" bg="white" required />
        </FormControl>
      </Flex>
    </Container>
  );
}

export default PersonalInfoSection;
