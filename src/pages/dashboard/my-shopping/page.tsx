import "./page.scss";
import { redirect, useLoaderData } from "react-router-dom";
import API from "../../../services/api/api";
import Auth from "../../../services/auth/auth";
import StructContainer from "../../../components/structs/container/container";
import { ResponseGetProduct } from "../../../services/api/endpoints/products";
import ElementProductCard from "../../../components/elements/product-card/product-card";
import { Col, Row } from "antd";
import {
  DataElementModalViewOffer,
  ElementModalViewOffer,
} from "../../../components/sections/marktplace/marketplace";
import { useState } from "react";

export type DataLoaderPageMyShopping = {
  products: Array<ResponseGetProduct>;
};

export async function loaderPageMyShopping(): Promise<
  DataLoaderPageMyShopping | Response
> {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token)) return redirect("/login");

  const chartValues = await API.private.getTransactionPurchases(authRes);

  return { products: chartValues };
}

export default function PageMyShopping() {
  const loaderData = useLoaderData() as DataLoaderPageMyShopping;

  const [modal, setModal] = useState<DataElementModalViewOffer>({
    status: false,
    offerId: "",
    data: {
      category: "",
      createDate: "",
      description: "",
      format: "",
      img: "",
      markdown: "",
      name: "",
      sallerInEmail: "",
      sallerInName: "",
      sallerInPhone: "",
      price: "",
    },
    onClose: () => {
      modal.status = false;
      setModal({ ...modal });
    },
  });

  return (
    <main>
      <section id="SectionMyShop">
        <ElementModalViewOffer {...modal} />
        <StructContainer>
          <h2>Produtos Comprados</h2>
          <hr className="divider" />
          <Row gutter={[15, 15]}>
            {loaderData.products.map((product, index) => {
              return (
                <Col key={index} span={6}>
                  <ElementProductCard
                    title={product.name}
                    img={API.public.getProductImageURL(product.id)}
                    description={product.description}
                    category={product.category}
                    status={product.situation == 1 ? true : false}
                    onClick={() => {
                      const date = new Date(product.created_at);

                      modal.status = true;

                      modal.data = {
                        name: product.name,
                        category: product.category,
                        createDate: `${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`,
                        description: product.description,
                        format: product.format,
                        img: API.public.getProductImageURL(product.id),
                        markdown: product.markdown,
                        sallerInEmail: product.sallerInEmail,
                        sallerInName: product.sallerInName,
                        sallerInPhone: product.sallerInPhone,
                      };

                      setModal({ ...modal });
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </StructContainer>
      </section>
    </main>
  );
}
