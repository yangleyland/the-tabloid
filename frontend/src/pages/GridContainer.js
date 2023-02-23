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

function GridContainer({ blogs }) {
  const [isHovered, setIsHovered] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);

  const onLoad = (index) => {
    if (index === blogs.length - 1) {
      setLoadStatus(true);
    }
  };

  return (
    <StyledGridContainer style={loadStatus ? {} : { display: "none" }}>
      {blogs.length > 0 &&
        blogs
          // .filter((blog) => blog.genre==="fashion")
          .map((blog, index) => (
            <FadeInSection>
              <Link to={`/article/${blog._id}`}>
                <GridItem key={blog.id}>
                  <GridImg
                    key={index}
                    onLoad={() => onLoad(index)}
                    onMouseEnter={() => setIsHovered(blog._id)}
                    onMouseLeave={() => setIsHovered(null)}
                    src={blog.imageUrl}
                  />

                  <LabelDiv key={blog._id} isHovered={isHovered === blog._id}>
                    <Label isHovered={isHovered === blog._id}>
                      {blog.title}
                    </Label>
                  </LabelDiv>
                </GridItem>
              </Link>
            </FadeInSection>
          ))}
    </StyledGridContainer>
  );
}
const LabelDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* background-color: white; */
  /* background-color: #ccc; */
  transition: background-color 0.5s ease-in-out;
  background-color: ${(props) => (props.isHovered ? "#D3D3D3" : "white")};
  :hover {
    background-color: #ccc;
  }
`;
const Label = styled.p`
  color: black;
  font-family: "Didot";
  text-align: center;
  font-size: 2em;

  z-index: 3;
`;
const GridImg = styled.img`
  border-radius: 10px;
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1;
  :hover {
    -webkit-filter: brightness(70%);
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
`;
const GridItem = styled.div`
  position: relative;
`;
const StyledGridContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 40px;
`;
export default GridContainer;
