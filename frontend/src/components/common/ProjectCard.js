import { Avatar, Box, chakra, Flex, HStack, Icon, Tag, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import defaultThumbnailImage from "/public/images/default-project-thumbnail.png";
import defaultUserImage from "/public/images/default-user-image.png";

const Anchor = chakra("a", {
  baseStyle: {
    cursor: "pointer",
    _hover: {
      transform: "translate(-2px, -2px)",
      "& > div": {
        boxShadow: "lg",
      },
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
          minH="480px"
          w="100%"
          h="100%"
          borderRadius="24px"
          bgColor="white"
          boxShadow="base"
          overflow="hidden"
          transition="box-shadow 0.2s"
        >
          <Flex direction="column" h="100%">
            <Box width="100%" height="200px" position="relative">
              <Image
                src={photoUrl ?? defaultThumbnailImage}
                alt="포스터 이미지"
                layout="fill"
                objectFit="cover"
              />
            </Box>

            <Flex direction="column" padding="16px" justify="space-between" flex="1">
              <VStack spacing="24px">
                <VStack spacing="8px" align="flex-start" w="100%">
                  <Text fontSize="sm" color="gray.600" noOfLines={1}>
                    {subject}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" noOfLines={2}>
                    {title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    시작 예정일 | {startDate.split(" ")[0]}
                  </Text>
                </VStack>

                <HStack spacing="6px" noOfLines={1} w="100%">
                  {skills.map((skill, idx) => (
                    <Tag key={idx}>{skill}</Tag>
                  ))}
                </HStack>
              </VStack>

              <Flex justify="space-between">
                <HStack spacing="8px">
                  <Avatar
                    size="sm"
                    name={authorName}
                    src={authorPhotoUrl ?? defaultUserImage.src}
                  />
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
