import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchOverlay from "./SearchOverlay";
import Subscribe from "./Subscribe";

function Home({
  blogs,
  isSearchOpen,
  searchBlogs,
  onSearchClick,
  isSubscribeOpen,
  onSubscribeClick,
}) {
  console.log(blogs);
  const sortedBlogs = blogs.sort((a, b) => b.featured - a.featured);
  const firstTwoItems = sortedBlogs.slice(0, 2);
  const everythingElse = sortedBlogs.slice(2);
  return (
    <StyledHome>
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
      {/* {(sortedBlogs[0]&&sortedBlogs[1]) ? (
        <>
          <LeftHalf>
            <Link to={`/article/${blogs[0]._id}`} style={{ all: "unset" }}>
              <img
                width="560px"
                src={blogs[0].imageUrl}
                alt="article context"
              ></img>
              <TextBox>
                <SubTitle>{blogs[0].genre.toUpperCase()}</SubTitle>
                <ArticleTitle>{blogs[0].title}</ArticleTitle>
                <SubTitle>BY: {blogs[0].author.toUpperCase()}</SubTitle>
              </TextBox>
            </Link>
          </LeftHalf>

          <RightHalf>
            <Link to={`/article/${blogs[1]._id}`} style={{ all: "unset" }}>
              <img
                width="400px"
                src={blogs[1].imageUrl}
                alt="article context"
              ></img>
              <CaptionBox>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <SubTitle>{blogs[0].genre.toUpperCase()}</SubTitle>
                  <SubTitle>BY: {blogs[0].author.toUpperCase()}</SubTitle>
                </div>

                <ArticleTitle style={{ textAlign: "left", fontSize: "32px" }}>
                  {blogs[0].title}
                </ArticleTitle>
              </CaptionBox>
            </Link>
          </RightHalf>
        </>
      ) : (
        <p></p>
      )} */}
      {firstTwoItems.map((blog, index) => {
        if (index < 1) {
          // Display the first three elements differently
          return (
            <LeftHalf>
              <Link to={`/article/${blog._id}`} style={{ all: "unset" }}>
                <img
                  width="560px"
                  src={blog.imageUrl}
                  alt="article context"
                ></img>
                <TextBox>
                  <SubTitle>{blog.genre.toUpperCase()}</SubTitle>
                  <ArticleTitle>{blog.title}</ArticleTitle>
                  <SubTitle>BY: {blog.author.toUpperCase()}</SubTitle>
                </TextBox>
              </Link>
            </LeftHalf>
          );
        } else if (index < 2) {
          return (
            <RightHalf>
              <Link to={`/article/${blog._id}`} style={{ all: "unset" }}>
                <img
                  width="400px"
                  src={blog.imageUrl}
                  alt="article context"
                ></img>
                <CaptionBox>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <SubTitle>{blog.genre.toUpperCase()}</SubTitle>
                    <SubTitle>BY: {blog.author.toUpperCase()}</SubTitle>
                  </div>

                  <ArticleTitle style={{ textAlign: "left", fontSize: "32px" }}>
                    {blog.title}
                  </ArticleTitle>
                </CaptionBox>
              </Link>
            </RightHalf>
          );
        }
      })}
      <ArticleContainer>
        {everythingElse.map((blog) => (
          <h2>
            <Link to={`/article/${blog._id}`}>{blog.title}</Link>
          </h2>
        ))}
      </ArticleContainer>
    </StyledHome>
  );
}
const ArticleContainer = styled.div`
    display: block;
    padding-left: 20px;
`;
const CaptionBox = styled.div`
  width: 360px;
  height: 300px;
  padding: 20px;
`;
const StyledHome = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ArticleTitle = styled.p`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  /* or 117% */
  margin: 0;
  letter-spacing: -0.05em;
`;
const SubTitle = styled.p`
  font-family: "InterstateMono";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin: 0;
`;

const LeftHalf = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
`;
const RightHalf = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding-right: 73px;
`;
const TextBox = styled.div`
  position: absolute;
  width: 446px;
  height: 238px;
  left: 264px;
  top: 575px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  background-color: white;
  padding-left: 20px;
`;
export default Home;
