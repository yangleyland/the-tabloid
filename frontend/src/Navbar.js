import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";

const StyledNav = styled.nav`
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    height: 130px;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

function Navbar ({onSearchClick }) {
    return (
    <StyledNav>
        <SubheadContainer>
            <StyledLink to="/art"><SubheaderText>ART</SubheaderText></StyledLink>
            <StyledLink to="/fashion"><SubheaderText>FASHION</SubheaderText></StyledLink>
            <StyledLink to="/literature"><SubheaderText>LITERATURE</SubheaderText></StyledLink>
            <StyledLink to="/music"><SubheaderText>MUSIC</SubheaderText></StyledLink>
        </SubheadContainer>
        <StyledLink to="/"><HeaderText>TABLOID</HeaderText></StyledLink>
        <SubheadContainer2>
            <StyledLink to="/login"><SubheaderText>SUBSCRIBE</SubheaderText></StyledLink>
            <StyledLink to="/login"><SubheaderText>SIGN IN</SubheaderText></StyledLink>
            <AiOutlineSearch onClick={onSearchClick} size={20} />
        </SubheadContainer2>
        
        
    </StyledNav>
  
    );
}

const HeaderText = styled.h1`
    margin: 0;
    font-family: 'Didot';
    font-style: normal;
    font-weight: 700;
    font-size: 72px;
    /* line-height: 93px; */
    letter-spacing: 0.1em;
    color: #000000;
    :hover {
        color: red;
    }
`
const SubheadContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    gap: 10%;
    padding: 0 50px;
`
const SubheadContainer2 = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 10%;
    padding-right: 50px;
`

const SubheaderText = styled.p`
    margin: 0;
    font-family: 'InterstateMono';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 19px;
    color: #000000;
    :hover {
        color: red;
    }
`


const StyledLink = styled(Link)`
    all:unset;

`

export default Navbar;