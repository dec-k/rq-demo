import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Person } from "../types/Person";

export const JobCard = (props: { id: string }) => {
  // Make sure that the first argument of useQuery is unique across components.
  const query = useQuery<Person, Error>(["person", props.id], async () => {
    const resp = await fetch(
      `https://65665d9d64fcff8d730eba5e.mockapi.io/api/users/${props.id}`
    );

    if (!resp.ok) {
      throw new Error("Network request failed.");
    }

    return resp.json();
  });

  return (
    <Card>
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {!query.isLoading ? (
              <>
                <Avatar src={query.data?.avatar} />
                <Box>
                  <Heading size="sm">{query.data?.name}</Heading>
                  <Text>{query.data?.title}</Text>
                </Box>
              </>
            ) : (
              <Spinner />
            )}
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};
