// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./register.scss";
// import axios from "axios";

// const Register = () => {
//   const [inputs, setInputs] = useState({
//     username: "",
//     email: "",
//     password: "",
//     name: "",
//   });
//   const [err, setErr] = useState(null);

//   const handleChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:8800/api/auth/register", inputs);
//     } catch (err) {
//       setErr(err.response.data);
//     }
//   };

//   console.log(err)

//   return (
//     <div className="register">
//       <div className="card">
//         <div className="left">
//           <h1>Lama Social.</h1>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
//             alias totam numquam ipsa exercitationem dignissimos, error nam,
//             consequatur.
//           </p>
//           <span>Do you have an account?</span>
//           <Link to="/login">
//             <button>Login</button>
//           </Link>
//         </div>
//         <div className="right">
//           <h1>Register</h1>
//           <form>
//             <input
//               type="text"
//               placeholder="Username"
//               name="username"
//               onChange={handleChange}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               name="email"
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               placeholder="Name"
//               name="name"
//               onChange={handleChange}
//             />
//             {err && err}
//             <button onClick={handleClick}>Register</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate(); // ✅ Use navigate for redirection after registration

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://server-wi41.onrender.com/api/auth/register", inputs);
      navigate("/login"); // ✅ Redirect to login page after successful registration
    } catch (err) {
      setErr(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="register">
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
            {err && <span className="error">{err}</span>} {/* ✅ Proper error display */}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
