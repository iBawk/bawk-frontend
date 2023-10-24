import "./layout.scss";
import { Outlet, Link } from "react-router-dom";
import { cloneElement } from "react";
import iconLogo from "../../assets/imgs/icon.svg";
import logo from "../../assets/imgs/logo-dark.svg";
import Auth from "../../services/auth/auth";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import { ResponseGetUserMe } from "../../services/api/endpoints/user-me";
import API from "../../services/api/api";
import { BiLogOut } from "react-icons/bi";

export type TypeOptionsMenu = {
  title: string;
  icon: JSX.Element;
  link: string;
};

export type DataStructMenu = {
  options: Array<TypeOptionsMenu>;
};

export type DataLoaderLayoutDashboard = {
  userInformations: ResponseGetUserMe;
};

export async function loaderLayoutDashboard(): Promise<
  DataLoaderLayoutDashboard | Response
> {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token))
    return redirect("/auth/login");

  const responseUserMe = await API.private.getUserMe(
    authRes.token,
    authRes.tokenType
  );

  return { userInformations: responseUserMe };
}

export function shouldRevalidateLayoutDashboard() {
  const authRes = Auth.getAuth();

  return !authRes || Auth.isTokenExpired(authRes.token);
}

export default function LayoutDashboard({ options }: DataStructMenu) {
  const navigate = useNavigate();
  const { user } = (useLoaderData() as DataLoaderLayoutDashboard)
    .userInformations.loggedUserInfo;

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
          <div
            className="option"
            onClick={() => {
              Auth.removeAuth();
              navigate("/auth/login");
            }}
            title="Configurações"
          >
            <BiLogOut className="icon" />
            <span className="text">Sair</span>
          </div>
          <div className="userCard">
            <div className="userIcon">
              <span>{user.name.charAt(0)}</span>
            </div>
            {user.name}
          </div>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}
