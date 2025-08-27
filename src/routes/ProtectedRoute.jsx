import React, { useEffect,useState } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children }) {
          const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token")); // update token state
    };

    // event listener lagao
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      // cleanup
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);
    if(!token) {
        return <Navigate to="/login" replace />
    }
  return children 
}

export default ProtectedRoute