import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"

function EditBlogs () {
    const handleDelete = async (id) => {
        axios
          .delete(`http://localhost:3200/blogs/${id}`)
          .then((response) => {
            // setBlogs(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      const handleFeature = async (id) => {
        axios
          .post(`http://localhost:3200/blogs/feature/${id}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      const [blogs, setBlogs] = useState([]);

      useEffect(() => {
        axios
          .get("http://localhost:3200/")
          .then((response) => {
            setBlogs(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    return (
        <StyledEditBlogs>
             <Header>Edit Blogs</Header>
            <ul>
                {blogs
                    .map((blog) => (
                        <li key={blog.id}>
                        <p><Link class="link-primary" to={`/article/${blog._id}`}>{blog.title}</Link></p>
                        <p>Featured: {blog.featured?"true":"false"}</p>
                        <button class="btn btn-secondary m-2" onClick={()=>handleDelete(blog._id)}>Delete</button>
                        <button class="btn btn-secondary m-2" onClick={()=>handleFeature(blog._id)}>Feature</button>
                    </li>
                    ))
                }
            </ul>        
        </StyledEditBlogs>
    );
}
const StyledEditBlogs = styled.div`
   margin: 70px auto;
   width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  border: 1px solid red;
`
const Header = styled.h1`
  font-family: "Didot";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 41px;
  text-transform: uppercase;

  color: #000000;
`;
export default EditBlogs;