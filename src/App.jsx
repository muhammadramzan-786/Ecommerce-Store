// import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import {BrowserRouter as Router,Route , Routes } from "react-router-dom";
import MainRoute from "./routes/MainRoute";

function App() {
  return <><MainRoute /> <ToastContainer 
        position="bottom-right"  // 👈 side se popup
        autoClose={3000}      // 3 second me close
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      /></>
}
export default App;