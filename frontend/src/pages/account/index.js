import PersonalInfoSection from "components/pages/register/sections/PersonalInfoSection";
import { Button, Flex } from "@chakra-ui/react";

function AccountPage() {
  return (
    <Flex direction="column" padding="20px" marginTop="100px">
      <PersonalInfoSection />
      <Button
        position="relative"
        size="lg"
        height="48px"
        marginTop="20px"
        marginBottom="162px"
        alignSelf="center"
      >
        수정
      </Button>
    </Flex>
  );
}

export default AccountPage;
