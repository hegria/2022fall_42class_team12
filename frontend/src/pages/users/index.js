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
import { MOCKUP_USER_LIST } from "constants/mockups/users";
import UserCard from "components/common/UserCard";
import useUsers from "components/hooks/useUsers";
import { PAGE_SIZE } from "constants/list";
import { useState } from "react";

function UserPage() {
  const [keywordInput, setKeywordInput] = useState("");

  // TODO: Debouncing
  const { users, size, setSize, initialLoading, loadingMore, empty, reachingEnd } = useUsers({
    pageSize: PAGE_SIZE,
    keyword: keywordInput,
  });

  return (
    <HomeSectionLayout>
      <Center>
        <Heading marginTop="60px" marginBottom="60px">
          가입한 유저 둘러보기
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
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              variant="filled"
              placeholder="검색어를 입력하세요"
              w="800px"
            />
          </InputGroup>
        </Center>
      </Center>
      <VStack spacing="40px">
        {!initialLoading && empty ? (
          <Center>등록된 모집글이 없습니다.</Center>
        ) : (
          <SimpleGrid columns={3} spacing="24px">
            {users.map((user) => (
              <UserCard
                key={user.userId}
                userId={user.userId}
                profimg={user.photoUrl}
                name={user.name}
                department={user.department}
                skills={user.skills}
                intro={user.introduction}
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

export default UserPage;
