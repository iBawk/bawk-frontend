import "./container.scss";
import { ReactNode } from "react";

export type DataStructContaienr = {
  children: ReactNode;
  className?: string;
};

export default function StructContainer({
  children,
  className,
}: DataStructContaienr) {
  return (
    <div className="StructContainer">
      <div className={`containerContent ${className}`}>{children}</div>
    </div>
  );
}
