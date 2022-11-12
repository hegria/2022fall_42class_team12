import { Box, Button, Container, VStack } from "@chakra-ui/react";
import AccountInfoFormGroup from "components/pages/register/AccountInfoFormGroup";
import PersonalInfoFormGroup from "components/pages/register/PersonalInfoFormGroup";
import { FormProvider, useForm } from "react-hook-form";

function RegisterFormSection() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (data) => {
    console.log(data);
  };

  return (
    <Box as="section">
      <Container maxW="container.lg" paddingY="80px">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <VStack spacing="40px">
              <AccountInfoFormGroup />
              <PersonalInfoFormGroup />
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
