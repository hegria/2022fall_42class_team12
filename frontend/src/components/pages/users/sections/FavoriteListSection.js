import { Box, Button, Center, SimpleGrid, VStack } from "@chakra-ui/react";
import ProjectCard from "components/common/ProjectCard";
import useMe from "components/hooks/useMe";
import useRecruitments from "components/hooks/useRecruitments";
import { PAGE_SIZE } from "constants/list";

function FavoriteListSection() {
  const { user } = useMe();
  const { recruitments, size, setSize, initialLoading, loadingMore, empty, reachingEnd } =
    useRecruitments({
      pageSize: PAGE_SIZE,
      userId: user?.userId,
      isFavorite: true,
    });

  return (
    <Box as="section">
      <VStack spacing="40px">
        {!initialLoading && empty ? (
          <Center>즐겨찾기한 모집글이 없습니다.</Center>
        ) : (
          <SimpleGrid columns={3} spacing="24px" w="100%">
            {recruitments.map((project) => (
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
        )}
        <Button onClick={() => setSize(size + 1)} size="lg" disabled={loadingMore || reachingEnd}>
          {loadingMore ? "불러오는 중..." : reachingEnd ? "데이터 없음" : "더 불러오기"}
        </Button>
      </VStack>
    </Box>
  );
}

export default FavoriteListSection;
