import LoginSection from "components/pages/login/sections/LoginSection";
import Logo from "components/common/Logo";
import { Container } from "@chakra-ui/react";

function LoginPage() {
  return (
    <>
      <Container paddingTop="10em">
        <Logo />
      </Container>
      <LoginSection />
    </>
  );
}

export default LoginPage;
