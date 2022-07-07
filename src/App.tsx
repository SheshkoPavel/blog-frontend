import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Users from "./components/Users/Users";
import PostsPage from "./components/Posts/PostsPage";
import PostItem from "./components/Posts/PostItem";

function App() {
  return (
    <div className="App">
      <Header/>
      <main className="content">

          <Routes>
             <Route path="/" element={<PostsPage />}/>
             <Route path="/posts" element={<PostsPage />}/>
              <Route path="/posts/:id" element={<PostItem />}/>
              <Route path="/users" element={<Users />}/>
{/*              <Route path='/login' element={<Login /> }/>*/}
          </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
