import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  chakra,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { MOCKUP_PROJECT } from "constants/mockups/project";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const InfoTitle = chakra(Text, {
  baseStyle: {
    fontSize: "20px",
    color: "gray.500",
    fontWeight: "bold",
    flexShrink: 0,
  },
});

const InfoText = chakra(InfoTitle, {
  baseStyle: {
    color: "gray.700",
    flexShrink: 1,
  },
});

function RecruitmentDetailSection() {
  const [data, setData] = useState(MOCKUP_PROJECT);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mine, setMine] = useState(false);

  return (
    <Box as="section" marginTop="80px">
      <Container as="article" maxW="container.lg" paddingY="80px">
        <VStack spacing="40px">
          <VStack as="header" spacing="24px" align="flex-start" w="100%">
            <Flex justify="space-between" w="100%" align="center">
              <Link href="/recruitments" passHref>
                <IconButton
                  as="a"
                  aria-label="Back to main page"
                  variant="outline"
                  borderRadius="99px"
                  border="2px solid"
                  borderColor="gray.500"
                  icon={<ArrowBackIcon color="gray.500" w="20px" h="20px" />}
                />
              </Link>

              {loggedIn ? (
                mine ? (
                  <HStack spacing="8px">
                    <Button colorScheme="gray" variant="outline">
                      수정
                    </Button>
                    <Button colorScheme="red">삭제</Button>
                  </HStack>
                ) : (
                  <Button colorScheme="gray" variant="outline">
                    즐겨찾기 등록
                  </Button>
                )
              ) : (
                <></>
              )}
            </Flex>

            <Flex justify="space-between" w="100%" align="center">
              <Badge colorScheme="green">모집 중</Badge>
              <Text fontSize="16px" color="gray.500">
                게시 일자 | {data.lastEdited}
              </Text>
            </Flex>

            <Heading as="h1" fontSize="48px">
              {data.title}
            </Heading>

            <VStack spacing="30px" w="100%" align="flex-start">
              <Link href={`/users/${data.author.id}`} passHref>
                <HStack as="a" spacing="16px">
                  <Avatar size="md" src={data.author.photoUrl} />
                  <Text fontSize="20px" color="gray.700" fontWeight="bold">
                    {data.author.name}
                  </Text>
                </HStack>
              </Link>

              <HStack spacing="60px" w="100%">
                <VStack spacing="30px" align="flex-start" flex="1">
                  <HStack spacing="30px">
                    <InfoTitle>모집 주제</InfoTitle>
                    <InfoText>{data.subject}</InfoText>
                  </HStack>
                  <HStack spacing="30px">
                    <InfoTitle>모집 인원</InfoTitle>
                    <InfoText>{data.capacity}</InfoText>
                  </HStack>
                  <HStack spacing="30px" align="flex-start">
                    <InfoTitle>기술 스택</InfoTitle>
                    <Wrap>
                      {data.skills.map((skill) => (
                        <Tag key={skill}>{skill}</Tag>
                      ))}
                    </Wrap>
                  </HStack>
                </VStack>

                <VStack spacing="30px" align="flex-start" flex="1">
                  <HStack spacing="30px">
                    <InfoTitle>시작 예정</InfoTitle>
                    <InfoText>{data.startDate}</InfoText>
                  </HStack>
                  <HStack spacing="30px">
                    <InfoTitle>종료 예정</InfoTitle>
                    <InfoText>{data.endDate}</InfoText>
                  </HStack>
                  <HStack spacing="30px">
                    <InfoTitle>연락 방법</InfoTitle>
                    <InfoText>{data.contact.value}</InfoText>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </VStack>

          <Divider />

          <Box w="100%" h="420px" position="relative">
            <Image src={data.photoUrl} alt="게시글 대표 이미지" layout="fill" objectFit="contain" />
          </Box>

          <Box w="100%">{data.content}</Box>

          {loggedIn ? (
            mine ? (
              <Button size="lg">신청자 확인하기</Button>
            ) : (
              <Button size="lg">신청하기</Button>
            )
          ) : (
            <></>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default RecruitmentDetailSection;
