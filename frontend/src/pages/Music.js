import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GridContainer from "./GridContainer";
import SearchOverlay from "./SearchOverlay";
import Subscribe from "./Subscribe";

function Music({
  blogs,
  isSearchOpen,
  searchBlogs,
  onSearchClick,
  isSubscribeOpen,
  onSubscribeClick,
}) {
  const filteredBlogs = blogs.filter((blog) => blog.genre === "music");
  return (
    <StyledFashion>
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
      <Header>Music</Header>
      <GridContainer blogs={filteredBlogs} />
    </StyledFashion>
  );
}
const Header = styled.h1`
  font-family: "Didot";
  text-align: left;
  padding: 20px;
  font-size: 4em;
`;

const StyledFashion = styled.div`
  padding: 50px;
`;

export default Music;
