import Logo from "components/common/Logo";
import AccountInfoSection from "components/pages/register/sections/AccountInfoSection";
import PersonalInfoSection from "components/pages/register/sections/PersonalInfoSection";
import { Container, Button, Flex } from "@chakra-ui/react";

function RegisterPage() {
  return (
    <>
      <Container paddingTop="8em">
        <Logo />
      </Container>
      <Flex direction="column">
        <AccountInfoSection />
        <PersonalInfoSection />
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
      </Flex>
    </>
  );
}

export default RegisterPage;
