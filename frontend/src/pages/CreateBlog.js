import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditBlogs from "./EditBlogs";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

function CreateBlog({ blogs }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    caption: "",
    body: "",
    date: null,
    genre: "art",
    featured: false,
  });
  const [wordCount, setWordCount] = useState(0);

  function handleTextAreaChange(event) {
    setFormData({ ...formData, body: event.target.value });
    const text = event.target.value;
    const words = text.trim().split(/\s+/);
    setWordCount(words.length);
    // props.onChange(text);
  }

  let navigate = useNavigate();
  useEffect(() => {
    const password = localStorage.getItem("password");
    console.log(password);
    // Check if the password matches the required password
    if (password === "password") {
      setAuthenticated(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [authenticated, setAuthenticated] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const uploadImage = async () => {
    // event.preventDefault();

    return new Promise((resolve, reject) => {
      const imageData = new FormData();
      imageData.append("image", file);

      axios
        .post("http://localhost:3200/upload", imageData)
        .then((response) => {
          console.log("Image uploaded successfully");
          console.log(response.data);
          // setFileUrl(response.data.fileUrl);
          resolve(response.data.fileUrl);
        })
        .catch((error) => {
          console.error("Error uploading image");
          console.error(error);
          reject("error uploading image");
        });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await uploadImage();
    console.log("url", url);
    try {
      const response = await axios.post("http://localhost:3200/", {
        title: formData.title,
        author: formData.author,
        body: formData.body,
        caption: formData.caption,
        date: formData.date,
        genre: formData.genre,
        featured: false,
        imageUrl: url,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    e.run();
  };
  return (
    <StyledCreateBlog>
      <Header>Add New Post</Header>

      {authenticated ? (
        <FormDiv onSubmit={handleSubmit}>
          <DateContainer>
            <div>
              <FormLabel for="datepicker">Date:</FormLabel>
              <br />
              <DatePicker
                id="datepicker"
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date: date })}
                dateFormat="yyyy/MM/dd"
                popperPlacement="top-start"
              />
            </div>
            <div>
              <FormLabel for="genre">Category:</FormLabel>
              <br />
              <StyledSelect
                id="genre"
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
              >
                <option value="art">Art</option>
                <option value="fashion">Fashion</option>
                <option value="literature">Literature</option>
                <option value="music">Music</option>
              </StyledSelect>
            </div>
          </DateContainer>

          <FormLabel for="title">Title</FormLabel>
          {/* <br /> */}
          <StyledInput
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <br />
          <FormLabel for="author">Author</FormLabel>

          <StyledInput
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          <br />
          <FormLabel for="caption">Caption</FormLabel>

          <StyledInput
            id="caption"
            type="text"
            name="caption"
            value={formData.caption}
            onChange={(e) =>
              setFormData({ ...formData, caption: e.target.value })
            }
          />
          <br />
          <FormLabel for="body">
            Body Copy
            {/* <textarea id="txtArea" rows="10" cols="70"></textarea> */}
          </FormLabel>

          <StyledTextArea
            id="body"
            type="text"
            rows="10"
            cols="70"
            name="body"
            value={formData.body}
            onChange={handleTextAreaChange}
          />
          <br />

          <br />
          <FormLabel>Add media (JPG, PNG, JPEG)</FormLabel>
          <input type="file" name="image" onChange={handleFileUpload} />

          <br />
          <SubmitButton type="submit" value="Submit" />
        </FormDiv>
      ) : (
        <p></p>
      )}

      <EditBlogs></EditBlogs>
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
  :hover{
    color: white;
    background-color: black;
  }
`;
const StyledWordCount = styled.p`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  width: 100%;
  text-align: right;
  margin-top: 30px;
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
export default CreateBlog;
