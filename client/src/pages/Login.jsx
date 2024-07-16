import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    try {
      const formData = new FormData(e.target);
      const userData = Object.fromEntries(formData.entries());

      const res = await axios.post("http://localhost:3000/api/auth/login", userData);
      // console.log(res);
      const data = res.data.user
      console.log(data)
      login(data.name, data.role.name, data.role.menus)
      navigate("/home")
    } catch (error) {
      if(error.response){
        console.log(error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      }
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="text-2xl text-center mb-2">Login</h1>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <button>Login</button>

        <p className="mt-4">
          Don't have an account?
          <Link to="/signup" className="underline mt-4">
            {" "}
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
