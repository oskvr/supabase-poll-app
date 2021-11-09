import PageSpinner from "@/components/PageSpinner";
import { PollSearchResult } from "@/lib/models/poll";
import { searchPollAsync } from "@/lib/supabaseStore";
import { Box, Heading, List, Text, VStack } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PollListItem } from "..";

export default function Index() {
  const router = useRouter();
  const query = router.query;
  const [results, setResults] = useState<PollSearchResult>();
  useEffect(() => {
    if (query.title) {
      setResultsAsync(query.title as string);
    }
  }, [query]);

  async function setResultsAsync(searchQuery: string) {
    const result: any = await searchPollAsync(searchQuery);
    setResults(result);
  }

  function ResultsText() {
    return (
      <Box py="10">
        <Heading>
          {results ? results.length : 0}{" "}
          {results?.length === 1 ? "result" : "results"} found for{" "}
          <Text as="span" color="blue.500" fontWeight="thin">
            {query.title}
          </Text>
        </Heading>
      </Box>
    );
  }
  if (!results) {
    <PageSpinner />;
  }
  if (results?.length === 0) {
    return (
      <VStack py="10" spacing="10">
        <ResultsText />
        <img width="300" src="/undraw_search.svg" alt="No results found" />
      </VStack>
    );
  }
  return (
    <Box maxW="container.lg" mx="auto">
      <ResultsText />
      <List>
        {results?.map((result) => (
          <PollListItem poll={result} key={result.id} />
        ))}
      </List>
    </Box>
  );
}
