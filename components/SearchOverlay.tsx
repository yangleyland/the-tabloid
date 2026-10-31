"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import styled from "styled-components";

export default function SearchOverlay({
  isSearchOpen,
  onSearchClick,
}: {
  isSearchOpen: boolean;
  onSearchClick: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchClick();
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  if (!isSearchOpen) return null;

  return (
    <>
      <FormDiv onClick={onSearchClick} />
      <StyledForm onSubmit={handleSubmit}>
        <SearchText
          type="text"
          placeholder="..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <SearchButton type="submit" value="Search" />
      </StyledForm>
    </>
  );
}

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
const StyledForm = styled.form`
  position: fixed;
  width: 40%;
  height: 50px;
  top: 50%;
  left: 30%;
  display: flex;
  justify-content: stretch;
  z-index: 2;
`;
