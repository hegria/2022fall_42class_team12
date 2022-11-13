import { Button, FormControl, FormLabel, HStack, Input, VStack, Wrap } from "@chakra-ui/react";
import EditableTag from "components/common/EditableTag";
import { useEffect, useRef, useState } from "react";

function SkillInput({ value = [], onChange, ...props }) {
  const [skills, setSkills] = useState(value);
  const skillInputRef = useRef(null);
  const handleSkillsInput = () => {
    if (!skillInputRef.current) {
      return;
    }

    const value = skillInputRef.current.value;
    if (value.length === 0) {
      return;
    }

    setSkills((p) => [...p, value]);
    skillInputRef.current.value = "";
  };

  useEffect(() => {
    setSkills(value);
  }, [value]);

  useEffect(() => {
    onChange?.(skills);
  }, [onChange, skills]);

  return (
    <VStack spacing="20px" {...props}>
      <HStack w="100%" align="flex-end" spacing="16px">
        <FormControl>
          <FormLabel>기술 스택</FormLabel>
          <Input
            ref={skillInputRef}
            placeholder="입력 후 우측의 추가 버튼을 눌러주세요"
            bg="white"
          />
        </FormControl>
        <Button onClick={handleSkillsInput} w="30%">
          추가
        </Button>
      </HStack>

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
  );
}

export default SkillInput;
