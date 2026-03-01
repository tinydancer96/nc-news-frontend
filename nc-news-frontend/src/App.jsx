import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Articles } from "./components/Articles";
import { Article } from "./components/Article";
import { Header } from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      {/* <h1>Nav</h1> */}
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </div>
  );
};
export default App;
