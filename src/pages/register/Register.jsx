

// 📌 Import Required Modules
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import Toast
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toast CSS

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate(); // ✅ Use navigate for redirection after registration

  // 📌 Handle Input Change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 📌 Handle Form Submission
  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // ✅ Make POST Request to Register API
  //     await axios.post("https://server-wi41.onrender.com/api/auth/register", inputs);

  //     // 🎉 Show Success Toast
  //     toast.success("✅ Registration successful! Redirecting to login...", {
  //       position: "top-center",
  //       autoClose: 3000, // Close after 3 seconds
  //     });

  //     // ⏳ Delay Redirection to Login Page After 3 Seconds
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 3000);
  //   } catch (err) {
  //     // ❌ Show Error Toast if Registration Fails
  //     toast.error(err.response?.data?.message || "❌ Registration failed. Try again.", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //   }
  // };


  const handleClick = async (e) => {
  e.preventDefault();

  try {
    // ✅ Use local backend URL instead of Render
    await axios.post("http://localhost:8800/api/auth/register", inputs);

    // 🎉 Show Success Toast
    toast.success("✅ Registration successful! Redirecting to login...", {
      position: "top-center",
      autoClose: 3000,
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  } catch (err) {
    // ❌ Show Error Toast if Registration Fails
    toast.error(err.response?.data?.message || "❌ Registration failed. Try again.", {
      position: "top-center",
      autoClose: 3000,
    });
  }
};


  return (
    <div className="register">
      {/* ✅ Toast Container to Render Toasts */}
      <ToastContainer />

      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
