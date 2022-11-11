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
  VStack,
  Wrap,
} from "@chakra-ui/react";
import EditableTag from "components/common/EditableTag";
import { useCallback, useRef, useState } from "react";

function RecruitmentWriteSection() {
  const [skills, setSkills] = useState([]);

  const skillInputRef = useRef(null);
  const handleSkillsInput = useCallback((e) => {
    if (!skillInputRef.current) {
      return;
    }

    if (e.keyCode === 13) {
      const value = skillInputRef.current.value;
      if (value.length === 0) {
        return;
      }
      setSkills((p) => {
        return [...p, value];
      });
      skillInputRef.current.value = "";
    }
  }, []);

  return (
    <Box as="section" marginTop="80px">
      <Container as="article" maxW="container.lg" paddingY="80px">
        <Heading as="h1" fontSize="30px" marginBottom="40px">
          모집글 정보를 입력해주세요.
        </Heading>

        <form>
          <VStack spacing="40px">
            <VStack spacing="20px" w="100%">
              <FormControl isRequired>
                <FormLabel>제목</FormLabel>
                <Input placeholder="같이 프로젝트 하실 분 구합니다!" />
              </FormControl>

              <HStack w="100%" spacing="16px">
                <FormControl isRequired>
                  <FormLabel>모집 주제</FormLabel>
                  <Input placeholder="프로젝트" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>모집 인원</FormLabel>
                  <NumberInput defaultValue={1} min={1} max={65535}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>

              <HStack w="100%" spacing="16px">
                <FormControl isRequired>
                  <FormLabel>시작 예정</FormLabel>
                  <Input type="date" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>종료 예정</FormLabel>
                  <Input type="date" />
                </FormControl>
              </HStack>

              <HStack w="100%" spacing="16px" align="flex-end">
                <FormControl isRequired w="30%">
                  <FormLabel>연락 방법</FormLabel>
                  <Select>
                    <option value="kakao">카카오톡 오픈채팅</option>
                    <option value="email">이메일</option>
                    <option value="phone">전화번호</option>
                    <option value="link">기타 링크</option>
                  </Select>
                </FormControl>

                <Input required placeholder="연락처를 입력하세요" />
              </HStack>

              <FormControl isRequired>
                <FormLabel>기술 스택</FormLabel>
                <Input
                  ref={skillInputRef}
                  onKeyDown={handleSkillsInput}
                  placeholder="엔터로 입력해주세요"
                />
              </FormControl>

              <Wrap w="100%" overflow="visible">
                {skills.map((skill, idx) => (
                  <EditableTag
                    key={idx}
                    onClickCloseButton={() => {
                      setSkills(skills.filter((_, seletedIdx) => seletedIdx !== idx));
                    }}
                  >
                    {skill}
                  </EditableTag>
                ))}
              </Wrap>
            </VStack>

            <Divider />

            <VStack spacing="20px" w="100%">
              <FormControl isRequired>
                <FormLabel>모집글 내용</FormLabel>
                <Textarea resize="none" style={{ height: "300px" }} />
              </FormControl>

              <FormControl>
                <FormLabel>커버 이미지로 등록할 사진</FormLabel>
                <Input type="file" accept="image/png, image/jpeg" />
                <FormHelperText>jpg, png 파일을 지원합니다.</FormHelperText>
              </FormControl>
            </VStack>

            <Button size="lg">등록</Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
}

export default RecruitmentWriteSection;
