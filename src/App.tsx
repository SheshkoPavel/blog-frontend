import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Users from "./components/Users/Users";
import PostsPage from "./components/Posts/PostsPage";
import PostItem from "./components/Posts/PostItem";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import {useAppDispatch} from "./hooks";
import {setUserThunk} from "./store/reducers/authReducer";
import AddPostForm from "./components/Posts/AddPostForm";
import StatisticPage from "./components/StatisticPage/StatisticPage";

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            dispatch(setUserThunk())
        }
    }, [])


  return (
    <div className="App">
      <Header/>
      <main className="content">

          <Routes>
             <Route path="/" element={<PostsPage />}/>
             <Route path="/posts" element={<PostsPage />}/>
             <Route path="/posts/:id" element={<PostItem />}/>
             <Route path="/users" element={<Users />}/>
             <Route path='/login' element={<LoginPage/> }/>
             <Route path='/register' element={<RegisterPage /> }/>
             <Route path='/addPost' element={<AddPostForm /> }/>
             <Route path='/myPost' element={<AddPostForm /> }/>
             <Route path='/stats' element={<StatisticPage /> }/>
             <Route path='/*' element={ <div> Данной страницы не существует</div> } />
          </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
