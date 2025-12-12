import React, { useState } from "react";

export default function Service() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const scanNumber = async () => {
    if (!number) return alert("Enter a number first!");
    setLoading(true);

    try {
      const response = await fetch("https://police-project-backend-68ng.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'scan', number })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "60px" }}>
      <h1>LeakOSINT Number Scan</h1>

      <input
        type="text"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        style={{
          padding: "14px",
          width: "300px",
          fontSize: "18px",
          borderRadius: "8px",
          marginRight: "10px"
        }}
      />

      <button
        onClick={scanNumber}
        style={{
          padding: "14px 24px",
          fontSize: "18px",
          fontWeight: "bold",
          borderRadius: "8px",
          cursor: "pointer",
          background: "#00eaff", 
          border: "none",
          color: "black"
        }}
      >
        {loading ? "Scanning..." : "Scan"}
      </button>

      <pre style={{ textAlign: "left", marginTop: "40px", padding: "20px" }}>
        {result ? JSON.stringify(result, null, 2) : ""}
      </pre>
    </div>
  );
}
