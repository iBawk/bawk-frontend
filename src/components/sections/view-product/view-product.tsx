import "./view-product.scss";
import ElementProduct, {
  DataElementProduct,
} from "../../elements/product/product";
import StructContainer from "../../structs/container/container";

export type DataSectionViewProduct = {
  productData: DataElementProduct;
};

export default function SectionViewProduct(data: DataSectionViewProduct) {
  return (
    <section id="SectionViewProduct">
      <StructContainer>
        <ElementProduct {...data.productData} />
      </StructContainer>
    </section>
  );
}
