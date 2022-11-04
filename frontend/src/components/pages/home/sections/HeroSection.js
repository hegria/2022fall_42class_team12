import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import BackgroundCircles from "components/pages/home/BackgroundCircles";
import heroImage from "/public/images/hero.png";

function HeroSection() {
  return (
    <Box as="section" marginTop="80px">
      <Container position="relative" maxW="container.xl" paddingY="80px">
        <BackgroundCircles />
        <Flex justify="space-between" align="center">
          <Flex direction="column" alignItems="flex-start">
            <Heading
              as="h1"
              fontFamily="BinggraeSamanco"
              fontSize="96px"
              color="green.500"
              marginBottom="32px"
            >
              스꾸팀플
            </Heading>

            <Heading size="md" marginBottom="48px">
              함께 프로젝트 할 동료들을 찾아보세요!
            </Heading>

            <Button size="lg" rightIcon={<ChevronRightIcon />}>
              둘러보러 가기
            </Button>
          </Flex>

          <Image
            src={heroImage}
            alt="프로젝트를 하고 있는 모습의 이미지"
            width={600}
            height={600}
          />
        </Flex>
      </Container>
    </Box>
  );
}

export default HeroSection;
