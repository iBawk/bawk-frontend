import "./checkout.scss";
import ElementCheckoutForm, {  } from "../../elements/checkout-form/checkout-form";
import { Row, Col } from "antd";
export default function SectionCheckout() {



  return (
    <section id="SectionCheckout">
      <Row justify="center">
        <Col span={16}>
          <ElementCheckoutForm title={""} data={{
            cardNumber: {
              value: "",
              error: false,
              valid: false
            },
            expirationDate: {
              value: "",
              error: false,
              valid: false
            },
            securityCode: {
              value: "",
              error: false,
              valid: false
            },
            installments: {
              value: 0,
              error: false,
              valid: false
            },
            fullName: {
              value: "",
              error: false,
              valid: false
            },
            email: {
              value: "",
              error: false,
              valid: false
            },
            saveDataForFuturePurchases: {
              value: false,
              error: false,
              valid: false
            }
          }} setData={function (): void {
            throw new Error("Function not implemented.");
          } } onSubmit={function (): void {
            throw new Error("Function not implemented.");
          } }/>
        </Col>
      </Row>
    </section>
  );
}
