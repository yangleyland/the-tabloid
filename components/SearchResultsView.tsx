"use client";

import styled from "styled-components";
import type { SearchPost } from "@/lib/types";
import GridContainer from "./GridContainer";
import PageOverlays from "./PageOverlays";

export default function SearchResultsView({
  results,
}: {
  results: SearchPost[];
}) {
  return (
    <StyledSearchResults>
      <PageOverlays />
      <Header>Search</Header>
      {results.length > 0 ? (
        <GridContainer showGenre={true} blogs={results} />
      ) : (
        <p>0 Search Results</p>
      )}
    </StyledSearchResults>
  );
}

const Header = styled.h1`
  font-family: "Didot";
  text-align: left;
  padding: 20px;
  font-size: 4em;
`;
const StyledSearchResults = styled.div`
  padding: 50px;
`;
