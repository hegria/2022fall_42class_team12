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
import ProjectCard from "components/common/ProjectCard";
import { PAGE_SIZE } from "constants/list";
import useRecruitments from "hooks/useRecruitments";
import { useState } from "react";

function RecruitPage() {
  const [keywordInput, setKeywordInput] = useState("");

  // TODO: Debouncing
  const { recruitments, size, setSize, initialLoading, loadingMore, empty, reachingEnd } =
    useRecruitments({
      pageSize: PAGE_SIZE,
      keyword: keywordInput,
    });

  return (
    <HomeSectionLayout>
      <Center>
        <Heading marginTop="60px" marginBottom="60px">
          등록된 모집글 둘러보기
        </Heading>
      </Center>
      <Center>
        <Center>
          <InputGroup marginBottom="100px" size="lg">
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="gray.500" />}
            />
            <Input
              variant="filled"
              placeholder="검색어를 입력하세요"
              w="800px"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
            />
          </InputGroup>
        </Center>
      </Center>
      <VStack spacing="40px">
        {!initialLoading && empty ? (
          <Center>등록된 모집글이 없습니다.</Center>
        ) : (
          <SimpleGrid columns={3} spacing="24px" w="100%">
            {recruitments.map((project) => (
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
        )}

        {!reachingEnd && (
          <Button onClick={() => setSize(size + 1)} size="lg" disabled={loadingMore}>
            {loadingMore ? "불러오는 중..." : "더 불러오기"}
          </Button>
        )}
      </VStack>
    </HomeSectionLayout>
  );
}

export default RecruitPage;
