import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useUserStore } from "../stores/userStore";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth=useAuthStore((state)=>state.setAuth)
  const handleLogin = async (formData, closeModal) => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await login(formData);

      if (response.status === 200) {
        const { user, token } = response.data;
        // LocalStorage
        setAuth({token, userId:user._id})

        useUserStore.getState().setUser(user);

        toast.success("Login successful");
        // Notify App
        window.dispatchEvent(new Event("authChange"));
        // Close Modal (if modal is open)
        if (closeModal) closeModal();
        // Navigate
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
