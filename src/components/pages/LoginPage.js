import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContex";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  // form login function
  async function login(e) {
    e.preventDefault();
    try {
      // send post request with user data
      const response = await fetch("https://my-blog-api-ehft.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
     
      if (response.ok) {
        const res = await response.json();
        setUserInfo(res);
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // navigate to home page when login is successful
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <form action="" className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>login</button>
    </form>
  );
}
