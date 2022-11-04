import { Box, Container, Heading, HStack, IconButton, SimpleGrid } from "@chakra-ui/react";
import ProjectCard from "../../../common/ProjectCard";
import { MOCKUP_PROJECT_LIST } from "../../../../constants/mockups/projects";
import { RepeatIcon } from "@chakra-ui/icons";

function RandomSection() {
  return (
    <Box as="section">
      <Container maxW="container.xl" paddingY="80px">
        <HStack spacing="16px" marginBottom="40px">
          <Heading size="lg">랜덤 모집글</Heading>
          <IconButton
            icon={<RepeatIcon />}
            size="sm"
            isRound
            aria-label="랜덤 모집글 다시 받아오기"
          />
        </HStack>

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
      </Container>
    </Box>
  );
}

export default RandomSection;
