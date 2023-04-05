import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LazyLoad from "react-lazy-load";
import "./GridContainer.css";

const FadeInSection = ({ children }) => {
  const domRef = React.useRef();

  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);

        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    });

    observer.observe(domRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={domRef} className={isVisible ? " is-visible" : ""}>
      {children}
    </section>
  );
};

function GridContainer({ blogs, showGenre = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);

  const onLoad = (index) => {
    if (index === blogs.length - 1) {
      setLoadStatus(true);
    }
  };
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
    <StyledGridContainer style={loadStatus ? {} : { display: "none" }}>
      {blogs.length > 0 &&
        blogs
          // .filter((blog) => blog.genre==="fashion")
          .map((blog, index) => (
            <FadeInSection>
              <Link style={{ all: "unset" }} to={`/article/${blog._id}`}>
                <GridItem key={blog.id}>
                  <GridImg
                    key={index}
                    onLoad={() => onLoad(index)}
                    onMouseEnter={() => setIsHovered(blog._id)}
                    onMouseLeave={() => setIsHovered(null)}
                    src={blog.imageUrl}
                  />
                  {showGenre && (
                    <SmallLabel>
                      <Bold>{blog.genre.toUpperCase()}</Bold> -{" "}
                      {formatDate(new Date(blog.date))}
                    </SmallLabel>
                  )}
                  <LabelDiv key={blog._id} isHovered={isHovered === blog._id}>
                    <Label isHovered={isHovered === blog._id}>
                      {blog.title}
                    </Label>
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
  /* background-color: white; */
  /* background-color: #ccc; */
  transition: background-color 0.5s ease-in-out;
  /* background-color: ${(props) => (props.isHovered ? "#D3D3D3" : "white")};
  :hover {
    background-color: #ccc;
  } */
`;
const Label = styled.p`
  margin-top: 24px;
  margin-bottom: 0;
  color: black;
  text-align: center;
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
  /* :hover {
    -webkit-filter: brightness(70%);
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    transition: all 0.5s ease;
  } */
  margin-bottom: 10px;
`;
const GridItem = styled.div`
  position: relative;
  padding: 10px;
  :hover {
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
export default GridContainer;
