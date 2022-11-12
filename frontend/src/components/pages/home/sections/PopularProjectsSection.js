import { Center, Heading, SimpleGrid } from "@chakra-ui/react";
import ProjectCard from "components/common/ProjectCard";
import HomeSectionLayout from "components/pages/home/HomeSectionLayout";
import useRecruitments from "components/hooks/useRecruitments";

const PAGE_SIZE = 3;

function PopularProjectsSection() {
  const { data, initialLoading } = useRecruitments({
    pageSize: PAGE_SIZE,
    sortBy: "favorite.desc",
  });

  const projects = data ? [].concat(...data.map((pageData) => pageData.content)) : [];
  const empty = data?.[0]?.content.length === 0;

  return (
    <HomeSectionLayout>
      <Heading size="lg" marginBottom="40px">
        인기 모집글
      </Heading>

      {!initialLoading && empty ? (
        <Center w="100%">등록된 모집글이 없습니다.</Center>
      ) : (
        <SimpleGrid columns={3} spacing="24px">
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
    </HomeSectionLayout>
  );
}

export default PopularProjectsSection;
