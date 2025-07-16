import NavBar from "./components/navbar/NavBar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Pages/home/Home";
import Footer from "./Pages/footer/Footer";
import Gigs from "./Pages/gigs/Gigs";
import Gig from "./Pages/gig/Gig";
import Orders from "./Pages/orders/Orders";
import MyGigs from "./Pages/myGigs/MyGigs";
import Add from "./Pages/add/Add";
import Message from "./Pages/message/Message";
import Messages from "./Pages/messages/Messages";
import "./App.scss";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import Pay from "./Pages/pay/Pay";
import Success from "./Pages/success/Success";
function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <>
        
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Outlet />
          <Footer />
        </QueryClientProvider>

      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
