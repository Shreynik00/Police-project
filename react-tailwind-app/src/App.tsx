import Home from "./pages/home";
import Login from "./pages/login";
import Service from "./pages/service";
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
      path: "/service",
      element: <Service />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
