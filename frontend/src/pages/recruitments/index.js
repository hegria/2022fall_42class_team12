import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Center,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";
import HomeSectionLayout from "components/pages/home/HomeSectionLayout";
import { MOCKUP_PROJECT_LIST } from "constants/mockups/projects";
import ProjectCard from "components/common/ProjectCard";

function RecruitPage() {
  return (
    <HomeSectionLayout>
      <Center>
        <Heading marginTop="60px" marginBottom="60px">
          등록된 모집글 둘러보기
        </Heading>
      </Center>
      <Center>
        <Center>
          <InputGroup marginBottom="100px">
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="gray.500" />}
            />
            <Input variant="filled" placeholder="    검색어를 입력하세요" size="lg" w="800px" />
          </InputGroup>
        </Center>
      </Center>
      <VStack spacing="40px">
        <SimpleGrid columns={3} spacing="24px">
          {MOCKUP_PROJECT_LIST.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              subject={project.subject}
              title={project.title}
              startDate={project.startDate}
              skills={project.skills}
              photoUrl={project.photoUrl}
              authorPhotoUrl={project.author.photoUrl}
              authorName={project.author.name}
              maxPeopleCount={project.capacity}
              curPeopleCount={project.approvalCount}
            />
          ))}
        </SimpleGrid>
        <Button size="lg">더 불러오기</Button>
      </VStack>
    </HomeSectionLayout>
  );
}

export default RecruitPage;
