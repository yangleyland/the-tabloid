import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Home ({blogs}) {
    const [searched,setSearched] = useState(false);

    useEffect(()=>{
        setSearched(false);
    },[]);

    const [searchBlog,setSearchBlog] = useState({});
    const [query,setQuery]=useState('');
    const handleSubmit = (event) => {
        
        event.preventDefault();
        setSearched(true);
        console.log(query);
        axios.post('http://localhost:3200/search',{query: query}).then(
            response=>{
                setSearchBlog(response.data);
                console.log(response.data);
                console.log(blogs);
            }
        ).catch(error => {
            console.error(error);
          });
    }
    return (
        <>
        <h1>Home</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter search query" onChange={(e)=>setQuery(e.target.value)}></input>
            <input type="submit" value="Search"></input>
        </form>
        <ul>
        {searched?
        Array.from(searchBlog)
            .map((blog) => (
                <li key={blog._id}>
                <h2><Link to={`/article/${blog._id}`}>{blog.title}</Link></h2>
            </li>
            ))
        :
        blogs
            .map((blog) => (
                <li key={blog._id}>
                <h2><Link to={`/article/${blog._id}`}>{blog.title}</Link></h2>
            </li>
            ))
        
        }
        </ul>        
        </>

    );
}

export default Home;