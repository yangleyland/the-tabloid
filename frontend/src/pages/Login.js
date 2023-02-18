import React,{useState} from 'react';
import {useNavigate } from 'react-router-dom';
function Login () {
    const [password,setPassword] = useState('');
    let navigate = useNavigate(); 
    const handleSubmit = (e) => {
        //redirect to createBlog while passing a password prop
        e.preventDefault();
        console.log(password);
        if (checkAccessCode(password)) {
            
            localStorage.setItem('password', password);
            // Redirect the user to the password-protected page
            navigate('/create-blog');
        } else {
            localStorage.setItem('password', "wrong");
            alert('Incorrect password');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="submit" value="Submit" />
        </form>
        
    )
}
function checkAccessCode(accessCode) {
    return accessCode === 'password';
}


export default Login;