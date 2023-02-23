import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";
import Subscribe from "./Subscribe";

function Article({
  blogSet,
  isSearchOpen,
  searchBlogs,
  onSearchClick,
  isSubscribeOpen,
  onSubscribeClick,
}) {
  const [loadStatus, setLoadStatus] = useState(false);
  const [blogs, setBlogs] = useState({});
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3200/${id}`)
      .then((response) => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  //not sure if this is right
  function renderOutput() {
    if (typeof blogs.body === "string") {
      const paragraphs = blogs.body.split("\n");
      return paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ));
    }
  }
  let navigate = useNavigate();
  const handleDelete = async () => {
    let path = `/`;
    navigate(path);
    axios
      .delete(`http://localhost:3200/blogs/${id}`)
      .then((response) => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <StyledArticle>
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
      {loadStatus && <StyledTitle>{blogs.title}</StyledTitle>}

      <img
        style={loadStatus ? {} : { display: "none" }}
        onLoad={() => setLoadStatus(true)}
        width="500px"
        src={blogs.imageUrl}
        alt="article context"
      ></img>
      {loadStatus && (
        <>
          <StyledAuthor>By: {blogs.author}</StyledAuthor>
          <StyledBody>{renderOutput()}</StyledBody>
        </>
      )}
    </StyledArticle>
  );
}
const StyledBody = styled.p`
  font-family: "Didot";
  font-size: 1.2em;
`;
const StyledAuthor = styled.p`
  font-family: "Didot";
  font-style: normal;
  font-size: 1.2em;
  width: 100%;
`;
const StyledTitle = styled.h1`
  font-family: "Didot";
  font-style: normal;
`;
const StyledArticle = styled.div`
  margin: 0 auto;

  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export default Article;
