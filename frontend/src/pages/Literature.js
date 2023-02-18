import React from 'react';
import { Link } from "react-router-dom";

function Literature ({blogs}) {
    return (
        <>
            <h1>Literature</h1>
            <ul>
                {blogs
                    .filter((blog) => blog.genre==="literature")
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

export default Literature;