import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Posts from "./components/Posts/Posts";
import Users from "./components/Users/Users";

function App() {
  return (
    <div className="App">
      <Header/>
      <main className="content">
          This is main section
          <Routes>
             <Route path="/" element={<Posts />}/>
             <Route path="/posts" element={<Posts />}/>
              <Route path="/users" element={<Users />}/>
{/*              <Route path='/login' element={<Login /> }/>*/}
          </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
