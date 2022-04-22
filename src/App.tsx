import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PostList from "./pages/PostList/PostList";
import PostDetail from './pages/PostDetail/PostDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/r/all" />} />
        <Route path="/r/:subreddit/" element={<PostList />} />
        <Route path="/r/:subreddit/comments/:id/:title" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
