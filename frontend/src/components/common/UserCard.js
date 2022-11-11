import { Avatar, Box, Button, Flex, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

function UserCard({ profimg, name, department, skills, intro }) {
  return (
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
              <Avatar bg="gray.300" size="lg" name={name} src={profimg} />
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
          <HStack spacing="6px">
            {skills.map((skill, idx) => (
              <Tag key={idx}>{skill}</Tag>
            ))}
          </HStack>
          <Text fontSize="sm">{intro}</Text>

          <Link href={`/users/${1}`} passHref>
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
