"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { HiSearch } from "react-icons/hi";
import styled from "styled-components";
import { signIn } from "@/lib/auth-client";

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [passwordField, setPasswordField] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await signIn(password)) {
      toggleSidebar();
      setPasswordField(false);
      router.push("/create-blog");
      router.refresh();
    } else {
      alert("Incorrect password");
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <StyledSidebar>
      <SidebarDiv>
        <InnerDiv>
          <StyledX onClick={toggleSidebar}>X</StyledX>
          <NavigationContainer>
            <StyledLink onClick={toggleSidebar} href="/art">
              <SubheaderText>ART</SubheaderText>
            </StyledLink>
            <StyledLink onClick={toggleSidebar} href="/fashion">
              <SubheaderText>FASHION</SubheaderText>
            </StyledLink>
            <StyledLink onClick={toggleSidebar} href="/literature">
              <SubheaderText>LITERATURE</SubheaderText>
            </StyledLink>
            <StyledLink onClick={toggleSidebar} href="/music">
              <SubheaderText>MUSIC</SubheaderText>
            </StyledLink>
          </NavigationContainer>
          <NavigationContainer>
            <StyledSearchIcon size={20} />
            <StyledLink onClick={toggleSidebar} href="/about">
              <SubheaderText>ABOUT</SubheaderText>
            </StyledLink>
            <ClickableArea onClick={() => setPasswordField(true)}>
              <SubheaderText>ADMIN SIGN IN</SubheaderText>
              {passwordField && (
                <form onSubmit={handleSubmit}>
                  <SearchText
                    placeholder="ENTER PASSWORD"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </form>
              )}
            </ClickableArea>
          </NavigationContainer>
        </InnerDiv>
      </SidebarDiv>
      <RightDiv onClick={toggleSidebar} />
    </StyledSidebar>
  );
}

const RightDiv = styled.div`
  width: 100%;
`;
const SearchText = styled.input`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  &:focus {
    outline: none;
  }
`;
const StyledX = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  width: 20px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #000000;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`;
const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 40px;
  width: 120px;
  margin: 34px auto;
`;
const StyledSearchIcon = styled(HiSearch)`
  margin-top: 4px;
  &:hover {
    color: red;
  }
`;
const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledSidebar = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 3;
  display: flex;
`;
const StyledLink = styled(Link)`
  all: unset;
`;
const ClickableArea = styled.a`
  all: unset;
`;
const SidebarDiv = styled.div`
  width: 240px;
  height: 100vh;
  background-color: white;
  z-index: 4;
`;
const SubheaderText = styled.p`
  margin: 0;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #000000;
  &:hover {
    font-weight: 800;
  }
`;
