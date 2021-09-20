import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Header from "./Components/Header";
import Home from "./Components/Home";
import Post from "./Components/Post";
import About from "./Components/About";
import Detail from "./Components/Detail";

import fireDb from "./firebase";

import "./App.css";

function App() {

  // const getLsData = () => {
  //   const dataLs = localStorage.getItem('posts')
  //   if(dataLs){
  //       return JSON.parse(dataLs)
  //   }
  //   else{
  //     return []
  //   }
  // }

  // const [post, setPost] = useState({});

  // const [uploadFile, setUploadFile] = useState()


  return (
    <>
      <Router>
        {/* <Header /> */}

        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/post">
            <Post/>
          </Route>
          <Route exact path="/post/update/:id">
            <Post/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/post/:id">
            <Detail/>
          </Route>
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
