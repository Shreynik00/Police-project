import Home from "./pages/home";
import Login from "./pages/login";
import Service from "./pages/service";
import Telegramscan from "./pages/telegramscan";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/telegramscan",
      element: < Telegramscan/>,
    },
    {
      path: "/service",
      element: <Service />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
