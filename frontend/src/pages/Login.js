import React,{useState} from 'react';
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components'
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
        <>
         <FormDiv>
                
        </FormDiv>
        <StyledForm onSubmit={handleSubmit}>
            <SearchText type="text" onChange={(e)=>setPassword(e.target.value)}></SearchText>
            <SearchButton type="submit" value="Submit" />
        </StyledForm>
        </>
       
        
    )
}
function checkAccessCode(accessCode) {
    return accessCode === 'password';
}
const FormDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

`

const SearchText = styled.input`
    flex: 3;
    ::placeholder {
        font-size: 1em;
    }
    border: 1px solid black;
    font-size: 2em;
    padding-left: 7px;
    color: grey;
`
const SearchButton = styled.input`
    flex: 1;
    border: 1px solid black;
    font-size: 2.5em;
    font-weight: 700;
`
const StyledForm = styled.form`
  position: fixed;
  width: 40%;
  height: 50px;
  top:50% ;
  left: 30%;
  display: flex;
justify-content: stretch;
  z-index: 2;
  background-color: red;
`

export default Login;