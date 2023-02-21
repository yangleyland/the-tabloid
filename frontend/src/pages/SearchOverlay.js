import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchResults ({blogs,isSearchOpen,onSearchClick,searchBlogs}) {
    const [searched,setSearched] = useState(false);
    const [searchBlog,setSearchBlog] = useState({});
    const [query,setQuery]=useState('');
    
    useEffect(()=>{
        setSearched(false);
    },[]);
    let navigate = useNavigate(); 
    const handleSubmit = (event) => {
        
        event.preventDefault();
        setSearched(true);
        console.log(query);
        axios.post('http://localhost:3200/search',{query: query}).then(
            response=>{
                setSearchBlog(response.data);
                console.log(response.data);
                console.log(blogs);
                searchBlogs(response.data);
                let path = `/Search`; 
                navigate(path);
            }
        ).catch(error => {
            console.error(error);
          });
    }
    return (
        <>
            {isSearchOpen && (
            <>
             <FormDiv onClick={onSearchClick}>
                
                </FormDiv>
                <StyledForm onSubmit={handleSubmit}>
                    <SearchText type="text" placeholder="..." onChange={(e)=>setQuery(e.target.value)}></SearchText>
                    <SearchButton type="submit" value="Search"></SearchButton>
                </StyledForm>
            </>
           
            )}
        </>
    );
}
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

const StyledForm = styled.form`
  position: fixed;
  width: 40%;
  height: 50px;
  top:50% ;
  left: 30%;
  display: flex;
justify-content: stretch;
  z-index: 2;
`
export default SearchResults;