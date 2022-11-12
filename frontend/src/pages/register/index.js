import Logo from "components/common/Logo";
import { Container } from "@chakra-ui/react";
import RegisterFormSection from "components/pages/register/sections/RegisterFormSection";

function RegisterPage() {
  return (
    <>
      <Container paddingTop="8em">
        <Logo />
      </Container>
      <RegisterFormSection />
    </>
  );
}

export default RegisterPage;
