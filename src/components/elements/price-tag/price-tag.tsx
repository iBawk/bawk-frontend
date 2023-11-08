import "./price-tag.scss";
import { ReactNode } from "react";

export default function ElementPriceTag({ children }: { children: ReactNode }) {
  return <span className="PriceTag">{children}</span>;
}
