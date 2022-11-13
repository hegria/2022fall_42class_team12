import { EmailIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  HStack,
  Tag,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import useMe from "components/hooks/useMe";
import useUser from "components/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";

function UserInfoSection() {
  const router = useRouter();

  const { data, loading } = useUser(router.query.id);
  const { user } = useMe();
  const mine = user?.userId === data?.userId ?? false;

  if (loading) return "loading...";
  return (
    <Box as="section" marginTop="80px">
      <Container maxW="container.md" paddingY="80px">
        <Center flexDirection="column" rowGap="24px">
          <Avatar size="2xl" src={data.photoUrl} />

          <VStack spacing="8px">
            <Text fontSize="24px" fontWeight="bold">
              {data.name}
            </Text>
            <Text fontSize="14px" fontWeight="bold" color="gray.700">
              {data.department}
            </Text>
            <Text fontSize="16px" color="gray.700">
              {data.introduction}
            </Text>
          </VStack>

          <Wrap justify="center">
            {data.skills.map((skill, idx) => (
              <Tag key={idx}>{skill}</Tag>
            ))}
          </Wrap>

          <VStack spacing="4px">
            <HStack spacing="8px">
              <EmailIcon w="16px" h="16px" />
              <Text fontSize="14px">{data.email}</Text>
            </HStack>

            {data.personalLink && (
              <HStack spacing="8px">
                <InfoIcon w="16px" h="16px" />
                <Text fontSize="14px">{data.personalLink}</Text>
              </HStack>
            )}
          </VStack>

          {mine && (
            <Link href="/account" passHref>
              <Button as="a" colorScheme="gray">
                프로필 수정하기
              </Button>
            </Link>
          )}
        </Center>
      </Container>
    </Box>
  );
}

export default UserInfoSection;
