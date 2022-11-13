import { Avatar, Box, Button, Flex, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import defaultUserImage from "/public/images/default-user-image.png";

function UserCard({ userId, profimg, name, department, skills, intro }) {
  return (
    <Box
      minW="360px"
      w="100%"
      borderRadius="24px"
      bgColor="white"
      boxShadow="base"
      overflow="hidden"
    >
      <Flex direction="column" h="100%">
        <Flex direction="column" justify="space-between" padding="16px" h="100%">
          <VStack spacing="24px" marginBottom="24px">
            <VStack spacing="8px" align="flex-start" w="100%">
              <HStack spacing="18px">
                <Avatar bg="gray.300" size="lg" name={name} src={profimg ?? defaultUserImage.src} />
                <VStack spacing="2px" align="flex-start">
                  <Text fontSize="2xl" fontWeight="bold">
                    {name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {department}
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            <HStack spacing="6px" w="100%">
              {skills.map((skill, idx) => (
                <Tag key={idx}>{skill}</Tag>
              ))}
            </HStack>
            <Text fontSize="sm" w="100%">
              {intro}
            </Text>
          </VStack>

          <Link href={`/users/${userId}`} passHref>
            <Button as="a" colorScheme="gray" size="lg">
              프로필 보기
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default UserCard;
