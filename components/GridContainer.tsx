"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styled from "styled-components";
import type { CardPost } from "@/lib/types";
import { useLoadedImageRef } from "@/lib/use-image-loaded";
import LocalDate from "./LocalDate";

function FadeInSection({ children }: { children: ReactNode }) {
  const domRef = useRef<HTMLElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const element = domRef.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setVisible(true);
        observer.unobserve(element);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={domRef} className={isVisible ? " is-visible" : ""}>
      {children}
    </section>
  );
}

function GridImage({
  src,
  isLast,
  onLastLoaded,
}: {
  src: string;
  isLast: boolean;
  onLastLoaded: () => void;
}) {
  const handleLoad = useCallback(() => {
    if (isLast) onLastLoaded();
  }, [isLast, onLastLoaded]);
  const ref = useLoadedImageRef(handleLoad);
  return <GridImg ref={ref} onLoad={handleLoad} src={src} />;
}

export default function GridContainer({
  blogs,
  showGenre = false,
}: {
  blogs: CardPost[];
  showGenre?: boolean;
}) {
  const [loadStatus, setLoadStatus] = useState(false);
  const markLoaded = useCallback(() => setLoadStatus(true), []);

  return (
    <StyledGridContainer style={loadStatus ? {} : { display: "none" }}>
      {blogs.map((blog, index) => (
        <FadeInSection key={blog._id}>
          <Link style={{ all: "unset" }} href={`/article/${blog._id}`}>
            <GridItem>
              <GridImage
                src={blog.imageUrl}
                isLast={index === blogs.length - 1}
                onLastLoaded={markLoaded}
              />
              {showGenre && (
                <SmallLabel>
                  <Bold>{blog.genre.toUpperCase()}</Bold> -{" "}
                  <LocalDate value={blog.date} />
                </SmallLabel>
              )}
              <LabelDiv>
                <Label>{blog.title}</Label>
                <CaptionDiv>{blog.caption}</CaptionDiv>
              </LabelDiv>
              <AuthorLabel>BY {blog.author.toUpperCase()}</AuthorLabel>
            </GridItem>
          </Link>
        </FadeInSection>
      ))}
    </StyledGridContainer>
  );
}

const CaptionDiv = styled.div`
  margin-top: 12px;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;
const LabelDiv = styled.div`
  width: 100%;
  transition: background-color 0.5s ease-in-out;
`;
const Label = styled.p`
  margin-top: 24px;
  margin-bottom: 0;
  color: black;
  text-align: left;
  z-index: 3;
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
`;
const SmallLabel = styled.p`
  color: black;
  margin-top: 6px;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
`;
const AuthorLabel = styled.p`
  color: black;
  margin-top: 18px;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
`;
const Bold = styled.span`
  font-weight: 800;
`;
const GridImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1.5;
  margin-bottom: 10px;
`;
const GridItem = styled.div`
  position: relative;
  padding: 10px;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
const StyledGridContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 0 40px;
`;
