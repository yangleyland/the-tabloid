"use client";

import styled from "styled-components";
import type { Post } from "@/lib/types";
import LineContainer from "./LineContainer";
import PageOverlays from "./PageOverlays";

export default function GenreView({
  title,
  blogs,
  padded,
}: {
  title: string;
  blogs: Post[];
  padded: boolean;
}) {
  return (
    <StyledGenre $padded={padded}>
      <PageOverlays />
      <Header>{title}</Header>
      <LineContainer blogs={blogs} />
    </StyledGenre>
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
const StyledGenre = styled.div<{ $padded: boolean }>`
  padding: ${(props) => (props.$padded ? "50px" : "0")};
`;
