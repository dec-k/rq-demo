import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";
import { JobCard } from "./components/JobCard";
import { useIsFetching } from "react-query";

function App() {
  const [ids, setIds] = useState<number[]>([]);

  // useIsFetching monitors any queries in the client cache with the given key.
  // This can be used to track loading across components without prop drilling or stores.
  const isFetchingPerson = useIsFetching({ queryKey: ["person"] });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Stack sx={{ m: 12, maxWidth: "960px", alignSelf: "center" }}>
        {/* Infobox */}
        <Alert status="info">
          <AlertIcon />
          This is a small demo app showing basic functionality of react-query.
          This page includes stale reloading, retry management, and
          self-contained component state.
        </Alert>

        {/* Load control */}
        <Button
          isLoading={Boolean(isFetchingPerson)}
          loadingText={`Processing ${isFetchingPerson} ${
            isFetchingPerson > 1 ? "queries..." : "query."
          }`}
          onClick={() => {
            const idsCopy = [...ids];
            // Pick a random number between 1-100 to use as an ID.
            idsCopy.push(Math.floor(Math.random() * 100) + 1);
            setIds(idsCopy);
          }}
        >
          Load Next Person
        </Button>

        {/* Data map */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {ids.map((id) => (
            <GridItem sx={{ h: "100%", w: "100%" }}>
              <JobCard key={id} id={id.toString()} />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </div>
  );
}

export default App;
