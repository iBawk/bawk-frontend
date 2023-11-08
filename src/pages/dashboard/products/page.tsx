import { useLoaderData, useNavigate } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import API from "../../../services/api/api";
import { useState } from "react";
import SectionProducts from "../../../components/sections/products/products";
import { ResponseGetProduct } from "../../../services/api/endpoints/products";
import { DataElementProductCard } from "../../../components/elements/product-card/product-card";

export type DataLoaderPageProducts = {
  products: Array<ResponseGetProduct>;
};

export async function loaderPageProducts(): Promise<
  DataLoaderPageProducts | Response
> {
  const auth = Auth.getAuth();

  if (!auth) return { products: [] };

  const resApi = await API.private.getProducts(auth);

  return { products: resApi };
}

export default function PageProducts() {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as DataLoaderPageProducts;
  const [products, setProducts] = useState<Array<ResponseGetProduct>>(
    loaderData.products
  ); 

  return (
    <main>
      <SectionProducts
        products={products.map(
          ({
            id,
            category,
            description,
            name,
            status,
          }): DataElementProductCard => {
            return {
              title: name,
              description: description,
              category,
              img: API.public.getProductImageURL(id),
              viewLink: `/painel/produtos/visualizar/${id}`,
              editLink: `/painel/produtos/editar/${id}`,
              price: "100,00",
              status: !!status,
              offerLink: `/painel/produtos/ofertas/${id}`,
              onDelete: () => {
                const auth = Auth.getAuth();

                if (!auth) {
                  navigate("/auth/login");
                  return;
                }

                API.private.deleteProduct(auth, id).then(async () => {
                  const newProducts = await API.private.getProducts(auth);

                  setProducts(newProducts);
                });
              },
            };
          }
        )}
      />
    </main>
  );
}
