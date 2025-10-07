"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import "./vault.css"; 
import Navbar from "@/components/navbar/page";

const Vault = () => {
  const [vaults, setVaults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchData() {
    try {
      const res = await fetch("/api/vault", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setVaults(data.vaults || []);
    } catch (error) {
      console.error("Failed to fetch vaults:", error);
      setVaults([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const copyPassword = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied! Clipboard will be cleared in 20 seconds.");
      setTimeout(async () => await navigator.clipboard.writeText(""), 20000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handleDelete = async (vaultId) => {
    if (!confirm("Are you sure you want to delete this vault?")) return;

    const res = await fetch(`/api/vault/${vaultId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (res.ok) {
      setVaults((prev) => prev.filter((v) => v._id !== vaultId));
      alert("Vault deleted successfully!");
    } else {
      alert("Failed to delete vault. Try again!");
    }
  };

  const filteredVaults = (vaults || []).filter((vault) =>
    Object.entries(vault).some(
      ([key, value]) =>
        key !== "password" &&
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <ProtectedRoute>
      <Navbar/>
      <div className="vault-container">
        <h1 className="vault-title">Your Vault</h1>

        <input
          type="text"
          placeholder="Search vault..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="vault-search"
        />

        <div className="vault-table-container">
          <table className="vault-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVaults.map((vault, index) => (
                <tr
                  key={vault._id}
                  className={index % 2 === 0 ? "vault-row-even" : "vault-row-odd"}
                >
                  <td>{vault.title}</td>
                  <td>{vault.username}</td>
                  <td>{vault.uri}</td>
                  <td>
                    <button
                      className="btn btn-copy"
                      onClick={() => copyPassword(vault.password)}
                    >
                      Copy
                    </button>
                  </td>
                  <td className="vault-actions">
                    <Link href={`vault/${vault._id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(vault._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredVaults.length === 0 && (
                <tr>
                  <td colSpan="5" className="vault-no-data">
                    No vaults found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Vault;
