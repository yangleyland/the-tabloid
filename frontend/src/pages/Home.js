import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchOverlay from "./SearchOverlay";
import Subscribe from "./Subscribe";
import GridContainer from "./GridContainer";

function Home({
  blogs,
  isSearchOpen,
  searchBlogs,
  onSearchClick,
  isSubscribeOpen,
  onSubscribeClick,
}) {
  function compareDates(obj1, obj2) {
    const date1 = new Date(obj1.date);
    const date2 = new Date(obj2.date);
  
    if (date1 > date2) {
      return -1;
    } else if (date1 < date2) {
      return 1;
    } else {
      return 0;
    }
  }
  
  // const sortedBlogs = blogs.sort(compareDates).sort((a, b) => b.featured - a.featured);
  const firstTwoItems = blogs.slice(0, 2);
  const everythingElse = blogs.slice(2);
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
      <FrontPage>
        {firstTwoItems.map((blog, index) => {
          if (index < 1) {
            // Display the first three elements differently
            return (
              <LeftHalf>
                <Link to={`/article/${blog._id}`} style={{ all: "unset" }}>
                  <StyledImg
                    width="560px"
                    src={blog.imageUrl}
                    alt="article context"
                  ></StyledImg>
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
                  <StyledImg
                    width="400px"
                    src={blog.imageUrl}
                    alt="article context"
                  ></StyledImg>
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

                    <ArticleTitle
                      style={{ textAlign: "left", fontSize: "32px" }}
                    >
                      {blog.title}
                    </ArticleTitle>
                  </CaptionBox>
                </Link>
              </RightHalf>
            );
          }
        })}
      </FrontPage>

      <ArticleContainer>
        <GridContainer blogs={everythingElse} />
      </ArticleContainer>
    </StyledHome>
  );
}
const FrontPage = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 1270px) {
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
`;
const StyledImg = styled.img`
  border-radius: 7px;
  :hover {
    -webkit-filter: brightness(70%);
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
`;
const ArticleContainer = styled.div`
  display: block;
  padding: 73px;
`;
const CaptionBox = styled.div`
  width: 360px;

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
  width: 47%;
  display: flex;
  justify-content: center;
`;
const RightHalf = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding-right: 73px;
  @media (max-width: 1270px) {
    padding: 0;
    justify-content: center;
    align-items: center;
  }
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
