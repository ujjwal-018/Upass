'use client';
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import './signup.css'
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/"); 
    }
  }, [router]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if(data.token){
      localStorage.setItem("token", data.token);
      router.replace('/');
    }
    else{
    setMessage(data.message || data.error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="toggle-btn">
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
        {message && <p className="message">{message}</p>}
        <div className="login">
      <Link className="link" href={'/login'}>Already have an account ?</Link>
      <Link className="loginlink" href={'/login'}>Login</Link>
      </div>
      </form>
    </div>
  );
}
