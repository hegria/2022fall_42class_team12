import { Center, Heading, HStack, IconButton, SimpleGrid } from "@chakra-ui/react";
import ProjectCard from "components/common/ProjectCard";
import { MOCKUP_PROJECT_LIST } from "constants/mockups/project";
import { RepeatIcon } from "@chakra-ui/icons";
import HomeSectionLayout from "components/pages/home/HomeSectionLayout";
import { useCallback, useEffect, useState } from "react";
import { serverAxios } from "utils/axios";

function RandomProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await serverAxios.get("/projects/random?count=3");
      setProjects(res.data.content);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRandomProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeSectionLayout>
      <HStack spacing="16px" marginBottom="40px">
        <Heading size="lg">랜덤 모집글</Heading>
        <IconButton
          icon={<RepeatIcon />}
          size="sm"
          isRound
          aria-label="랜덤 모집글 다시 받아오기"
          onClick={fetchRandomProjects}
        />
      </HStack>

      {!loading && projects.length === 0 ? (
        <Center>등록된 게시물이 없습니다.</Center>
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

export default RandomProjectsSection;
