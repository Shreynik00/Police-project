import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const credentials = {
    username: "shreynik",
    password: "12345",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === credentials.username && password === credentials.password) {
      navigate("/service", { state: { username: email } });
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-700 flex items-center justify-center">
      <div className="bg-black border border-cyan-400 rounded-xl p-10 w-[650px] text-center shadow-xl shadow-cyan-500/20">
        <h1 className="text-cyan-400 text-4xl font-bold tracking-widest mb-10">
          TRINETRA OSINT
        </h1>

        <div className="border-2 border-cyan-400 rounded-xl py-10 px-6 bg-[#001a1a]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-8 items-center"
          >
            <div className="flex flex-col text-left w-full max-w-md">
              <label className="text-white text-xl mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-gray-100 text-black outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col text-left w-full max-w-md">
              <label className="text-white text-xl mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                className="px-4 py-2 rounded-md bg-gray-100 text-black outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-cyan-300 text-black text-xl font-semibold py-2 px-10 rounded-md hover:opacity-90 transition-all"
            >
              Login In
            </button>
          </form>

          <p className="text-gray-300 text-sm mt-6">
            Need access? Contact your administrator <br />
            to create an account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
