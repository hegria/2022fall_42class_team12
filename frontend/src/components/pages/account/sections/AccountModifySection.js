import { Box, Button, Container, useToast, VStack } from "@chakra-ui/react";
import useMe from "hooks/useMe";
import PersonalInfoFormGroup from "components/pages/register/PersonalInfoFormGroup";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { serverAxios } from "utils/axios";
import { getCookie } from "utils/cookie";

function AccountModifySection() {
  const { user, mutate } = useMe();

  const methods = useForm();

  const toast = useToast();

  const onSubmit = async (data) => {
    const { photoUrl, ...body } = data;

    const reqBody = {
      ...body,
      photoUrl: photoUrl?.[0],
    };

    try {
      await serverAxios.post("/users/me", reqBody, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });
      mutate();
      toast.closeAll();
      toast({
        title: "정보가 수정되었습니다.",
        status: "success",
        isClosable: true,
      });
      Router.push(`/users/${user.userId}`);
    } catch (e) {
      toast({
        title: "오류가 발생했습니다.",
        description: e.response?.data?.reason ?? e.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const [skills, setSkills] = useState([]);
  useEffect(() => {
    if (!user) return;
    methods.setValue("name", user.name);
    methods.setValue("department", user.department);
    methods.setValue("email", user.email);
    methods.setValue("personalLink", user.personalLink);
    methods.setValue("introduction", user.introduction);
    methods.setValue("photoUrl", user.photoUrl);
    methods.setValue("skills", user.skills);
    setSkills(user.skills);
  }, [user, methods]);

  return (
    <Box as="section" marginTop="80px">
      <Container maxW="container.lg" paddingY="80px">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <VStack spacing="40px">
              <PersonalInfoFormGroup skills={skills} />
              <Button type="submit" size="lg">
                수정
              </Button>
            </VStack>
          </form>
        </FormProvider>
      </Container>
    </Box>
  );
}

export default AccountModifySection;
