import { Avatar, Box, chakra, Flex, HStack, Icon, Tag, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const Anchor = chakra("a", {
  baseStyle: {
    cursor: "pointer",
    _hover: {
      transform: "translate(-2px, -2px)",
    },
    transition: "transform 0.2s",
  },
});

function ProjectCard({
  projectId,
  subject,
  title,
  startDate,
  skills,
  photoUrl,
  authorPhotoUrl,
  authorName,
  curPeopleCount,
  maxPeopleCount,
}) {
  return (
    <Link href={`/recruitments/${projectId}`} passHref>
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
            <Box width="100%" height="200px" position="relative">
              <Image src={photoUrl} alt="포스터 이미지" layout="fill" objectFit="cover" />
            </Box>

            <Flex direction="column" padding="16px" rowGap="24px">
              <VStack spacing="8px" align="flex-start">
                <Text fontSize="sm" color="gray.600">
                  {subject}
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {title}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  시작 예정일 | {startDate}
                </Text>
              </VStack>

              <HStack spacing="6px">
                {skills.map((skill, idx) => (
                  <Tag key={idx}>{skill}</Tag>
                ))}
              </HStack>

              <Flex justify="space-between">
                <HStack spacing="8px">
                  <Avatar size="sm" name={authorName} src={authorPhotoUrl} />
                  <Text fontSize="sm">{authorName}</Text>
                </HStack>

                <HStack spacing="8px">
                  <Icon as={FaUser} w="16px" h="16px" color="gray.700" />
                  <Text fontSize="sm">
                    {curPeopleCount} / {maxPeopleCount}
                  </Text>
                </HStack>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Anchor>
    </Link>
  );
}

export default ProjectCard;
