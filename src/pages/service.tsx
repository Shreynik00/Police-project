import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        Verifying...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white gap-10">
      <h1 className="text-6xl font-bold">
        Welcome 
      </h1>
      <p className="text-3xl opacity-75">You are authenticated!</p>
    </div>
  );
}

export default Login;

