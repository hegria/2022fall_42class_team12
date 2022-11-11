import { Button, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import ProjectCard from "components/common/ProjectCard";
import HomeSectionLayout from "components/pages/home/HomeSectionLayout";
import { MOCKUP_PROJECT_LIST } from "constants/mockups/project";

function RecentProjectsSection() {
  return (
    <HomeSectionLayout>
      <Heading size="lg" marginBottom="40px">
        최근 등록된 모집글
      </Heading>

      <VStack spacing="40px">
        <SimpleGrid columns={3} spacing="24px" w="100%">
          {MOCKUP_PROJECT_LIST.content.map((project) => (
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

export default RecentProjectsSection;
