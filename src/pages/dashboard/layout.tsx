import "./layout.scss";
import { Outlet, Link } from "react-router-dom";
import { cloneElement } from "react";
import { Button } from "antd";
import iconLogo from "../../assets/imgs/icon.svg";
import logo from "../../assets/imgs/logo-dark.svg";
import Auth from "../../services/auth/auth";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";

export type TypeOptionsMenu = {
  title: string;
  icon: JSX.Element;
  link: string;
};

export type DataStructMenu = {
  options: Array<TypeOptionsMenu>;
};

export type DataLoaderLayoutDashboard = {};

export function loaderLayoutDashboard(): DataLoaderLayoutDashboard | Response {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token))
    return redirect("/auth/login");

  return {};
}

export function shouldRevalidateLayoutDashboard() {
  const authRes = Auth.getAuth();

  return !authRes || Auth.isTokenExpired(authRes.token);
}

export default function LayoutDashboard(data: DataStructMenu) {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as DataLoaderLayoutDashboard;
  const { options } = data;

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
              onClick={() => {
                Auth.removeAuth();
                navigate("/auth/login");
              }}
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
