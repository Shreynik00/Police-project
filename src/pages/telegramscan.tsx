import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Service() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const scanNumber = async () => {
    if (!number) return alert("Enter a number first!");
    setLoading(true);

   /* try {
      const response = await fetch("https://police-project-backend-68ng.vercel.app/api/MobileApiCall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  number })
      });

      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }*/
  };

  const navigate = useNavigate();


  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
         setError("No token found");
      
      setTimeout(() => {
        navigate("/login");
      }, 4000); // 2 seconds delay
      }

      try {
        const response = await fetch(
          "https://police-project-backend-68ng.vercel.app/api/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
           body: JSON.stringify({ token })
          }
        );

        const data = await response.json();

        if (!data.success) {
         if (!token) {
      setError("No token found");
      
      setTimeout(() => {
        navigate("/login");
      }, 4000); // 2 seconds delay
    }
        }

        setUser(data.user);
      } catch (err) {
        setError("Server error");
      }
    };

    verifyUser();
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "60px" }}>
      <h1>TRNETRA OSINT Number Scan</h1>

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

      {result && (
  <div
    style={{
      marginTop: "40px",
      padding: "20px",
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "10px",
      background: "#111",
      color: "#00eaff",
      textAlign: "left",
      boxShadow: "0 0 15px rgba(0,234,255,0.3)"
    }}
  >
    <h2 style={{ textAlign: "center" }}>Scan Result</h2>

    {Object.entries(result).map(([key, value]) => (
      <div key={key} style={{ marginBottom: "12px" }}>
        <strong>{key}:</strong>{" "}
        {typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : String(value)}
      </div>
    ))}
  </div>
)}

    </div>
  );
}
