"use client";

import { useCallback, useState } from "react";
import styled from "styled-components";
import type { Post } from "@/lib/types";
import { useLoadedImageRef } from "@/lib/use-image-loaded";
import LocalDate from "./LocalDate";
import PageOverlays from "./PageOverlays";

export default function ArticleView({ blog }: { blog: Post | null }) {
  const [loadStatus, setLoadStatus] = useState(false);
  const markLoaded = useCallback(() => setLoadStatus(true), []);
  const imageRef = useLoadedImageRef(markLoaded);

  return (
    <StyledArticle>
      <PageOverlays />
      {blog && loadStatus && (
        <TitleContainer>
          <StyledDate>
            {blog.genre}{" "}
            <span style={{ fontWeight: "400" }}>
              - <LocalDate value={blog.date} />
            </span>
          </StyledDate>
          <StyledTitle>{blog.title}</StyledTitle>
          <StyledSubtitle>
            Rihanna and A$AP finally declare it official. Here’s how it went
            down
          </StyledSubtitle>
        </TitleContainer>
      )}
      <img
        ref={imageRef}
        style={loadStatus ? {} : { display: "none" }}
        onLoad={markLoaded}
        width="100%"
        src={blog?.imageUrl}
        alt="article context"
      />
      {blog && loadStatus && (
        <>
          <StyledAuthor>BY: {blog.author}</StyledAuthor>
          <StyledBody>
            {blog.body.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </StyledBody>
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
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  color: #000000;
`;
const StyledBody = styled.div`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 1rem;
`;
const StyledAuthor = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
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
