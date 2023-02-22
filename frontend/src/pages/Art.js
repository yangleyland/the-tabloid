import React from "react";
import { Link } from "react-router-dom";

function Art({ blogs }) {
  
  return (
    <>
      <h1>Art</h1>
      <ul>
        {blogs
          .filter((blog) => blog.genre === "art")
          .map((blog) => (
            <li key={blog.id}>
              <h2>
                <Link to={`/article/${blog._id}`}>{blog.title}</Link>
              </h2>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Art;
