import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import SkillInput from "components/common/SkillInput";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { serverAxios } from "utils/axios";
import { getCookie } from "utils/cookie";

function RecruitmentWriteSection() {
  const router = useRouter();

  const toast = useToast();

  const { register, handleSubmit, setValue, control } = useForm();

  register("skills", { required: true });
  const [skills, setSkills] = useState([]);

  const onSubmit = async (data) => {
    const { photoUrl, ...body } = data;
    const reqBody = {
      ...body,
      photoUrl: photoUrl?.[0],
    };

    try {
      let targetId;
      let toastMessage;
      if (router.query.id) {
        await serverAxios.post(`/projects/${router.query.id}`, reqBody, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        });
        targetId = router.query.id;
        toastMessage = "모집글이 수정되었습니다.";
      } else {
        const { data } = await serverAxios.post("/projects", reqBody, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        });
        targetId = data.projectId;
        toastMessage = "모집글이 등록되었습니다.";
      }
      toast.closeAll();
      toast({
        title: "모집글이 등록되었습니다.",
        status: "success",
        isClosable: true,
      });
      // TODO: 백엔드에서 등록된 글 id 리턴해주면 글 링크로 이동
      Router.push(`/recruitments/${targetId}`);
    } catch (e) {
      toast({
        title: "모집글 등록 실패",
        description: e.response?.data?.reason ?? e.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!router.query.id) return;

    const fetchRecruitmentInfo = async (id) => {
      try {
        const { data } = await serverAxios.get(`/projects/${id}`);
        setValue("title", data.title);
        setValue("subject", data.subject);
        setValue("capacity", data.capacity);
        setValue("startDate", data.startDate.split(" ")[0]);
        setValue("endDate", data.endDate.split(" ")[0]);
        setValue("contactMethod", data.contact.method);
        setValue("contactValue", data.contact.value);
        setValue("skills", data.skills);
        setSkills(data.skills);
        setValue("content", data.content);
        // NOTE: input type="file" 의 value를 설정할 수 없는 문제가 있음
        // setValue("photoUrl", data.photoUrl);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRecruitmentInfo(router.query.id);
  }, [router, setValue]);

  return (
    <Box as="section" marginTop="80px">
      <Container as="article" maxW="container.lg" paddingY="80px">
        <Heading as="h1" fontSize="30px" marginBottom="40px">
          모집글 정보를 입력해주세요.
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="40px">
            <VStack spacing="20px" w="100%">
              <FormControl isRequired>
                <FormLabel>제목</FormLabel>
                <Input
                  placeholder="같이 프로젝트 하실 분 구합니다!"
                  bg="white"
                  {...register("title", { required: true })}
                />
              </FormControl>

              <HStack w="100%" spacing="16px">
                <FormControl isRequired>
                  <FormLabel>모집 주제</FormLabel>
                  <Input
                    placeholder="프로젝트"
                    bg="white"
                    {...register("subject", { required: true })}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>모집 인원</FormLabel>
                  <Controller
                    required={true}
                    name="capacity"
                    control={control}
                    render={({ field }) => (
                      <NumberInput {...field} defaultValue={1} min={1} max={65535} bg="white">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                </FormControl>
              </HStack>

              <HStack w="100%" spacing="16px">
                <FormControl isRequired>
                  <FormLabel>시작 예정</FormLabel>
                  <Input type="date" bg="white" {...register("startDate", { required: true })} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>종료 예정</FormLabel>
                  <Input type="date" bg="white" {...register("endDate", { required: true })} />
                </FormControl>
              </HStack>

              <HStack w="100%" spacing="16px" align="flex-end">
                <FormControl isRequired w="30%">
                  <FormLabel>연락 방법</FormLabel>
                  <Select bg="white" {...register("contactMethod", { required: true })}>
                    <option value="kakao">카카오톡 오픈채팅</option>
                    <option value="email">이메일</option>
                    <option value="phone">전화번호</option>
                    <option value="link">기타 링크</option>
                  </Select>
                </FormControl>

                <Input
                  required
                  placeholder="연락처를 입력하세요"
                  bg="white"
                  {...register("contactValue", { required: true })}
                />
              </HStack>

              <SkillInput
                w="100%"
                value={skills}
                onChange={(skills) => {
                  setValue("skills", skills);
                }}
              />
            </VStack>

            <Divider />

            <VStack spacing="20px" w="100%">
              <FormControl isRequired>
                <FormLabel>모집글 내용</FormLabel>
                <Textarea
                  resize="none"
                  style={{ height: "300px" }}
                  bg="white"
                  {...register("content", { required: true })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>커버 이미지로 등록할 사진</FormLabel>
                <Input
                  type="file"
                  accept="image/png, image/jpeg"
                  bg="white"
                  {...register("photoUrl")}
                />
                <FormHelperText>jpg, png 파일을 지원합니다.</FormHelperText>
              </FormControl>
            </VStack>

            <Button type="submit" size="lg">
              등록
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
}

export default RecruitmentWriteSection;
