import { Button, Container, Flex, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { serverAxios } from "utils/axios";

function LoginSection() {
  const { register, handleSubmit } = useForm();

  const toast = useToast();

  // const [setCookie] = useCookies(["jwt"]);

  const onSubmit = async (data) => {
    const reqBody = data;

    try {
      const res = await serverAxios.post("/users/login", reqBody);

      if (res.data.success) {
        toast.closeAll();
        document.cookie = `jwt=${res.data.token};`;
        Router.push("/");
      } else {
        toast({
          title: "로그인 실패",
          description: `${res.data.reason}??`,
          status: "error",
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: "로그인 실패",
        description: e.response?.data?.reason ?? e.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container position="relative" maxW="480px" paddingY="40px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" alignItems="center">
          <Container marginBottom="60px">
            <FormControl marginBottom="16px">
              <FormLabel>아이디</FormLabel>
              <Input type="text" bg="white" {...register("id", { required: true })} />
            </FormControl>

            <FormControl>
              <FormLabel>비밀번호</FormLabel>
              <Input type="password" bg="white" {...register("password", { required: true })} />
            </FormControl>
          </Container>

          <Container>
            <Button type="submit" width="100%" height="40px" marginBottom="16px">
              로그인
            </Button>

            <Link href="/register" passHref>
              <Button
                as="a"
                colorScheme="gray"
                variant="outline"
                width="100%"
                height="40px"
                marginBottom="16px"
              >
                회원가입
              </Button>
            </Link>
          </Container>
        </Flex>
      </form>
    </Container>
  );
}

export default LoginSection;
