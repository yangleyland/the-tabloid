"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { HiSearch } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import styled from "styled-components";
import { subscribeToNewsletter } from "@/lib/newsletter";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [clickedOutside, setClickedOutside] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (showSubscribe && email !== "") {
      event.preventDefault();
      subscribeToNewsletter(email);
      setShowSubscribe(false);
      setEmail("");
      setShowSuccess(true);
    }
  };

  const handleClick = () => {
    if (!showSubscribe) {
      setShowSubscribe(true);
      setShowSuccess(false);
    } else {
      setFormSubmitted((previous) => !previous);
    }
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        navRef.current &&
        target instanceof Node &&
        !navRef.current.contains(target)
      ) {
        setClickedOutside(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <StyledNav ref={navRef}>
        <TopDiv>
          <HamburgerContainer onClick={toggleSidebar}>
            <StyledRxHamburgerMenu size={20} />
          </HamburgerContainer>
          <StyledLink href="/">
            <HeaderText>TABLOID</HeaderText>
          </StyledLink>
        </TopDiv>
        {!clickedOutside ? (
          <SubheadContainer>
            <SearchForm
              onClick={() => setClickedOutside(false)}
              onSubmit={handleSearch}
            >
              <img src="/search.svg" alt="search" />
              <SearchBar
                placeholder="SEARCH BY KEYWORD"
                onChange={(event) => setQuery(event.target.value)}
              />
            </SearchForm>
          </SubheadContainer>
        ) : (
          <SubheadContainer>
            <StyledLink href="/art">
              <SubheaderText>ART</SubheaderText>
            </StyledLink>
            <StyledLink href="/fashion">
              <SubheaderText>FASHION</SubheaderText>
            </StyledLink>
            <StyledLink href="/literature">
              <SubheaderText>LITERATURE</SubheaderText>
            </StyledLink>
            <StyledLink href="/music">
              <SubheaderText>MUSIC</SubheaderText>
            </StyledLink>
            <SubscribeDiv>
              {showSubscribe && (
                <StyledForm key={String(formSubmitted)} onSubmit={handleSubmit}>
                  <InputDiv>
                    <IconDiv htmlFor="navbar-email-input">
                      <EmailIconDiv>
                        <EmailIcon src="/email-icon.svg" alt="email-icon" />
                      </EmailIconDiv>
                    </IconDiv>
                    <SearchText
                      id="navbar-email-input"
                      placeholder="SIGN UP FOR OUR NEWSLETTER"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <button type="submit" style={{ all: "unset" }}>
                      <SideText style={{ border: "1px solid black" }}>
                        SUBSCRIBE
                      </SideText>
                    </button>
                  </InputDiv>
                </StyledForm>
              )}
              {showSuccess && (
                <SuccessText>Whoo! you’re now on our mailing list.</SuccessText>
              )}
              {!showSubscribe && (
                <ClickableText onClick={handleClick}>
                  <SideText
                    style={{ border: "1px solid black", borderBottom: "none" }}
                  >
                    SUBSCRIBE
                  </SideText>
                </ClickableText>
              )}
            </SubscribeDiv>
            <StyledSearchIcon
              onClick={() => setClickedOutside(false)}
              size={20}
            />
          </SubheadContainer>
        )}
      </StyledNav>
      <NavPlaceHolder />
    </>
  );
}

const StyledNav = styled.nav`
  width: 100%;
  padding: 0;
  display: flex;
  height: 88px;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  background-color: white;
  border: 1px solid #ebebeb;
`;
const SearchForm = styled.form`
  border: 1px solid black;
  display: flex;
  gap: 10px;
  padding-left: 10px;
`;
const SearchBar = styled.input`
  all: unset;
  width: 400px;
  height: 42px;
`;
const StyledRxHamburgerMenu = styled(RxHamburgerMenu)`
  &:hover {
    color: red;
  }
`;
const SuccessText = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0e9d48;
`;
const SubscribeDiv = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  align-items: center;
`;
const IconDiv = styled.label`
  display: flex;
  gap: 10px;
`;
const InputDiv = styled.div`
  display: flex;
  align-items: center;
`;
const EmailIconDiv = styled.div`
  height: 100%;
  padding-left: 8px;
  background-color: white;
  padding-top: 5px;
`;
const EmailIcon = styled.img`
  background-color: white;
`;
const StyledForm = styled.form`
  display: flex;
  justify-content: stretch;
  z-index: 2;
`;
const SearchText = styled.input`
  flex: 3;
  &::placeholder {
    font-size: 1em;
  }
  &:focus {
    outline: none;
  }
  border: none;
  padding-left: 7px;
  color: grey;
  height: 40px;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  width: 250px;
`;
const NavPlaceHolder = styled.div`
  height: 88px;
  background-color: white;
`;
const TopDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: 30px 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 60px;
`;
const StyledSearchIcon = styled(HiSearch)`
  &:hover {
    color: red;
  }
`;
const HeaderText = styled.h1`
  margin: 0;
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 52px;
  letter-spacing: 0.1em;
  color: #000000;
  &:hover {
    color: red;
  }
`;
const SubheadContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: end;
  align-items: center;
  gap: 32px;
  padding-right: 20px;
`;
const HamburgerContainer = styled.div`
  justify-content: flex-start;
  align-items: start;
  padding-left: 50px;
`;
const SubheaderText = styled.p`
  margin: 0;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  &:hover {
    font-weight: 800;
  }
`;
const SideText = styled.p`
  margin: 0;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  padding: 7px 10px 5px 10px;
  &:hover {
    color: white;
    background-color: black;
  }
`;
const StyledLink = styled(Link)`
  all: unset;
`;
const ClickableText = styled.a`
  all: unset;
`;
