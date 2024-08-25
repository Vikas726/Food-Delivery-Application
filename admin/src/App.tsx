import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { Toaster } from "react-hot-toast";

const App = () => {
  const url = "http://localhost:3000";
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />

        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="add" element={<Add url={url} />} />
          <Route path="list" element={<List url={url} />} />
          <Route path="orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
