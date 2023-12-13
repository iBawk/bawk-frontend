import "./App.scss";
import "react-quill/dist/quill.snow.css";
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
import PageDashboardHome, {
  loaderPageDashboardHome,
} from "./pages/dashboard/home/home";
import LayoutCheckout, { LoaderPageCheckout } from "./pages/checkout/checkout";
import PageLogin from "./pages/auth/login/login";
import PageSignUp from "./pages/auth/sign-up/sign-up";
import PageSales, { loaderPageSales } from "./pages/dashboard/sales/page";
import PageProducts, {
  loaderPageProducts,
} from "./pages/dashboard/products/page";
import PageMarketplace, {
  LoaderPageMarketplace,
} from "./pages/dashboard/marketplace/page";
import PageFinance, { loaderPageFinance } from "./pages/dashboard/finance/page";
import PageMyShopping, {
  loaderPageMyShopping,
} from "./pages/dashboard/my-shopping/page";
import PageSettings, {
  loaderPageSettings,
} from "./pages/dashboard/settings/page";
import PageAddProduct, { LoaderPageAddProduct } from "./pages/dashboard/add-product/page";
import PageViewProduct, {
  LoaderPageViewProduct,
} from "./pages/dashboard/view-product/page";
import PageEditProduct, {
  LoaderPageEditProduct,
} from "./pages/dashboard/edit-product/edit-product";
import PageProductOffers, {
  LoaderPageProductOffers,
} from "./pages/dashboard/product-offers/product-offers";
import PageUserProfile, {
  loaderPageProfile,
} from "./pages/dashboard/user-profile/page";
import LayoutLandpage from "./pages/landpage/layout";
import PageThanks from "./pages/checkout/thanks";

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
        loader: LoaderPageAddProduct,
      },
      {
        path: "/painel/produtos/visualizar/:id",
        element: <PageViewProduct />,
        loader: LoaderPageViewProduct,
      },
      {
        path: "/painel/produtos/editar/:id",
        element: <PageEditProduct />,
        loader: LoaderPageEditProduct,
      },
      {
        path: "/painel/produtos/ofertas/:id",
        element: <PageProductOffers />,
        loader: LoaderPageProductOffers,
      },
      {
        path: "/painel/marketplace",
        element: <PageMarketplace />,
        loader: LoaderPageMarketplace,
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
      {
        path: "/painel/perfil",
        element: <PageUserProfile />,
        loader: loaderPageProfile,
      },
    ],
  },
  {
    path: "/checkout/:offerId",
    element: <LayoutCheckout />,
    loader: LoaderPageCheckout,
  },
  {
    path: "/checkout/success",
    element: <PageThanks />,
  },
  {
    path: "/login",
    element: <PageLogin />,
  },
  {
    path: "/sign-up",
    element: <PageSignUp />,
  },
  {
    path: "",
    element: <LayoutLandpage />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
