import "./sign-up.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { phoneNumberMask } from "../../../helpers/mask/maks";
import {
  isNameMinimumValid,
  isEmailValid,
  isPhoneNumberValid,
  isPasswordValid,
} from "../../../helpers/validation/validation";
import ElementFormInput from "../../elements/form-input/form-input";
import API from "../../../services/api/api";

export type DataSectionSignUp = {};

export default function SectionSignUp(data: DataSectionSignUp) {
  const navigate = useNavigate();
  const {} = data;

  type FormsField = {
    value: string;
    valid: boolean;
    invalid: boolean;
  };

  type DataForms = {
    name: FormsField;
    email: FormsField;
    phoneNumber: FormsField;
    password: FormsField;
    confirmPassword: FormsField;
  };

  const [form, setForm] = useState<DataForms>({
    name: { value: "", valid: false, invalid: false },
    email: { value: "", valid: false, invalid: false },
    phoneNumber: { value: "", valid: false, invalid: false },
    password: { value: "", valid: false, invalid: false },
    confirmPassword: { value: "", valid: false, invalid: false },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, phoneNumber, password, confirmPassword } = form;

    name.valid = isNameMinimumValid(name.value);
    email.valid = isEmailValid(email.value);
    phoneNumber.valid = isPhoneNumberValid(phoneNumber.value);
    password.valid = isPasswordValid(password.value);
    confirmPassword.valid = password.value === confirmPassword.value;

    const valid =
      name.valid &&
      email.valid &&
      phoneNumber.valid &&
      password.valid &&
      confirmPassword.valid;

    if (!valid) {
      name.invalid = !isNameMinimumValid(name.value);
      email.invalid = !isEmailValid(email.value);
      phoneNumber.invalid = !isPhoneNumberValid(phoneNumber.value);
      password.invalid = !isPasswordValid(password.value);
      confirmPassword.invalid = password.value !== confirmPassword.value;

      setForm({ name, email, phoneNumber, password, confirmPassword });
      return;
    }

    API.public
      .postUserRegister({
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    form.name = {
      value: newValue,
      valid: !!newValue && isNameMinimumValid(newValue),
      invalid: !!newValue && !isNameMinimumValid(newValue),
    };

    setForm({ ...form });
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    form.email = {
      value: newValue,
      valid: !!newValue && isEmailValid(newValue),
      invalid: !!newValue && !isEmailValid(newValue),
    };

    setForm({ ...form });
  };

  const onChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = phoneNumberMask(event.target.value);

    form.phoneNumber = {
      value: newValue,
      valid: !!newValue && isPhoneNumberValid(newValue),
      invalid: !!newValue && !isPhoneNumberValid(newValue),
    };

    setForm({ ...form });
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    form.confirmPassword = { value: "", valid: false, invalid: false };

    form.password = {
      value: newValue,
      valid: !!newValue && isPasswordValid(newValue),
      invalid: !!newValue && !isPasswordValid(newValue),
    };

    setForm({ ...form });
  };

  const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    form.confirmPassword = {
      value: newValue,
      valid: !!newValue && newValue === form.password.value,
      invalid: !!newValue && newValue !== form.password.value,
    };

    setForm({ ...form });
  };

  return (
    <section id="SectionSignUp">
      <h2 className="title">Create an account</h2>
      <p className="text">Welcome to bawk, create your account!</p>
      <form className="form" onSubmit={onSubmit}>
        <ElementFormInput
          type="text"
          placeholder="Nome"
          onChange={onChangeName}
          value={form.name.value}
          valid={form.name.valid}
          invalid={form.name.invalid}
        />
        <ElementFormInput
          type="email"
          placeholder="Email"
          onChange={onChangeEmail}
          value={form.email.value}
          valid={form.email.valid}
          invalid={form.email.invalid}
        />
        <ElementFormInput
          type="tel"
          placeholder="Numero de Telefone"
          onChange={onChangePhoneNumber}
          value={form.phoneNumber.value}
          valid={form.phoneNumber.valid}
          invalid={form.phoneNumber.invalid}
        />
        <ElementFormInput
          type="password"
          placeholder="Senha"
          onChange={onChangePassword}
          value={form.password.value}
          valid={form.password.valid}
          invalid={form.password.invalid}
        />
        <ElementFormInput
          type="password"
          placeholder="Confirmação de senha"
          onChange={onChangeConfirmPassword}
          value={form.confirmPassword.value}
          valid={form.confirmPassword.valid}
          invalid={form.confirmPassword.invalid}
        />
        <div className="containerButtons">
          <div className="containerButton">
            <Button
              className="button buttonSiginUp"
              htmlType="submit"
              type="primary"
            >
              Sign Up
            </Button>
          </div>
          <Link to="/login" className="containerButton">
            <Button className="button buttonLoggin" type="default">
              Login
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
