import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import SearchOverlay from './SearchOverlay'

function Home ({blogs,isSearchOpen,searchBlogs,onSearchClick}) {
    return (
        <StyledHome>
        <SearchOverlay searchBlogs={searchBlogs} blogs={blogs} isSearchOpen={isSearchOpen} onSearchClick={onSearchClick}/>  
        {blogs[0]?
            <>
            
            <LeftHalf>
            <Link to={`/article/${blogs[0]._id}`} style={{all:"unset"}}>
            <img width="560px" src={blogs[0].imageUrl} alt='article context'></img>
            <TextBox>
                <SubTitle>{blogs[0].genre.toUpperCase()}</SubTitle>
                <ArticleTitle>{blogs[0].title}</ArticleTitle>
                <SubTitle>BY: {blogs[0].author.toUpperCase()}</SubTitle>
            </TextBox>
            </Link>
            </LeftHalf>
            
                
        <RightHalf>
        <Link to={`/article/${blogs[1]._id}`} style={{all:"unset"}}>
            <img width="400px" src={blogs[1].imageUrl} alt='article context'></img>
            <CaptionBox>
                <div style={{
                    display: "flex",
                    justifyContent:"space-between"
                }}>
                    <SubTitle>{blogs[0].genre.toUpperCase()}</SubTitle>
                    <SubTitle>BY: {blogs[0].author.toUpperCase()}</SubTitle>
                </div>
                
                <ArticleTitle style={{textAlign:"left",fontSize:"32px"}}>{blogs[0].title}</ArticleTitle>
            </CaptionBox>
        </Link>
        </RightHalf>
            </>
        :
        <p></p>
        }       
        </StyledHome>

    );
}

const CaptionBox = styled.div`
    width: 360px;
    height: 300px;
    padding: 20px;
`
const StyledHome = styled.div`
    display: flex;
`
const ArticleTitle = styled.p`
    font-family: 'Didot';
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    /* or 117% */
    margin: 0;
    letter-spacing: -0.05em;
`
const SubTitle = styled.p`
    font-family: 'InterstateMono';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    margin: 0;
`

const LeftHalf = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`
const RightHalf = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding-right: 73px;
` 
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
`   
export default Home;