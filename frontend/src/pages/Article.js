import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

function Article (props) {
    const [blogs, setBlogs] = useState({});
    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3200/${id}`)
            .then(response => {
            setBlogs(response.data);
            console.log(response.data);
            })
            .catch(error => {
            console.error(error);
            });
        }, [id]);
        //not sure if this is right
    function renderOutput() {
        if (typeof blogs.body === 'string'){
            const paragraphs = blogs.body.split('\n');
            return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
        }
    }
    let navigate = useNavigate(); 
    const handleDelete = async () => {
        let path = `/`; 
        navigate(path);
        axios.delete(`http://localhost:3200/blogs/${id}`)
            .then(response => {
            setBlogs(response.data);
            console.log(response.data);
            })
            .catch(error => {
            console.error(error);
            });
    }
    return (
        <>
            <h1>Article</h1>
            <h2>Title: {blogs.title}</h2>
            <h3>Author: {blogs.author}</h3>
            <div>{renderOutput()}</div>
            <img width="500px" src={blogs.imageUrl} alt='article context'></img>
            <button onClick={handleDelete}>Delete</button>
        </>
        
    );
}

export default Article;