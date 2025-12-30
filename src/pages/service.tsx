import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./css/Service.css";

function Login() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");


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
        console.log(data);

        if (!data.success) {
         if (!token) {
      setError("token not verifyed login again");
      
      setTimeout(() => {
        navigate("/login");
      }, 4000); // 2 seconds delay
    }
    else{
      setError("Token expired");
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
if (error) {
  return (
    <div className="full-screen center red-text">
      {error}
    </div>
  );
}

if (!user) {
  return (
    <div className="full-screen center white-text">
      Verifying...
    </div>
  );
}

return (
  <div className="service-page">
    {/* Header */}
    <header className="service-header">
      <h1 className="logo">TRINETRA <span>OSINT</span></h1>

      <div className="credits-box">
        <span className="credits-text">Credits</span>
        <span className="credits-count">100</span>
      </div>
    </header>

    {/* Main Card */}
    <div className="scan-card">
      <div className="input-row">
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter Phone Number to scan"
          />
        </div>

        <button className="scan-btn">Scan Now</button>
      </div>

      <div className="result-label">Result :</div>

      <div className="result-box">
        {/* API result will render here */}
      </div>

      <div className="download-row">
        <button className="download-btn">Download pdf</button>
      </div>
    </div>
  </div>
);

}

export default Login;
