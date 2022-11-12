import { Flex, Heading, Input, FormControl, FormLabel } from "@chakra-ui/react";

function AccountInfoFormGroup() {
  return (
    <Flex direction="column" w="100%">
      <Heading fontSize="30px" marginBottom="28px">
        계정 정보를 입력해주세요.
      </Heading>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>아이디</FormLabel>
        <Input type="text" placeholder="" bg="white" width="320px" required />
      </FormControl>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>비밀번호</FormLabel>
        <Input type="password" placeholder="" bg="white" width="320px" required />
      </FormControl>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>비밀번호 확인</FormLabel>
        <Input type="password" placeholder="" bg="white" width="320px" required />
      </FormControl>
    </Flex>
  );
}

export default AccountInfoFormGroup;
