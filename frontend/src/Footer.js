import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./styles.css";
import axios from "axios";

const StyledFooter = styled.div`
  background-color: #ebebeb;
  width: 100%;
  height: 218px;
  display: flex;
`;

function Footer({ onSearchClick, onSubscribeClick }) {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    console.log(email);

    axios
      .post(
        "https://sheet.best/api/sheets/08da85a5-c7fd-477c-8051-40b8b7f2461a",
        { email: email }
      )
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <StyledFooter>
      <NewsletterDiv>
        <TopText>Stay updated with us and join our newsletter!</TopText>

        <StyledForm onSubmit={handleSubmit}>
          <InputDiv>
            <IconDiv for="email-input">
              <EmailIconDiv>
                <EmailIcon src="/email-icon.svg" alt="email-icon" />
              </EmailIconDiv>
            </IconDiv>

            <SearchText
              id="email-input"
              placeholder="ENTER EMAIL"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></SearchText>
            <SearchButton type="submit" value="SUBSCRIBE"></SearchButton>
          </InputDiv>
        </StyledForm>
        <PrivacyPolicy>
          By subscribing, you understand and agree to our Privacy Policy
        </PrivacyPolicy>
      </NewsletterDiv>
      <ContactDiv>
        <ContactText>PRIVACY</ContactText>
        <ContactText>CONTACT</ContactText>
        <IconDiv>
          <img src="/fb.svg" alt="fb-icon" />
          <img src="/insta.svg" alt="insta-icon" />
        </IconDiv>
      </ContactDiv>
    </StyledFooter>
  );
}
const InputDiv = styled.div`
  display: flex;
  border: 1px solid black;
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
  width: 40%;
  display: flex;
  justify-content: stretch;
  z-index: 2;
`;
const SearchText = styled.input`
  flex: 3;
  ::placeholder {
    font-size: 1em;
  }
  border: none;
  padding-left: 7px;
  color: grey;
  width: 367px;
  height: 40px;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  :focus {
    outline: none;
  }
`;
const SearchButton = styled.input`
  flex: 1;

  border: none;
  border-left: 1px solid black;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background-color: white;
  width: 117px;
  height: 40px;
`;
const TopText = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
`;
const PrivacyPolicy = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  padding-top: 10px;
`;

const IconDiv = styled.label`
  display: flex;
  gap: 20px;
`;
const ContactText = styled.p`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
`;
const NewsletterDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 10%;
  justify-content: center;
`;
const ContactDiv = styled.div`
  height: 100%;
  width: 200px;
  border-left: 1px solid black;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export default Footer;
