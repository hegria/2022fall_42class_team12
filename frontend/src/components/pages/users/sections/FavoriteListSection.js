import { Box, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import ProjectCard from "components/common/ProjectCard";
import { MOCKUP_PROJECT_LIST } from "constants/mockups/project";
import { useState } from "react";

function FavoriteListSection() {
  const [data, setData] = useState(MOCKUP_PROJECT_LIST);

  return (
    <Box as="section">
      <VStack spacing="40px">
        <SimpleGrid columns={3} spacing="24px" w="100%">
          {data.content.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              title={project.title}
              subject={project.subject}
              photoUrl={project.photoUrl}
              startDate={project.startDate}
              authorName={project.author.name}
              authorPhotoUrl={project.author.photoUrl}
              curPeopleCount={project.approvalCount}
              maxPeopleCount={project.capacity}
              skills={project.skills}
            />
          ))}
        </SimpleGrid>

        <Button size="lg">더 불러오기</Button>
      </VStack>
    </Box>
  );
}

export default FavoriteListSection;
