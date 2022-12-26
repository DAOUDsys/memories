import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./components/home/home.jsx";
import Auth from "./components/auth/auth.jsx";
import PostDetails from "./components/post-details/post_details.jsx";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate to="/posts" />} />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetails />} />
        <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" />} />
      </Routes>
    </Container>
  );
};

export default App;
