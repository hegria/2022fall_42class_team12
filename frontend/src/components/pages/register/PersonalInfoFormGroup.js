import {
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import SkillInput from "components/common/SkillInput";
import { useFormContext } from "react-hook-form";

function PersonalInfoFormGroup({ skills }) {
  const { register, setValue } = useFormContext();

  register("skills");

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
          <Input
            type="text"
            placeholder="홍길동"
            bg="white"
            maxLength={100}
            {...register("name")}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>학과</FormLabel>
          <Input
            type="text"
            placeholder="소프트웨어학과"
            bg="white"
            maxLength={100}
            {...register("department")}
          />
        </FormControl>
      </Flex>

      {/* TODO: 이메일 주소 검사 */}
      <FormControl isRequired marginBottom="16px">
        <FormLabel>이메일</FormLabel>
        <Input
          type="email"
          placeholder="honggildong@skku.edu"
          bg="white"
          maxLength={100}
          {...register("email")}
        />
        <FormHelperText>성균관대학교 이메일(skku.edu, g.skku.edu)을 입력해주세요.</FormHelperText>
      </FormControl>

      <FormControl marginBottom="16px">
        <FormLabel>링크</FormLabel>
        <Input
          type="url"
          placeholder="https://github.com/honggildong"
          bg="white"
          maxLength={100}
          {...register("personalLink")}
        />
      </FormControl>

      <FormControl isRequired marginBottom="16px">
        <FormLabel>한 줄 자기소개</FormLabel>
        <Textarea resize="none" bg="white" maxLength={100} {...register("introduction")} />
      </FormControl>

      <FormControl marginBottom="16px">
        <FormLabel>프로필 사진</FormLabel>
        <Input type="file" bg="white" {...register("photoUrl")} />
        <FormHelperText>jpg, png 파일을 지원합니다.</FormHelperText>
      </FormControl>

      <SkillInput
        value={skills}
        onChange={(skills) => {
          setValue("skills", skills);
        }}
      />
    </Flex>
  );
}

export default PersonalInfoFormGroup;
