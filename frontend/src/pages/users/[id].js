import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AppliedListSection from "components/pages/users/sections/AppliedListSection";
import AuthorListSection from "components/pages/users/sections/AuthorListSection";
import FavoriteListSection from "components/pages/users/sections/FavoriteListSection";
import UserInfoSection from "components/pages/users/sections/UserInfoSection";
import { useRouter } from "next/router";

function UserDetailPage() {
  const router = useRouter();

  return (
    <>
      <UserInfoSection />

      <Container maxW="container.xl" paddingBottom="80px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>작성한 모집글</Tab>
            <Tab>즐겨찾기한 모집글</Tab>
            <Tab>신청한 모집글</Tab>
          </TabList>

          <TabPanels>
            <TabPanel paddingX="0">
              <AuthorListSection userId={router.query.id} />
            </TabPanel>
            <TabPanel paddingX="0">
              <FavoriteListSection userId={router.query.id} />
            </TabPanel>
            <TabPanel paddingX="0">
              <AppliedListSection userId={router.query.id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}

export default UserDetailPage;
