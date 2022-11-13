import { Flex, Heading, Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

function AccountInfoFormGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Flex direction="column" w="100%">
      <Heading fontSize="30px" marginBottom="28px">
        계정 정보를 입력해주세요.
      </Heading>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>아이디</FormLabel>
        <Input type="text" bg="white" width="320px" maxLength={100} required {...register("id")} />
      </FormControl>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>비밀번호</FormLabel>
        <Input
          type="password"
          bg="white"
          width="320px"
          maxLength={100}
          required
          {...register("password")}
        />
      </FormControl>

      <FormControl isRequired isInvalid={errors.rpassword} marginBottom="16px">
        <FormLabel>비밀번호 확인</FormLabel>
        <Input
          type="password"
          bg="white"
          width="320px"
          maxLength={100}
          required
          {...register("rpassword")}
        />
        {errors.rpassword && <FormErrorMessage>{errors.rpassword.message}</FormErrorMessage>}
      </FormControl>
    </Flex>
  );
}

export default AccountInfoFormGroup;
