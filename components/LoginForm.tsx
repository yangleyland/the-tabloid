"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { signIn } from "@/lib/auth-client";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await signIn(password)) {
      router.push("/create-blog");
      router.refresh();
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <>
      <FormDiv />
      <StyledForm onSubmit={handleSubmit}>
        <SearchText
          placeholder="password..."
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <SearchButton type="submit" value="Submit" />
      </StyledForm>
    </>
  );
}

const FormDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const SearchText = styled.input`
  flex: 3;
  &::placeholder {
    font-size: 1em;
  }
  border: 1px solid black;
  font-size: 2em;
  padding-left: 7px;
  color: grey;
`;
const SearchButton = styled.input`
  flex: 1;
  border: 1px solid black;
  font-size: 2.5em;
  font-weight: 700;
`;
const StyledForm = styled.form`
  position: fixed;
  width: 40%;
  height: 50px;
  top: 50%;
  left: 30%;
  display: flex;
  justify-content: stretch;
  z-index: 2;
  background-color: red;
`;
