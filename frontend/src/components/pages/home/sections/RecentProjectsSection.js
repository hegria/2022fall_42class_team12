import { Button, Center, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import ProjectCard from "components/common/ProjectCard";
import useRecruitments from "components/hooks/useRecruitments";
import HomeSectionLayout from "components/pages/home/HomeSectionLayout";

const PAGE_SIZE = 9;

function RecentProjectsSection() {
  const { data, size, setSize, initialLoading } = useRecruitments({
    pageSize: PAGE_SIZE,
    sortBy: "favorite.desc",
  });

  const projects = data ? [].concat(...data.map((pageData) => pageData.content)) : [];
  const loadingMore = initialLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const empty = data?.[0]?.content.length === 0;
  const reachingEnd = empty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return (
    <HomeSectionLayout>
      <Heading size="lg" marginBottom="40px">
        최근 등록된 모집글
      </Heading>

      <VStack spacing="40px">
        {!initialLoading && empty ? (
          <Center>등록된 모집글이 없습니다.</Center>
        ) : (
          <SimpleGrid columns={3} spacing="24px" w="100%">
            {projects.map((project) => (
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

        <Button onClick={() => setSize(size + 1)} size="lg" disabled={loadingMore || reachingEnd}>
          {loadingMore ? "불러오는 중..." : reachingEnd ? "데이터 없음" : "더 불러오기"}
        </Button>
      </VStack>
    </HomeSectionLayout>
  );
}

export default RecentProjectsSection;
