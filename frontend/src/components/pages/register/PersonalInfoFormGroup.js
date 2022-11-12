import {
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Wrap,
  VStack,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import EditableTag from "components/common/EditableTag";
import { useCallback, useRef, useState } from "react";

function PersonalInfoFormGroup() {
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
    <Flex direction="column" w="100%">
      <Heading fontSize="30px" marginBottom="28px">
        개인 정보를 입력해주세요.
      </Heading>
      <Heading fontSize="16px" marginBottom="28px">
        입력한 정보는 모든 사람이 볼 수 있습니다.
      </Heading>

      <Flex marginBottom="16px">
        <FormControl isRequired marginRight="16px">
          <FormLabel>이름</FormLabel>
          <Input type="text" placeholder="홍길동" bg="white" required />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>학과</FormLabel>
          <Input type="text" placeholder="소프트웨어학과" bg="white" required />
        </FormControl>
      </Flex>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>이메일</FormLabel>
        <Input type="email" placeholder="honggildong@gmail.com" bg="white" required />
      </FormControl>

      <FormControl marginBottom="16px">
        <FormLabel>링크(선택)</FormLabel>
        <Input type="url" placeholder="https://github.com/honggildong" bg="white" />
      </FormControl>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>한 줄 자기소개</FormLabel>
        <Textarea resize="none" required bg="white" />
      </FormControl>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>프로필 사진</FormLabel>
        <Input type="file" bg="white" />
        <FormHelperText>jpg, png 파일을 지원합니다.</FormHelperText>
      </FormControl>

      <VStack spacing="20px">
        <FormControl isRequired>
          <FormLabel>기술 스택</FormLabel>
          <Input
            ref={skillInputRef}
            onKeyDown={handleSkillsInput}
            placeholder="엔터로 입력해주세요"
            bg="white"
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
    </Flex>
  );
}

export default PersonalInfoFormGroup;
