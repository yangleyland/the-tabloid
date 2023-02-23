import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function EditBlogs ({blogs}) {
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
    return (
        <>
            <h1>EditBlogs</h1>
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
        </>
    );
}

export default EditBlogs;