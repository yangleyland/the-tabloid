import React from 'react';
import { Link } from "react-router-dom";

function Fashion ({blogs}) {
    return (
        <>
            <h1>Fashion</h1>
            <ul>
                {blogs
                    .filter((blog) => blog.genre==="fashion")
                    .map((blog) => (
                        <li key={blog.id}>
                        <h2><Link to={`/article/${blog._id}`}>{blog.title}</Link></h2>
                    </li>
                    ))
                }
            </ul>        
        </>
    );
}

export default Fashion;