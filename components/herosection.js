"use client";
import React, { useState } from "react";
import "./herosection.css";

const Herosection = () => {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [uri, setUri] = useState("");
  const [password, setPassword] = useState("");
  const [passlength, setPasslength] = useState(8);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/vault", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, username, uri, password }),
      });

      if (res.ok) {
        setMessage("Item added successfully ✅");
        setTitle("");
        setUsername("");
        setUri("");
        setPassword("");
      } else {
        const errorData = await res.json();
        setMessage(
          `Failed to save ❌ - ${errorData?.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred ❌");
    }
  };

  const generateRandomPassword = () => {
    const mixpass =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < passlength; i++) {
      const randomIndex = Math.floor(Math.random() * mixpass.length);
      password += mixpass.charAt(randomIndex);
    }
    setPassword(password);
  };

  return (
    <div className="passhide-container">
      <h1>Password Manager</h1>
      <form className="passhide-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          name="uri"
          placeholder="URI"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        />
      <div className="showbtn">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn toggle-btn"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          </div>

        <div className="slider-container">
          <label>Length: {passlength}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={passlength}
            onChange={(e) => setPasslength(Number(e.target.value))}
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={generateRandomPassword}
            className="btn generate-btn"
          >
            Generate Random Password
          </button>
          <button type="submit" className="btn save-btn">
            Save
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Herosection;
