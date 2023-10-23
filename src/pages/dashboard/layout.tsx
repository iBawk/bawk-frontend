import "./layout.scss";
import { Outlet, Link } from "react-router-dom";
import { cloneElement } from "react";
import { Button } from "antd";
import iconLogo from "../../assets/imgs/icon.svg";
import logo from "../../assets/imgs/logo-dark.svg";
import { useLoaderData } from "react-router-dom";

export type TypeOptionsMenu = {
  title: string;
  icon: JSX.Element;
  link: string;
};

export type DataStructMenu = {
  options: Array<TypeOptionsMenu>;
};

export type DataLoaderLayoutDashboard = {
  test: string;
};

export function loaderLayoutDashboard(): DataLoaderLayoutDashboard {
  return { test: "Foi" };
}

export function shouldRevalidateLayoutDashboard() {
  return true;
}

export default function LayoutDashboard(data: DataStructMenu) {
  const { options } = data;
  const loaderData = useLoaderData() as DataLoaderLayoutDashboard;

  return (
    <main id="LayoutDashboard">
      <div className="menu">
        <div className="header">
          <div className="containerLogo">
            <img className="icon" src={iconLogo} />
            <img className="logo" src={logo} />
          </div>
        </div>
        <div className="body">
          {options.map(({ icon, link, title }, index) => {
            const newIcon = cloneElement(icon, {
              className: `icon ${icon.props.className}`,
            });

            return (
              <Link className="option" key={index} to={link} title={title}>
                {newIcon}
                <span className="text">{title}</span>
              </Link>
            );
          })}
        </div>
        <div className="footer">
          <div className="user">
            <div className="user" />
            <Button
            /* onClick={() => {
                Cookies.remove("auth_token");
                Cookies.remove("token_type");
                router.replace("auth/login");
              }} */
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}
