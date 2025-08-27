import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrivateRouter from './PrivateRouter'
import AuthRouter from './AuthRouter'

function MainRoute() {
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

  return (
    <BrowserRouter>
      {token ? <PrivateRouter /> : <AuthRouter />}
    </BrowserRouter>
  )
}

export default MainRoute
