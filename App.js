import React, { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./AuthProvider";
import "./App.css";
import Footer from "./Footer";
import logo from "./logo.png";
function AuthForm() {
  const { login, signup, user } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(form.email, form.password);
        alert("Logged in");
      } else {
        await signup(form.name, form.email, form.password);
        alert("Signed up! Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  if (user) return <div>Welcome, {user.name} — you are logged in!</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1><img src={logo} alt="Project 816 Logo" style={{ height: "40px", verticalAlign: "middle", marginRight: "10px" }} />Project 816</h1>
      
      <div className="container">
        <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && <input name="name" placeholder="Name" onChange={handleChange} required />}
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create account" : "Have an account? Login"}
      </p>
      </div>
      <Footer />
    </div>
  );
}

function AppInner() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <nav style={{ padding: 10 }}>
        {user ? (
          <>
            <strong>{user.name}</strong>
            <button onClick={logout} style={{ marginLeft: 10 }}>Logout</button>
          </>
        ) : null}
      </nav>
      <AuthForm />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
