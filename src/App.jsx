// import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import {BrowserRouter as Router,Route , Routes, useLocation } from "react-router-dom";
import MainRoute from "./routes/MainRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

function App() {
  const queryClient=new QueryClient()

  return <>
  <QueryClientProvider client={queryClient}>
      <MainRoute /> 
  <ToastContainer position="bottom-right"  // 👈 side se popup
        autoClose={3000}      // 3 second me close
        hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
  </QueryClientProvider>
      </>
}
export default App;