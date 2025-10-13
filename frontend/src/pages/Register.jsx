import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthHook} from  "../hooks/useAuth"


export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuthHook();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role , setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password , role});
      setMessage("✅ Registered successfully!");
      navigate("/");
    } catch (err) {
      setMessage("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="flex text-black flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

           <input
            type="text"
            placeholder="role"
            className="border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>

        {message && <p className="mt-3 text-center text-sm">{message}</p>}

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
