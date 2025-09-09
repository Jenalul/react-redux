import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { Address } from "./pages/Address";
import { Private } from "./routes/Private";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/admin",
                element: (
                    <Private>
                        <Admin />
                    </Private>
                ),
            },
            {
                path: "/address",
                element: (
                    <Private>
                        <Address />
                    </Private>
                ),
            },
        ],
    },
]);
