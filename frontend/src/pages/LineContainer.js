import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LineContainer({ blogs, showGenre = false }) {
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
  return (
    <StyledLineContainer>
      {blogs.length > 0 &&
        blogs
          // .filter((blog) => blog.genre==="fashion")
          .map((blog, index) => (
            <Link style={{ all: "unset" }} to={`/article/${blog._id}`}>
              <RowItem key={blog.id}>
                <ImageItem key={index} src={blog.imageUrl} />
                <RightDiv>
                  <GenreDiv>
                    {blog.genre}{" "}
                    <span style={{ fontWeight: "400" }}>
                      - {formatDate(new Date(blog.date))}
                    </span>
                  </GenreDiv>
                  <TitleDiv>
                    {blog.title}
                  </TitleDiv>
                  <CaptionDiv>
                  {blog.caption}
                  </CaptionDiv>
                  <AuthorDiv>by {blog.author}</AuthorDiv>
                </RightDiv>
              </RowItem>
            </Link>
          ))}
    </StyledLineContainer>
  );
}
const RightDiv = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  justify-content: space-around;
  align-items: flex-start;
  gap: 15px;
`;
const AuthorDiv = styled.div`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;
const CaptionDiv = styled.div`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;
const GenreDiv = styled.div`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;
const TitleDiv = styled.div`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
`;
const StyledLineContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RowItem = styled.div`
  display: flex;
  height: 360px;
  width: 800px;
  gap: 20px;
  justify-content: center;
  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
  padding: 20px;
`;
const ImageItem = styled.img`
  width: 500px;
  height: 320px;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1.5;
`;

export default LineContainer;
