"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { isGenre, type Genre, type Post } from "@/lib/types";
import EditBlogs from "./EditBlogs";

interface FormState {
  title: string;
  author: string;
  caption: string;
  body: string;
  date: Date | null;
  genre: Genre;
}

const EMPTY_FORM: FormState = {
  title: "",
  author: "",
  caption: "",
  body: "",
  date: null,
  genre: "art",
};

function isPostList(value: unknown): value is Post[] {
  return Array.isArray(value);
}

export default function CreateBlog({ initialBlogs }: { initialBlogs: Post[] }) {
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [blogs, setBlogs] = useState<Post[]>(initialBlogs);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const refreshBlogs = useCallback(async () => {
    const response = await fetch("/api/posts", { cache: "no-store" });
    const data: unknown = await response.json();
    if (isPostList(data)) setBlogs(data);
  }, []);

  const handleUnauthorized = useCallback(
    (response: Response) => {
      if (response.status === 401) {
        router.push("/login");
        return true;
      }
      return false;
    },
    [router],
  );

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please add an image");
      return;
    }
    if (!formData.date) {
      alert("Please choose a date");
      return;
    }
    setSubmitting(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: file.type || undefined,
      });
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          body: formData.body,
          caption: formData.caption,
          date: formData.date.toISOString(),
          genre: formData.genre,
          featured: false,
          imageUrl: blob.url,
        }),
      });
      if (handleUnauthorized(response)) return;
      if (!response.ok) {
        console.error(await response.text());
        alert("Could not create post");
        return;
      }
      await refreshBlogs();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (handleUnauthorized(response)) return;
    await refreshBlogs();
    router.refresh();
  };

  const handleFeature = async (id: string) => {
    const response = await fetch(`/api/posts/${id}/feature`, {
      method: "POST",
    });
    if (handleUnauthorized(response)) return;
    await refreshBlogs();
    router.refresh();
  };

  return (
    <StyledCreateBlog>
      <Header>Add New Post</Header>
      <FormDiv onSubmit={handleSubmit}>
        <DateContainer>
          <div>
            <FormLabel htmlFor="datepicker">Date:</FormLabel>
            <br />
            <DatePicker
              id="datepicker"
              selected={formData.date}
              onChange={(date: Date | null) =>
                setFormData({ ...formData, date })
              }
              dateFormat="yyyy/MM/dd"
              popperPlacement="top-start"
            />
          </div>
          <div>
            <FormLabel htmlFor="genre">Category:</FormLabel>
            <br />
            <StyledSelect
              id="genre"
              value={formData.genre}
              onChange={(event) => {
                const genre = event.target.value;
                if (isGenre(genre)) setFormData({ ...formData, genre });
              }}
            >
              <option value="art">Art</option>
              <option value="fashion">Fashion</option>
              <option value="literature">Literature</option>
              <option value="music">Music</option>
            </StyledSelect>
          </div>
        </DateContainer>
        <FormLabel htmlFor="title">Title</FormLabel>
        <StyledInput
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
        <br />
        <FormLabel htmlFor="author">Author</FormLabel>
        <StyledInput
          id="author"
          type="text"
          name="author"
          value={formData.author}
          onChange={(event) =>
            setFormData({ ...formData, author: event.target.value })
          }
        />
        <br />
        <FormLabel htmlFor="caption">Caption</FormLabel>
        <StyledInput
          id="caption"
          type="text"
          name="caption"
          value={formData.caption}
          onChange={(event) =>
            setFormData({ ...formData, caption: event.target.value })
          }
        />
        <br />
        <FormLabel htmlFor="body">Body Copy</FormLabel>
        <StyledTextArea
          id="body"
          rows={10}
          cols={70}
          name="body"
          value={formData.body}
          onChange={(event) =>
            setFormData({ ...formData, body: event.target.value })
          }
        />
        <br />
        <br />
        <FormLabel>Add media (JPG, PNG, JPEG)</FormLabel>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <br />
        <SubmitButton type="submit" value="Submit" disabled={submitting} />
      </FormDiv>
      <EditBlogs
        blogs={blogs}
        onDelete={handleDelete}
        onFeature={handleFeature}
      />
    </StyledCreateBlog>
  );
}

const DateContainer = styled.div`
  display: flex;
  gap: 30px;
`;
const StyledSelect = styled.select`
  width: 160px;
`;
const SubmitButton = styled.input`
  all: unset;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid black;
  padding: 10px 30px;
  width: 51px;
  height: 16px;
  margin: 0 auto;
  color: #000000;
  &:hover {
    color: white;
    background-color: black;
  }
`;
const StyledInput = styled.input`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 31px;
  height: 32px;
`;
const StyledTextArea = styled.textarea`
  font-family: "Didot";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  padding: 10px;
`;
const FormLabel = styled.label`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #000000;
`;
const Header = styled.h1`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 41px;
  text-transform: uppercase;
  color: #000000;
`;
const StyledCreateBlog = styled.div`
  width: 75%;
  display: flex;
  margin: 64px auto;
  flex-direction: column;
`;
const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;
