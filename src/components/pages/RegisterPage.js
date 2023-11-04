import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      // send post request with form data payload
      const response = await fetch("https://my-blog-api-ehft.onrender.com/register", {
        method: "POST",
        body: JSON.stringify({ username, password, fullName }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.statusText === "OK") {
        alert("Registration Successful");
        // reset form fields
        setFullName("");
        setUsername("");
        setPassword("");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <form action="" className="login">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
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
      <button onClick={register}>register</button>
    </form>
  );
}
