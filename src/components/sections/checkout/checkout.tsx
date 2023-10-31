import "./checkout.scss";
import ElementCheckoutForm, { DataCheckoutForm } from "../../elements/checkout-form/checkout-form";
import { Row, Col } from "antd";
import { FormEvent, useState } from "react";
import API from "../../../services/api/api";

export default function SectionCheckout() {
  const [checkoutData, setCheckoutData] = useState<DataCheckoutForm>({
    fullName: { value: "", error: false, valid: false },
    email: { value: "", error: false, valid: false },
    cardNumber: { value: "", error: false, valid: false },
    expirationDate: { value: "", error: false, valid: false },
    securityCode: { value: "", error: false, valid: false },
    installments: { value: "", error: false, valid: false },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(checkoutData);
  
    // Construct the data to be sent to the server
    const dataToSend = {
      fullName: checkoutData.fullName.value,
      email: checkoutData.email.value,
      cardNumber: checkoutData.cardNumber.value,
      expirationDate: checkoutData.expirationDate.value,
      securityCode: checkoutData.securityCode.value,
      installments: checkoutData.installments.value,
    };
  
    // Make a POST request to your server's checkout endpoint
    API.private.postCheckout(dataToSend)
      .then((response) => {
        // Handle a successful response, e.g., show a success message
        console.log("Checkout successful", response);
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        console.error("Checkout failed", error);
      });
  };

  return (
    <section id="SectionCheckout">
      <Row justify="center">
        <Col span={16}>
          <ElementCheckoutForm
            data={checkoutData}
            onSubmit={onSubmit}
            setData={setCheckoutData}
            title="Nome do produto"
          />
        </Col>
      </Row>
    </section>
  );
}
