import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AppliedListSection from "components/pages/users/sections/AppliedListSection";
import FavoriteListSection from "components/pages/users/sections/FavoriteListSection";
import OngoingListSection from "components/pages/users/sections/OngoingListSection";
import UserInfoSection from "components/pages/users/sections/UserInfoSection";

function UserDetailPage() {
  return (
    <>
      <UserInfoSection />

      <Container maxW="container.xl" paddingBottom="80px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>즐겨찾기한 모집글</Tab>
            <Tab>참여 중인 모집글</Tab>
            <Tab>신청한 모집글</Tab>
          </TabList>

          <TabPanels>
            <TabPanel paddingX="0">
              <FavoriteListSection />
            </TabPanel>
            <TabPanel paddingX="0">
              <OngoingListSection />
            </TabPanel>
            <TabPanel paddingX="0">
              <AppliedListSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}

export default UserDetailPage;
