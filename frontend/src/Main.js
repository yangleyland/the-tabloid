import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Art from "./pages/Art";
import CreateBlog from "./pages/CreateBlog";
import Fashion from "./pages/Fashion";
import Home from "./pages/Home";
import Literature from "./pages/Literature";
import Music from "./pages/Music";
import Article from "./pages/Article";
import Login from "./pages/Login";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchResults from "./pages/SearchResults";
import Subscribe from "./pages/Subscribe";
import Sidebar from "./pages/Sidebar"
// import Signup from '../pages/Signup';

const Main = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3200/")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchBlogs, setSearchBlogs] = useState(null)
  const [isSidebarOpen,setIsSidebarOpen] = useState(false);
  function searchBlog(data) {
    setSearchBlogs(data);
  }
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen);
  }
  function toggleSidebar () {
    setIsSidebarOpen(!isSidebarOpen)
  }
  function toggleSubscribe() {
    setIsSubscribeOpen(!isSubscribeOpen);
  }
  function compareDates(obj1, obj2) {
    const date1 = new Date(obj1.date);
    const date2 = new Date(obj2.date);
  
    if (date1 > date2) {
      return -1;
    } else if (date1 < date2) {
      return 1;
    } else {
      return 0;
    }
  }
  const sortedBlogs = blogs.sort(compareDates).sort((a, b) => b.featured - a.featured);
  return (
    <>
    <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}></Sidebar>
      <Navbar onSearchClick={toggleSearch} onSubscribeClick={toggleSubscribe} toggleSidebar={toggleSidebar}/>

      <Routes>
        {" "}
        {/* The Routes decides which component to show based on the current URL.*/}
        <Route
          exact
          path="/art"
          element={
            <Art
              isSearchOpen={isSearchOpen}
              searchBlogs={searchBlog}
              onSearchClick={toggleSearch}
              isSubscribeOpen={isSubscribeOpen}
              onSubscribeClick={toggleSubscribe}
              blogs={sortedBlogs}
            />
          }
        ></Route>
        <Route
          exact
          path="/"
          element={
            <Home
              blogs={sortedBlogs}
              isSearchOpen={isSearchOpen}
              searchBlogs={searchBlog}
              onSearchClick={toggleSearch}
              isSubscribeOpen={isSubscribeOpen}
              onSubscribeClick={toggleSubscribe}
            />
          }
        ></Route>
        <Route
          exact
          path="/literature"
          element={
            <Literature
              isSearchOpen={isSearchOpen}
              searchBlogs={searchBlog}
              onSearchClick={toggleSearch}
              isSubscribeOpen={isSubscribeOpen}
              onSubscribeClick={toggleSubscribe}
              blogs={sortedBlogs}
            />
          }
        ></Route>
        <Route
          exact
          path="/music"
          element={
            <Music
              isSearchOpen={isSearchOpen}
              searchBlogs={searchBlog}
              onSearchClick={toggleSearch}
              isSubscribeOpen={isSubscribeOpen}
              onSubscribeClick={toggleSubscribe}
              blogs={sortedBlogs}
            />
          }
        ></Route>
        <Route
          exact
          path="/fashion"
          element={
            <Fashion
              blogs={sortedBlogs}
              isSearchOpen={isSearchOpen}
              searchBlogs={searchBlog}
              onSearchClick={toggleSearch}
              isSubscribeOpen={isSubscribeOpen}
              onSubscribeClick={toggleSubscribe}
            />
          }
        ></Route>
        <Route
          exact
          path="/create-blog"
          element={<CreateBlog blogs={blogs} />}
        ></Route>
        <Route
          exact
          path="/article/:id"
          element={
            <Article
              isSearchOpen={isSearchOpen}
              searchBlogs={searchBlog}
              onSearchClick={toggleSearch}
              isSubscribeOpen={isSubscribeOpen}
              onSubscribeClick={toggleSubscribe}
              blogSet={blogs}
            />
          }
        ></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          exact
          path="/search/:id"
          element={
            <SearchResults
              isSearchOpen={isSearchOpen}
              searchBlogs={searchBlog}
              onSearchClick={toggleSearch}
              isSubscribeOpen={isSubscribeOpen}
              onSubscribeClick={toggleSubscribe}
              blogs={blogs}
            />
          }
        ></Route>
        <Route
          exact
          path="/subscribe"
          element={<Subscribe blogs={searchBlogs} />}
        ></Route>
      </Routes>
      <Footer/>
    </>
  );
};

export default Main;
