"use client";

import { getColorSync } from "colorthief";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import type { Post } from "@/lib/types";
import GridContainer from "./GridContainer";
import PageOverlays from "./PageOverlays";

export default function HomeView({ blogs }: { blogs: Post[] }) {
  const firstThreeItems = blogs.slice(0, 3);
  const everythingElse = blogs.slice(3);
  const [bgColors, setBgColors] = useState<string[]>([]);
  const featuredImages = firstThreeItems
    .map((blog) => blog.imageUrl)
    .join("\n");

  useEffect(() => {
    const images = featuredImages ? featuredImages.split("\n") : [];
    const loaders = images.map((src, index) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const dominant = getColorSync(img);
        if (!dominant) return;
        const pastel = dominant
          .array()
          .map((channel) => Math.floor((channel + 255) / 2));
        setBgColors((previous) => {
          const next = [...previous];
          next[index] = `rgb(${pastel.join(", ")})`;
          return next;
        });
      };
      img.src = src;
      return img;
    });
    return () => {
      for (const img of loaders) img.onload = null;
    };
  }, [featuredImages]);

  return (
    <StyledHome>
      <PageOverlays />
      <SliderContainer>
        {firstThreeItems.length > 0 && (
          <Carousel
            key="carousel"
            transitionTime={500}
            emulateTouch={true}
            swipeable={true}
            showThumbs={false}
            showStatus={false}
            useKeyboardArrows={false}
            showArrows={true}
            renderArrowPrev={(clickHandler, hasPrev) => (
              <ArrowPrevContainer $hasPrev={hasPrev} onClick={clickHandler}>
                <LeftIcon />
              </ArrowPrevContainer>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <ArrowNextContainer $hasNext={hasNext} onClick={clickHandler}>
                <RightIcon />
              </ArrowNextContainer>
            )}
          >
            {firstThreeItems.map((blog, index) => (
              <SliderComponent
                key={blog._id}
                style={{ backgroundColor: bgColors[index] ?? "#ffffff" }}
              >
                <TextBox>
                  <SubTitle style={{ marginTop: 0 }}>
                    <SubtitleSpan>{blog.genre.toUpperCase()}</SubtitleSpan>
                  </SubTitle>
                  <Link href={`/article/${blog._id}`} style={{ all: "unset" }}>
                    <ArticleTitle>{blog.title}</ArticleTitle>
                  </Link>
                  <SubTitleAuthor>
                    <SubtitleSpan>BY {blog.author.toUpperCase()}</SubtitleSpan>
                  </SubTitleAuthor>
                </TextBox>
                <ImgContainer>
                  <StyledImg src={blog.imageUrl} alt="article context" />
                </ImgContainer>
              </SliderComponent>
            ))}
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

const ArrowNextContainer = styled.div<{ $hasNext: boolean }>`
  position: absolute;
  visibility: ${(props) => (props.$hasNext ? "visible" : "hidden")};
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  cursor: pointer;
  z-index: 20;
`;
const RightIcon = styled(MdKeyboardArrowRight)`
  width: 2.25rem;
  height: 2.25rem;
  color: rgba(0, 0, 0, 0.3);
  &:hover {
    color: #000000;
    border: 1px solid #000000;
  }
`;
const LeftIcon = styled(MdKeyboardArrowLeft)`
  width: 2.25rem;
  height: 2.25rem;
  color: rgba(0, 0, 0, 0.3);
  &:hover {
    color: #000000;
    border: 1px solid #000000;
  }
`;
const ArrowPrevContainer = styled.div<{ $hasPrev: boolean }>`
  position: absolute;
  visibility: ${(props) => (props.$hasPrev ? "visible" : "hidden")};
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  cursor: pointer;
  z-index: 20;
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
  margin: 0 auto;
  letter-spacing: -0.05em;
  color: black;
  z-index: 1;
  &:hover {
    text-decoration: underline;
  }
`;
const SubtitleSpan = styled.span`
  position: relative;
  z-index: 1;
`;
const SubTitle = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 22px;
  margin-top: 30px;
  margin-bottom: 0;
  color: black;
`;
const SubTitleAuthor = styled(SubTitle)`
  font-weight: 400;
  font-size: 14px;
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
