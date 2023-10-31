import "./container.scss";
import { ReactNode } from "react";

export type DataStructContaienr = {
  children: ReactNode;
};

export default function StructContainer({ children }: DataStructContaienr) {
  return (
    <div className="StructContainer">
      <div className="containerContent">{children}</div>
    </div>
  );
}
