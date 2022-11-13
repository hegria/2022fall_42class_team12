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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import useMe from "hooks/useMe";
import useRecruitment from "hooks/useRecruitment";
import ApplicantList from "components/pages/recruitments/ApplicantList";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { getAuthHeader } from "utils/auth";
import { serverAxios } from "utils/axios";
import defaultUserImage from "/public/images/default-user-image.png";

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
    fontWeight: "medium",
    flexShrink: 1,
  },
});

function RecruitmentDetailSection() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, loading, mutate } = useRecruitment(router.query.id);
  const { loggedIn, user } = useMe();
  const mine = user?.userId === data?.author.id ?? false;

  const handleClickDeleteButton = useCallback(async () => {
    try {
      await serverAxios.delete(`/projects/${router.query.id}`, getAuthHeader());
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  const handleClickFavoriteButton = useCallback(async () => {
    try {
      await serverAxios.post(`/projects/${router.query.id}/favorite`, {}, getAuthHeader());
      mutate();
    } catch (e) {
      console.log(e);
    }
  }, [router, mutate]);

  const handleClickUnfavoriteButton = useCallback(async () => {
    try {
      await serverAxios.delete(`/projects/${router.query.id}/favorite`, getAuthHeader());
      mutate();
    } catch (e) {
      console.log(e);
    }
  }, [router, mutate]);

  const handleClickApplicationButton = useCallback(async () => {
    try {
      await serverAxios.post(`/applications`, { projectId: router.query.id }, getAuthHeader());
      mutate();
    } catch (e) {
      console.log(e);
    }
  }, [router, mutate]);

  const handleClickApplicationCancelButton = useCallback(async () => {
    try {
      await serverAxios.delete(`/applications/${data.userApplication.id}`, getAuthHeader());
      mutate();
    } catch (e) {
      console.log(e);
    }
  }, [mutate, data]);

  if (loading) return "loading...";
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
                    <Link href={`/recruitments/write?id=${router.query.id}`} passHref>
                      <Button as="a" colorScheme="gray" variant="outline">
                        수정
                      </Button>
                    </Link>
                    <Button colorScheme="red" onClick={onOpen}>
                      삭제
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>정말 삭제하시겠습니까?</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>삭제한 게시글은 되돌릴 수 없습니다.</ModalBody>
                        <ModalFooter>
                          <HStack spacing="8px">
                            <Button colorScheme="gray" onClick={onClose}>
                              취소
                            </Button>
                            <Button colorScheme="red" onClick={handleClickDeleteButton}>
                              삭제
                            </Button>
                          </HStack>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </HStack>
                ) : (
                  <>
                    {data.isFavorite ? (
                      <Button
                        colorScheme="gray"
                        variant="outline"
                        onClick={handleClickUnfavoriteButton}
                      >
                        즐겨찾기 해제
                      </Button>
                    ) : (
                      <Button
                        colorScheme="gray"
                        variant="outline"
                        onClick={handleClickFavoriteButton}
                      >
                        즐겨찾기 등록
                      </Button>
                    )}
                  </>
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
                  <Avatar size="md" src={data.author.photoUrl ?? defaultUserImage.src} />
                  <Text fontSize="20px" color="gray.700" fontWeight="bold">
                    {data.author.name}
                  </Text>
                </HStack>
              </Link>

              <HStack spacing="60px" wordBreak="break-all" align="flex-start">
                <VStack spacing="30px" align="flex-start" flex="1">
                  <HStack spacing="30px" align="flex-start">
                    <InfoTitle>모집 주제</InfoTitle>
                    <InfoText>{data.subject}</InfoText>
                  </HStack>
                  <HStack spacing="30px" align="flex-start">
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
                  <HStack spacing="30px" align="flex-start">
                    <InfoTitle>시작 예정</InfoTitle>
                    <InfoText>{data.startDate.split(" ")[0]}</InfoText>
                  </HStack>
                  <HStack spacing="30px" align="flex-start">
                    <InfoTitle>종료 예정</InfoTitle>
                    <InfoText>{data.endDate.split(" ")[0]}</InfoText>
                  </HStack>
                  <HStack spacing="30px" align="flex-start">
                    <InfoTitle>연락 방법</InfoTitle>
                    <InfoText>{data.contact.value}</InfoText>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </VStack>

          <Divider />

          {data.photoUrl && (
            <Box w="100%" h="420px" position="relative">
              <Image
                src={data.photoUrl}
                alt="게시글 대표 이미지"
                layout="fill"
                objectFit="contain"
              />
            </Box>
          )}

          <Box w="100%" whiteSpace="pre">
            {data.content}
          </Box>

          {loggedIn ? (
            mine ? (
              <>
                <Divider />
                <ApplicantList projectId={router.query.id} />
              </>
            ) : (
              <>
                {data.userApplication.isApplied ? (
                  <Button size="lg" colorScheme="red" onClick={handleClickApplicationCancelButton}>
                    신청 취소
                  </Button>
                ) : (
                  <Button size="lg" onClick={handleClickApplicationButton}>
                    신청하기
                  </Button>
                )}
              </>
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
