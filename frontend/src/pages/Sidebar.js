import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [passwordField, setPasswordField] = useState(false);
  function handleAdminSignin() {
    setPasswordField(true);
  }
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    //redirect to createBlog while passing a password prop
    e.preventDefault();
    console.log(password);
    if (checkAccessCode(password)) {
      localStorage.setItem("password", password);
      // Redirect the user to the password-protected page
      toggleSidebar();
      navigate("/create-blog");
      setPasswordField(false);
    } else {
      localStorage.setItem("password", "wrong");
      alert("Incorrect password");
    }
  };
  return (
    <>
      {isSidebarOpen && (
        <StyledSidebar>
          <SidebarDiv>
            <InnerDiv>
                <StyledX onClick={toggleSidebar}>X</StyledX>

              <NavigationContainer>
                <StyledLink onClick={toggleSidebar} to="/art">
                  <SubheaderText>ART</SubheaderText>
                </StyledLink>
                <StyledLink onClick={toggleSidebar} to="/fashion">
                  <SubheaderText>FASHION</SubheaderText>
                </StyledLink>
                <StyledLink onClick={toggleSidebar} to="/literature">
                  <SubheaderText>LITERATURE</SubheaderText>
                </StyledLink>
                <StyledLink onClick={toggleSidebar} to="/music">
                  <SubheaderText>MUSIC</SubheaderText>
                </StyledLink>
              </NavigationContainer>
              <NavigationContainer>
                <StyledSearchIcon size={20} />
                <StyledLink onClick={toggleSidebar} to="/about">
                  <SubheaderText>ABOUT</SubheaderText>
                </StyledLink>
                <StyledLink onClick={handleAdminSignin}>
                  <SubheaderText>ADMIN SIGN IN</SubheaderText>
                  {passwordField && (
                    <StyledForm onSubmit={handleSubmit}>
                      <SearchText
                        placeholder="ENTER PASSWORD"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      ></SearchText>
                    </StyledForm>
                  )}
                </StyledLink>
              </NavigationContainer>
            </InnerDiv>
          </SidebarDiv>
          <RightDiv onClick={toggleSidebar}>

          </RightDiv>
        </StyledSidebar>
      )}
    </>
  );
};
function checkAccessCode(accessCode) {
  return accessCode === "password";
}
const RightDiv = styled.div`
width: 100%;
`
const StyledForm = styled.form``;
const SearchText = styled.input`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  :focus {
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
  /* identical to box height */

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: #000000;
  opacity: 0.3;
  :hover {
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
  :hover {
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
  :hover {
    font-weight: 800;
  }
`;

export default Sidebar;
