"use client";

import Link from "next/link";
import styled from "styled-components";
import type { Post } from "@/lib/types";

export default function EditBlogs({
  blogs,
  onDelete,
  onFeature,
}: {
  blogs: Post[];
  onDelete: (id: string) => void;
  onFeature: (id: string) => void;
}) {
  return (
    <StyledEditBlogs>
      <Header>Edit Blogs</Header>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <p>
              <Link className="link-primary" href={`/article/${blog._id}`}>
                {blog.title}
              </Link>
            </p>
            <p>Featured: {blog.featured ? "true" : "false"}</p>
            <button
              className="btn btn-secondary m-2"
              onClick={() => onDelete(blog._id)}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary m-2"
              onClick={() => onFeature(blog._id)}
            >
              Feature
            </button>
          </li>
        ))}
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
