import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Art from './pages/Art';
import CreateBlog from './pages/CreateBlog';
import Fashion from './pages/Fashion';
import Home from './pages/Home';
import Literature from './pages/Literature';
import Music from './pages/Music';
import Article from './pages/Article';
import Login from './pages/Login';
// import Signup from '../pages/Signup';

const Main = (props) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:3200/')
        .then(response => {
          setBlogs(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    });
  return (
    <Routes> {/* The Routes decides which component to show based on the current URL.*/}
      <Route exact path='/art' element={<Art blogs={blogs}  />}></Route>
      <Route exact path='/' element={<Home blogs={blogs}  />}></Route>
      <Route exact path='/literature' element={<Literature blogs={blogs}  />}></Route>
      <Route exact path='/music' element={<Music blogs={blogs}  />}></Route>
      <Route exact path='/fashion' element={<Fashion blogs={blogs}  />}></Route>
      <Route exact path='/create-blog' element={<CreateBlog/>}></Route>
      <Route exact path="/article/:id" element={<Article/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
    </Routes>
  );
}

export default Main;