import { Box, Button, Container, Flex, VStack } from "@chakra-ui/react";
import AccountInfoFormGroup from "components/pages/register/AccountInfoFormGroup";
import PersonalInfoFormGroup from "components/pages/register/PersonalInfoFormGroup";

function RegisterFormSection() {
  return (
    <Box as="section">
      <Container maxW="container.lg" paddingY="80px">
        <form>
          <VStack spacing="40px">
            <AccountInfoFormGroup />
            <PersonalInfoFormGroup />
            <Button
              position="relative"
              size="lg"
              height="48px"
              marginTop="20px"
              marginBottom="288px"
              alignSelf="center"
            >
              회원 가입
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
}

export default RegisterFormSection;
