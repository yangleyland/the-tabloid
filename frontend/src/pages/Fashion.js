import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GridContainer from "./GridContainer";
import SearchOverlay from "./SearchOverlay";
import Subscribe from "./Subscribe";
import LineContainer from "./LineContainer";

function Fashion({
  blogs,
  isSearchOpen,
  searchBlogs,
  onSearchClick,
  isSubscribeOpen,
  onSubscribeClick,
}) {
  const filteredBlogs = blogs.filter((blog) => blog.genre === "fashion");
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
      <Header>Fashion</Header>
      <LineContainer blogs={filteredBlogs} />
    </StyledFashion>
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

const StyledFashion = styled.div`
  padding: 50px;
`;

export default Fashion;
