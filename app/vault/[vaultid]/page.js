'use client';
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import './vaultid.css'
import Navbar from "@/components/navbar/page";

const VaultEditPage = () => {
  const { vaultid } = useParams(); 
  const router = useRouter();


  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [uri, setUri] = useState('');
  const [password, setPassword] = useState('');
  const [passlength, setPasslength] = useState(8);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch vault data on page load
  useEffect(() => {
    async function fetchVault() {
      if (!vaultid) return;

      const res = await fetch(`/api/vault/${vaultid}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to fetch vault");
        return;
      }

      // Populate form fields
      setTitle(data.title || '');
      setUsername(data.username || '');
      setUri(data.uri || '');
      setPassword(data.password || '');
    }

    fetchVault();
  }, [vaultid]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/vault/${vaultid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, username, uri, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Vault updated successfully ✅");

    } else {
      setMessage(data.message || "Failed to update vault ❌");
    }
    router.push('/vault')
  };


  const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let pwd = "";
    for (let i = 0; i < passlength; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
  };

  return (
  <>
    <Navbar />
    <div className="vault-edit-page">
      <div className="edit-container">
        <h1>Edit Vault</h1>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="URI"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
          />
          <div className="inputbtn">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button  type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
          </div>

          <input
            type="range"
            min="4"
            max="32"
            value={passlength}
            onChange={(e) => setPasslength(e.target.value)}
          />
          <p>Length: {passlength}</p>

          <button type="button" onClick={generateRandomPassword}>
            Generate Random Password
          </button>
          <button type="submit">Update Vault</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  </>
);

};

export default VaultEditPage;
