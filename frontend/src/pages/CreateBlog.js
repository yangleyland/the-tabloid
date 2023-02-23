import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditBlogs from "./EditBlogs";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

function CreateBlog({ blogs }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    body: "",
    date: null,
    genre: "art",
    featured: false,
  });
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
      <Header>Create Blog</Header>

      {authenticated ? (
        <FormDiv onSubmit={handleSubmit}>
          <label for="title" style={{ width: "100%" }}>
            Title:
          </label>
          <br />
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <br />
          <label for="author">Author:</label>
          <br />{" "}
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          <br />
          <label for="body">
            Body:
            {/* <textarea id="txtArea" rows="10" cols="70"></textarea> */}
          </label>
          <br />
          <textarea
            id="body"
            type="text"
            rows="10"
            cols="70"
            name="body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          <br />
          <label for="datepicker">Date:</label>
          <br />
          <DatePicker
            id="datepicker"
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date: date })}
            dateFormat="yyyy/MM/dd"
            popperPlacement="top-start"
          />
          <br />
          <label for="genre">Category:</label>
          <br />
          <select
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
          </select>
          <br />
          <label>
            Choose an image to upload:
            <input type="file" name="image" onChange={handleFileUpload} />
          </label>
          <br />
          <input class="btn btn-primary" type="submit" value="Submit" />
        </FormDiv>
      ) : (
        <p></p>
      )}

      <EditBlogs blogs={blogs}></EditBlogs>
    </StyledCreateBlog>
  );
}
const Header = styled.h1`
  font-family: "Didot";
  text-align: left;
  padding: 20px;
  font-size: 4em;
`;
const StyledCreateBlog = styled.div`
  padding-left: 50px;
`;
const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export default CreateBlog;
