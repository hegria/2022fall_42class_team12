import { Heading, SimpleGrid } from "@chakra-ui/react";
import { MOCKUP_PROJECT_LIST } from "constants/mockups/projects";
import ProjectCard from "components/common/ProjectCard";
import HomeSectionLayout from "components/pages/home/HomeSectionLayout";

function PopularProjectsSection() {
  return (
    <HomeSectionLayout>
      <Heading size="lg" marginBottom="40px">
        인기 모집글
      </Heading>

      <SimpleGrid columns={3} spacing="24px">
        {MOCKUP_PROJECT_LIST.slice(0, 3).map((project) => (
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
    </HomeSectionLayout>
  );
}

export default PopularProjectsSection;
