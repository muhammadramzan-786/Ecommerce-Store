import { useState } from "react";
import axios from "axios";
import { useForgotPassword } from "../../hooks/useUser";

export default function ForgotPassword() {
  const [email, setEmail] = useState("mr4323992@gmail.com");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const forgotPassword=useForgotPassword()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await forgotPassword.mutateAsync({email})
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
