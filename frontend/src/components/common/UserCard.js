import { Avatar, Box, chakra, Button, Flex, HStack, Icon, Tag, Text, VStack } from "@chakra-ui/react";
import { CustomButton } from "styles/theme/components";

const Anchor = chakra("a", {
  baseStyle: {
    cursor: "pointer",
    _hover: {
      transform: "translate(-2px, -2px)",
    },
    transition: "transform 0.2s",
  },
});

function UserCard({
  profimg,
  name,
  department,
  skills,
  intro,
}) {
  return (
      <Anchor>
        <Box
          minW="360px"
          w="100%"
          borderRadius="24px"
          bgColor="white"
          boxShadow="base"
          overflow="hidden"
        >
          <Flex direction="column">
            <Flex direction="column" padding="16px" rowGap="24px">
              <VStack spacing="8px" align="flex-start">
              <HStack spacing="18px">
                <Avatar bg = "gray.300" size="lg" name={name} src={profimg} />
                <VStack spacing="2px">
                  <Text fontSize="2xl" fontWeight="bold">
                    {name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {department}
              </Text>
                </VStack>
              </HStack>
              </VStack>
              <HStack spacing="6px">
                {skills.map((skill, idx) => (
                  <Tag key={idx}>{skill}</Tag>
                ))}
              </HStack>
                <Text fontSize="sm" >
                  {intro}
                </Text>
                
                <Button colorScheme='gray' size="lg"> 프로필 보기 </Button>
            </Flex>
          </Flex>
        </Box>
      </Anchor>
  );
}

export default UserCard;
