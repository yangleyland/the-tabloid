import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditBlogs from './EditBlogs'

function CreateBlog ({blogs}) {
    const [fileUrl, setFileUrl] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        body: "",
        date: "",
        genre: "art",
        featured: false
    });
    let navigate = useNavigate(); 
    useEffect(()=>{
        const password = localStorage.getItem('password');
        console.log(password);
        // Check if the password matches the required password
        if (password === 'password') {
            setAuthenticated(true);
        } 
        else {
            navigate('/');
        }
    },[navigate]);

    const [authenticated, setAuthenticated] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };
    const uploadImage = async ()=>{
        // event.preventDefault();

        return new Promise((resolve,reject)=>{
            const imageData = new FormData();
            imageData.append('image', file);
        
            axios.post('http://localhost:3200/upload', imageData)
                .then(response => {
                    console.log('Image uploaded successfully');
                    console.log(response.data);
                    // setFileUrl(response.data.fileUrl);
                    resolve(response.data.fileUrl);
                })
                .catch(error => {
                    console.error('Error uploading image');
                    console.error(error);
                    reject("error uploading image")
            });
        })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = await uploadImage();
        console.log("url",url);
        try {
        const response = await axios.post('http://localhost:3200/', {
                title: formData.title,
                author: formData.author,
                body: formData.body,
                date: formData.date,
                genre: formData.genre,
                featured: false,
                imageUrl: url
        });
        console.log(response.data);
        } catch (error) {
        console.error(error);
        }
        e.run();
    }
    return (
        <div>
            <h1>CreateBlog</h1>
            {authenticated?(
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                    <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    </label>
                    <label>
                        Author:
                    <input type="text" name="author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                    </label>
                    <label>
                        Body:
                    <textarea type="text" rows="10" cols="70" name="body" value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})} />
                    {/* <textarea id="txtArea" rows="10" cols="70"></textarea> */}
                    </label>
                    <label>
                        Date:
                    <input type="text" name="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    </label>
                    <select value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})}>
                        <option value="art">Art</option>
                        <option value="fashion">Fashion</option>
                        <option value="literature">Literature</option>
                        <option value="music">Music</option>
                    </select>
                    <label>
                    Choose an image to upload:
                    <input type="file" name="image" onChange={handleFileUpload} />
                </label>
                    <input type="submit" value="Submit" />
                </form>
            )
            :(<p></p>)}
            <EditBlogs blogs={blogs}></EditBlogs>

        </div>  
        
    );
}

export default CreateBlog;