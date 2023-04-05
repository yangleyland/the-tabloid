import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GridContainer from "./GridContainer";
import styled from "styled-components";
import SearchOverlay from "./SearchOverlay";
import Subscribe from "./Subscribe";
import axios from "axios";
import { useParams } from "react-router-dom";

function SearchResults({
  blogs,
  isSearchOpen,
  searchBlogs,
  onSearchClick,
  isSubscribeOpen,
  onSubscribeClick,
}) {
  //new code
  const [searched, setSearched] = useState(false);
  const [searchBlog, setSearchBlog] = useState({});

  const { id } = useParams();
  useEffect(() => {
    
    axios
      .post("http://localhost:3200/search", { query: id })
      .then((response) => {
        setSearchBlog(response.data);
        console.log("response data:", response.data);
        console.log("blogs:", blogs);
        searchBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <StyledSearchResults>
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
      <Header>Search</Header>

      {(searchBlog.length>0) ?
        <GridContainer showGenre={true} blogs={searchBlog} />
        :
        <p>0 Search Results</p>
      }
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

export default SearchResults;
