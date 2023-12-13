import "./page.scss";
import { redirect, useLoaderData } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import API from "../../../services/api/api";
import { ResponseGetTransactionsSales } from "../../../services/api/endpoints/transactions";
import StructContainer from "../../../components/structs/container/container";
import { Col, Flex, Row, Space } from "antd";

export type DataLoaderPageSales = {
  productsSales: Array<ResponseGetTransactionsSales>;
};

export async function loaderPageSales(): Promise<
  DataLoaderPageSales | Response
> {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token)) return redirect("/login");

  const responseSales = await API.private.getTransactionSales(authRes);

  responseSales.reverse();
  
  return {
    productsSales: responseSales,
  };
}

export default function PageSales() {
  const loaderData = useLoaderData() as DataLoaderPageSales;

  return (
    <main>
      <section id="SectionPagesSales">
        <StructContainer>
          <h2>Produtos Vendidos</h2>
          <hr className="divider" />
          <Row gutter={[30, 30]}>
            {loaderData.productsSales?.map((sale, index) => {
              const date = new Date(sale.aproveDate);

              return (
                <Col key={index} lg={24}>
                  <div className="containerContentSale">
                    <img
                      className="img"
                      src={API.public.getProductImageURL(sale.product_id)}
                    />
                    <Flex
                      className="containerText"
                      justify="space-between"
                      align="center"
                    >
                      <div>
                        <p>
                          <strong>Data da compra</strong>:{" "}
                          {`${date.getDate()}/${
                            date.getMonth() + 1
                          }/${date.getFullYear()}`}
                        </p>
                        <p>
                          <strong>ID da compra</strong>: {sale.id}
                        </p>
                        <p>
                          <strong>ID do comprador</strong>: {sale.buyer_id}
                        </p>
                      </div>
                      <div>
                        <span className="price">+R$ {sale.price}</span>
                      </div>
                    </Flex>
                  </div>
                </Col>
              );
            })}
          </Row>
        </StructContainer>
      </section>
    </main>
  );
}
