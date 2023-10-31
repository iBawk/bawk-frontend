import "./App.scss";
import 'react-quill/dist/quill.snow.css';
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
import LayoutCheckout from "./pages/checkout/checkout";
import PageLogin from "./pages/auth/login/login";
import PageSignUp from "./pages/auth/sign-up/sign-up";
import PageSales, { loaderPageSales } from "./pages/dashboard/sales/page";
import PageProducts, {
  loaderPageProducts,
} from "./pages/dashboard/products/page";
import PageMarketplace, {
  loaderPageMarketplace,
} from "./pages/dashboard/marketplace/page";
import PageFinance, { loaderPageFinance } from "./pages/dashboard/finance/page";
import PageMyShopping, {
  loaderPageMyShopping,
} from "./pages/dashboard/my-shopping/page";
import PageSettings, {
  loaderPageSettings,
} from "./pages/dashboard/settings/page";
import PageAddProduct from "./pages/dashboard/add-product/page";

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
        element: <PageSales />,
        loader: loaderPageSales,
      },
      {
        path: "/painel/produtos",
        element: <PageProducts />,
        loader: loaderPageProducts,
      },
      {
        path: "/painel/produtos/add-produto",
        element: <PageAddProduct />,
      },
      {
        path: "/painel/marketplace",
        element: <PageMarketplace />,
        loader: loaderPageMarketplace,
      },
      {
        path: "/painel/financas",
        element: <PageFinance />,
        loader: loaderPageFinance,
      },
      {
        path: "/painel/minhas-compras",
        element: <PageMyShopping />,
        loader: loaderPageMyShopping,
      },
      {
        path: "/painel/configuracoes",
        element: <PageSettings />,
        loader: loaderPageSettings,
      },
    ],
  },
  {
    path: "/checkout",
    element: <LayoutCheckout />,
    
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
