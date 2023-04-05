import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchOverlay from "./SearchOverlay";
import Subscribe from "./Subscribe";
import GridContainer from "./GridContainer";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ColorThief from "colorthief";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

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
  const firstThreeItems = blogs.slice(0, 3);
  const everythingElse = blogs.slice(3);

  const [bgColors, setBgColors] = useState(
    Array(firstThreeItems.length).fill("#ffffff")
  );

  useEffect(() => {
    firstThreeItems.forEach((item, index) => {
      const img = new Image();
      img.src = item.imageUrl;
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const pastelColor = dominantColor.map((color) =>
          Math.floor((color + 255) / 2)
        );
        setBgColors((prevBgColors) => {
          const newBgColors = [...prevBgColors];
          newBgColors[index] = `rgb(${pastelColor.join(", ")})`;
          return newBgColors;
        });
      };
    });
  }, [blogs]);

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
      <SliderContainer>
        {!!firstThreeItems.length && (
          <Carousel
            key="carousel"
            transitionTime={500}
            swipeScrollDuration={1000}
            emulateTouch={true}
            swipeable={true}
            showThumbs={false}
            showStatus={false}
            useKeyboardArrows={false}
            showArrows={true}
            renderArrowPrev={(clickHandler, hasPrev) => {
              return (
                <ArrowPrevContainer hasPrev={hasPrev} onClick={clickHandler}>
                  <LeftIcon />
                </ArrowPrevContainer>
              );
            }}
            renderArrowNext={(clickHandler, hasNext) => {
              return (
                <ArrowNextContainer hasNext={hasNext} onClick={clickHandler}>
                  <RightIcon />
                </ArrowNextContainer>
              );
            }}
          >
            {firstThreeItems.map((blog, index) => {
              return (
                <SliderComponent style={{ backgroundColor: bgColors[index] }}>
                  <TextBox>
                    <SubTitle style={{ marginTop: 0 }}>
                      <SubtitleSpan>{blog.genre.toUpperCase()}</SubtitleSpan>
                    </SubTitle>
                    <Link to={`/article/${blog._id}`} style={{ all: "unset" }}>
                      <ArticleTitle>{blog.title}</ArticleTitle>
                    </Link>

                    <SubTitleAuthor>
                      <SubtitleSpan>
                        BY {blog.author.toUpperCase()}
                      </SubtitleSpan>
                    </SubTitleAuthor>
                  </TextBox>
                  <ImgContainer>
                    <StyledImg
                      key={index}
                      src={blog.imageUrl}
                      alt="article context"
                    ></StyledImg>
                  </ImgContainer>
                </SliderComponent>
              );
            })}
          </Carousel>
        )}
      </SliderContainer>
      <SubHeader>LATEST</SubHeader>
      <ArticleContainer>
        <GridContainer showGenre={true} blogs={everythingElse} />
      </ArticleContainer>
    </StyledHome>
  );
}
const ArrowNextContainer = styled.div`
  position: absolute;
  visibility: ${(props) => (props.hasNext ? "visible" : "hidden")};
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;

  cursor: pointer;
  z-index: 20;
  /* &:hover {
    opacity: 1;
  } */
`;

const RightIcon = styled(MdKeyboardArrowRight)`
  width: 2.25rem; /* w-9 */
  height: 2.25rem; /* h-9 */
  color: rgba(0, 0, 0, 0.3);
  :hover {
    color: #000000;
    border: 1px solid #000000;
  }
`;
const LeftIcon = styled(MdKeyboardArrowLeft)`
  width: 2.25rem; /* w-9 */
  height: 2.25rem; /* h-9 */
  color: rgba(0, 0, 0, 0.3);
  :hover {
    color: #000000;
    border: 1px solid #000000;
  }
`;
const ArrowPrevContainer = styled.div`
  position: absolute;
  visibility: ${(props) => (props.hasPrev ? "visible" : "hidden")};
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;

  cursor: pointer;
  z-index: 20;
  /* &:hover {
    opacity: 1;
  } */
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 55%;
`;
const SubHeader = styled.h2`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 41px;
  margin: 40px auto;
  width: 80%;
`;
const SliderComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 936px;
  background-color: white;
  flex-wrap: nowrap;
  width: 100%;
`;
const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
`;
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
  width: 85% !important;
  height: 90% !important;
  object-fit: cover;
`;
const ArticleContainer = styled.div`
  display: block;
  width: 83%;
  margin: 0 auto;
`;
const CaptionBox = styled.div`
  width: 360px;

  padding: 20px;
`;
const StyledHome = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ArticleTitle = styled.h1`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  width: 70%;
  text-align: center;
  line-height: 84px;
  /* or 117% */
  margin: 0 auto;
  letter-spacing: -0.05em;
  color: black;
  z-index: 1;
  :hover {
    text-decoration: underline;
  }
`;
const SubtitleSpan = styled.span`
  position: relative;
  z-index: 1;
`;

const SubTitle = styled.p`
  font-family: "InterstateMono";
  font-family: "Avenir";
  font-style: normal;
  font-weight: 800;
  font-size: 14px;

  font-style: normal;
  line-height: 22px;
  margin-top: 30px;
  margin-bottom: 0;
  color: black;
`;
const SubTitleAuthor = styled(SubTitle)`
  font-weight: 400;
  font-size: 14px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding-left: 40px;
  gap: 20px;
`;
export default Home;
