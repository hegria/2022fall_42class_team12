import { Box, Button, Container, VStack } from "@chakra-ui/react";
import PersonalInfoFormGroup from "components/pages/register/PersonalInfoFormGroup";

function AccountModifySection() {
  return (
    <Box as="section" marginTop="80px">
      <Container maxW="container.lg" paddingY="80px">
        <form>
          <VStack spacing="40px">
            <PersonalInfoFormGroup />
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
          </VStack>
        </form>
      </Container>
    </Box>
  );
}

export default AccountModifySection;
