import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useUserStore } from "../stores/userStore";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // <-- error state
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (formData, closeModal) => {
    setError(""); // clear previous errors

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await login(formData);

      if (response.status === 200) {
        const { user, token } = response.data;

        // Save auth to Zustand store
        setAuth({ token, userId: user._id });
        // Save user info to userStore
        useUserStore.getState().setUser(user);
        toast.success("Login successful");
        // Notify app about auth change
        window.dispatchEvent(new Event("authChange"));

        // Close modal if exists
        if (closeModal) closeModal();
        return true;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed ❌";
      setError(msg); // <-- set error state
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error }; // <-- return error state
}
