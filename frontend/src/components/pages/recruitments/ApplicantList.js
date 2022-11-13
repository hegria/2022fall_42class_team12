import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { APPLICATION_STATUS } from "components/pages/recruitments/sections/RecruitmentDetailSection";
import useApplication from "hooks/useApplication";
import Link from "next/link";
import { useCallback } from "react";
import { getAuthHeader } from "utils/auth";
import { serverAxios } from "utils/axios";

function ApplicantList({ projectId }) {
  const { data, mutate, loading } = useApplication(projectId);

  const handleClickManageButton = useCallback(
    async (applicationId, status) => {
      try {
        await serverAxios.patch(
          `/applications/${applicationId}`,
          { projectId, status },
          getAuthHeader()
        );
        mutate();
      } catch (e) {
        console.log(e);
      }
    },
    [projectId, mutate]
  );

  if (loading) return "loading...";
  return (
    <TableContainer w="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>신청자</Th>
            <Th textAlign="end" w="100px">
              상태
            </Th>
            <Th textAlign="end" w="200px">
              관리
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.content.length === 0 ? (
            <Tr>
              <Td colSpan={3}>신청자가 없습니다.</Td>
            </Tr>
          ) : (
            data.content.map((application) => (
              <Tr key={application.id}>
                <Td>
                  <Link href={`/users/${application.author.id}`} passHref>
                    <Button
                      as="a"
                      target="_blank"
                      variant="ghost"
                      colorScheme="gray"
                      columnGap="12px"
                    >
                      <Avatar size="sm" src={application.author.photoUrl} />
                      <Text>{application.author.name}</Text>
                      <ExternalLinkIcon />
                    </Button>
                  </Link>
                </Td>
                <Td textAlign="end">{APPLICATION_STATUS[application.status]}</Td>
                <Td textAlign="end">
                  {application.status === "waiting" && (
                    <>
                      <Button
                        size="sm"
                        marginRight="8px"
                        onClick={() => handleClickManageButton(application.id, "approved")}
                      >
                        승인
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleClickManageButton(application.id, "rejected")}
                      >
                        거절
                      </Button>
                    </>
                  )}
                  {application.status === "approved" && (
                    <Button
                      size="sm"
                      marginRight="8px"
                      onClick={() => handleClickManageButton(application.id, "waiting")}
                      variant="outline"
                    >
                      승인 취소
                    </Button>
                  )}
                  {application.status === "rejected" && (
                    <Button
                      size="sm"
                      marginRight="8px"
                      onClick={() => handleClickManageButton(application.id, "waiting")}
                      variant="outline"
                      colorScheme="red"
                    >
                      거절 취소
                    </Button>
                  )}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ApplicantList;
