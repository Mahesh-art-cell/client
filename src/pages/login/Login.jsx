
// 📌 src/pages/login/Login.jsx
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(null); // Clear previous errors

    try {
      const userData = await login(inputs);
      console.log("✅ Logged in successfully:", userData);
      toast.success("🎉 Login successful!"); // ✅ Success toast
      navigate("/"); // ✅ Redirect to home page
    } catch (error) {
      console.error("❌ Login failed:", error);
      toast.error("❌ Login failed. Please try again."); // ✅ Error toast
      setErr(error.response?.data || "Login failed.");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome Back.</h1>
          <p>Login to continue to your account.</p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
            />
            {err && <div className="error">{err}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
