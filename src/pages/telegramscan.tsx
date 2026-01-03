import  { useEffect, useState  ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./css/scan.css";

export default function Service() {
 
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particlesArray: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 80 }; 

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      x: number; y: number; size: number; baseX: number; baseY: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
      }
      draw() {
        ctx!.fillStyle = "rgba(0, 255, 221, 0.8)";
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          this.x -= dx / 15;
          this.y -= dy / 15;
        } else {
          this.x -= (this.x - this.baseX) / 20;
          this.y -= (this.y - this.baseY) / 20;
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      
      // REDUCE DENSITY FOR MOBILE: 80 particles vs 300 on Desktop
      const particleCount = window.innerWidth < 768 ? 80 : 300;
      
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
        for (let j = i; j < particlesArray.length; j++) {
          let dx = particlesArray[i].x - particlesArray[j].x;
          let dy = particlesArray[i].y - particlesArray[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connection range also reduced slightly for mobile to keep it clean
          const connectionLimit = window.innerWidth < 768 ? 100 : 140;
          
          if (distance < connectionLimit) {
            ctx.strokeStyle = `rgba(0, 234, 255, ${1 - distance / connectionLimit})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
 
 const getCredits = async () => { 
  try{
    const username = localStorage.getItem("username");
    const response = await fetch(
      "https://police-project-backend-68ng.vercel.app/api/getCredits",
      {
        method:"POST",
        headers : { "Content-Type": "application/json" },
        body : JSON.stringify({username})
      }
    );
    const result = await response.json();
    const credits=  result.credit;
    console.log(credits);
      // ✅ SAVE TO STATE
    setCredits(result.credit);



  }
  catch(err){
    alert("server error in fetching credits");
  }
}

  const scanNumber = async () => {
    if (!number) return alert("Enter a number first!");
    setLoading(true);

    try {

      const username = localStorage.getItem("username");
      const response = await fetch("https://police-project-backend-68ng.vercel.app/api/MobileApiCall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  number,username })
      });

      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
     
    }
  };
 getCredits();
  const navigate = useNavigate();


  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found");
      
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
      alert("No token found");
      
      setTimeout(() => {
        navigate("/login");
      }, 4000); // 2 seconds delay
    }
        }

       
      } catch (err) {
        alert("Server error");
      }
    };

    verifyUser();
  }, []);

  return (
   <div className="service-page">
        <canvas ref={canvasRef} className="background-canvas" />
      {/* Header */}
      <header className="service-header">
      <h1 className="glitch" data-text="TRINETRA OSINT">
          <span>  TRINETRA OSINT</span>
        </h1>

        <div className="credits-box">
          <span className="credits-text">Credits</span>
            <span className="credits-count">{credits}</span>

        </div>
      </header>

      {/* Main Card */}
      <div className="scan-card">
        <div className="input-row">
          <div className="input-group">
            <label>Phone Number: </label>
            <input
              type="text"
              placeholder="Enter Phone Number to scan"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <button
            className="scan-btn"
            onClick={scanNumber}
            disabled={loading}
          >Scan Now
           
          </button>
        </div>

        <div className="result-label">Result :</div>

        <div className="result-box">
          {result ? (
            Object.entries(result).map(([key, value]) => (
              <div key={key} className="result-row">
                <strong>{key}:</strong>{" "}
                {typeof value === "object"
                  ? JSON.stringify(value, null, 2)
                  : String(value)}
              </div>
            ))
          ) : (
            <span className="placeholder-text">
             
            </span>
          )}
        </div>

        <div className="download-row">
          <button className="download-btn" disabled={!result}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
