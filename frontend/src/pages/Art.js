import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GridContainer from "./GridContainer";
import LineContainer from "./LineContainer";
import SearchOverlay from "./SearchOverlay";
import Subscribe from "./Subscribe";

function Art({
  blogs,
  isSearchOpen,
  searchBlogs,
  onSearchClick,
  isSubscribeOpen,
  onSubscribeClick,
}) {
  const filteredBlogs = blogs.filter((blog) => blog.genre === "art");
  return (
    <StyledArt>
      <SearchOverlay
        searchBlogs={searchBlogs}
        blogs={blogs}
        isSearchOpen={isSearchOpen}
        onSearchClick={onSearchClick}
      />
      <Subscribe
        isSubscribeOpen={isSubscribeOpen}
        onSubscribeClick={onSubscribeClick}
      />

      <Header>Art</Header>
      <LineContainer blogs={filteredBlogs} />
    </StyledArt>
  );
}

const Header = styled.h1`
  font-family: "Didot";
  text-align: left;
  padding: 20px;
  width: 800px;
  margin: 0 auto;
  font-size: 4em;
`;

const StyledArt = styled.div`

`;

export default Art;
