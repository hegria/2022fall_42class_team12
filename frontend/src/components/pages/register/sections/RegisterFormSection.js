import { Box, Button, Container, useToast, VStack } from "@chakra-ui/react";
import AccountInfoFormGroup from "components/pages/register/AccountInfoFormGroup";
import PersonalInfoFormGroup from "components/pages/register/PersonalInfoFormGroup";
import Router from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { serverAxios } from "utils/axios";

function RegisterFormSection() {
  const methods = useForm();

  const toast = useToast();

  const onSubmit = async (data) => {
    const { rpassword, photoUrl, ...body } = data;

    if (body.password !== rpassword) {
      methods.setError(
        "rpassword",
        { type: "custom", message: "입력하신 비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
      return;
    }

    const reqBody = {
      ...body,
      photoUrl: photoUrl?.[0],
    };

    try {
      await serverAxios.post("/users/register", reqBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.closeAll();
      toast({
        title: "회원가입 성공",
        status: "success",
        isClosable: true,
      });
      Router.push("/login");
    } catch (e) {
      toast({
        title: "회원가입 실패",
        description: e.response?.data?.reason ?? e.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box as="section">
      <Container maxW="container.lg" paddingY="80px">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <VStack spacing="40px">
              <AccountInfoFormGroup />
              <PersonalInfoFormGroup skills={[]} />
              <Button type="submit" size="lg">
                회원 가입
              </Button>
            </VStack>
          </form>
        </FormProvider>
      </Container>
    </Box>
  );
}

export default RegisterFormSection;
