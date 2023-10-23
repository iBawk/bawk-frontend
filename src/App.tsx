import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutDashboard, {
  loaderLayoutDashboard,
  shouldRevalidateLayoutDashboard,
} from "./pages/dashboard/layout";
import { AiFillHome } from "react-icons/ai";
import {
  FaMoneyBill,
  FaStoreAlt,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import PageDashboardHome, {
  loaderPageDashboardHome,
} from "./pages/dashboard/home/home";
import LayoutAuth from "./pages/auth/layout";
import PageLogin from "./pages/auth/login/login";
import PageSignUp from "./pages/auth/sign-up/sign-up";

const menuOptions = [
  { title: "Home", link: "", icon: <AiFillHome /> },
  { title: "Vendas", link: "vendas", icon: <FaMoneyBill /> },
  { title: "Produtos", link: "produtos", icon: <FaStoreAlt /> },
  {
    title: "Marketplace",
    link: "marketplace",
    icon: <FaShoppingCart />,
  },
  { title: "Finanças", link: "financas", icon: <FaDollarSign /> },
  {
    title: "Minhas Compras",
    link: "minhas-compras",
    icon: <MdInventory2 />,
  },
  {
    title: "Configurações",
    link: "configuracoes",
    icon: <RiSettings4Fill />,
  },
];

const router = createBrowserRouter([
  {
    path: "/painel",
    element: <LayoutDashboard options={menuOptions} />,
    loader: loaderLayoutDashboard,
    shouldRevalidate: shouldRevalidateLayoutDashboard,
    children: [
      {
        path: "/painel/",
        element: <PageDashboardHome />,
        loader: loaderPageDashboardHome,
      },
      {
        path: "/painel/vendas",
        element: <PageDashboardHome />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LayoutAuth />,
    children: [
      {
        path: "/auth/login",
        element: <PageLogin />,
      },
      {
        path: "/auth/sign-up",
        element: <PageSignUp />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
