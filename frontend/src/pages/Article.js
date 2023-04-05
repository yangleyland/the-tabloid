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
  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
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
      {loadStatus && (
        <TitleContainer>
          <StyledDate>
            {blogs.genre}{" "}
            <span style={{ fontWeight: "400" }}>
              - {formatDate(new Date(blogs.date))}
            </span>
          </StyledDate>
          <StyledTitle>{blogs.title}</StyledTitle>
          <StyledSubtitle>
            Rihanna and A$AP finally declare it official. Here’s how it went
            down
          </StyledSubtitle>
        </TitleContainer>
      )}

      <img
        style={loadStatus ? {} : { display: "none" }}
        onLoad={() => setLoadStatus(true)}
        width="100%"
        src={blogs.imageUrl}
        alt="article context"
      ></img>
      {loadStatus && (
        <>
          <StyledAuthor>BY: {blogs.author}</StyledAuthor>
          <StyledBody>{renderOutput()}</StyledBody>
        </>
      )}
    </StyledArticle>
  );
}
const StyledSubtitle = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;

  color: #000000;
`;
const TitleContainer = styled.div`
  margin-top: 30px;
`;
const StyledDate = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  color: #000000;
`;
const StyledBody = styled.p`
font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 25px;

`;
const StyledAuthor = styled.p`
font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 22px;
/* identical to box height */
text-align: left;
width: 100%;
letter-spacing: 0.12em;
text-transform: uppercase;

color: #000000;
`;
const StyledTitle = styled.h1`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  line-height: 72px;
  /* identical to box height, or 129% */

  letter-spacing: -0.05em;
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
