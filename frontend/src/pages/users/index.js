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

function UserPage() {
  return (
    <HomeSectionLayout>
      <Center>
        <Heading marginTop="60px" marginBottom="60px">
          가입한 유저 둘러보기
        </Heading>
      </Center>
      <Center>
        <Center>
          <InputGroup marginBottom="100px">
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="gray.500" />}
            />
            <Input variant="filled" placeholder="    검색어를 입력하세요" size="lg" w="800px" />
          </InputGroup>
        </Center>
      </Center>
      <VStack spacing="40px">
        <SimpleGrid columns={3} spacing="24px">
          {MOCKUP_USER_LIST.map((user, index) => (
            <UserCard
              key={index}
              profimg={user.profimg}
              name={user.name}
              department={user.department}
              skills={user.skills}
              intro={user.intro}
            />
          ))}
        </SimpleGrid>
        <Button size="lg">더 불러오기</Button>
      </VStack>
    </HomeSectionLayout>
  );
}

export default UserPage;
