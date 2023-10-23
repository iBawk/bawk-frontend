import "./login.scss";
import React, { ChangeEvent, useState } from "react";
import { Button } from "antd";
import {
  emailIsValid,
  passwordIsMinimumValid,
} from "../../../helpers/validation/validation";
import ElementFormInput from "../../elements/form-input/form-input";
import { Link } from "react-router-dom";
import API from "../../../services/api/api";
import { useNavigate } from "react-router-dom";
import Auth from "../../../services/auth/auth";

export type DataSectionLogin = {};

export default function SectionLogin(data: DataSectionLogin) {
  const {} = data;
  const navigate = useNavigate();

  type FormsField = {
    value: string;
    valid: boolean;
    invalid: boolean;
  };

  type DataForms = {
    email: FormsField;
    password: FormsField;
  };

  const [forms, setForms] = useState<DataForms>({
    email: {
      value: "",
      valid: false,
      invalid: false,
    },
    password: {
      value: "",
      valid: false,
      invalid: false,
    },
  });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;

    forms.email = {
      value: email,
      valid: !!email && emailIsValid(email),
      invalid: false,
    };
    setForms({ ...forms });
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    forms.password = {
      value: password,
      valid: false,
      invalid: false,
    };
    setForms({ ...forms });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = forms;

    email.invalid = !emailIsValid(email.value);
    password.invalid = !passwordIsMinimumValid(password.value);

    if (email.invalid || password.invalid) {
      setForms({ email, password });
      return;
    }

    API.public
      .postUserLogin({ email: email.value, password: password.value })
      .then((response) => {
        const { access_token, token_type } = response;

        Auth.setAuth({ token: access_token, tokenType: token_type });

        navigate("/painel");
      })
      .catch((error) => {
        email.invalid = true;
        email.valid = false;

        password.invalid = true;
        password.valid = false;
        setForms({ email, password });
        console.log(error);
      });
  };
  return (
    <section id="SectionLoggin">
      <h2 className="title">Login In</h2>
      <p className="text">Welcome back, please login to your account.</p>
      <form className="form" onSubmit={onSubmit}>
        <ElementFormInput
          type="email"
          placeholder="Seu Email"
          onChange={onChangeEmail}
          value={forms.email.value}
          invalid={forms.email.invalid}
        />
        <ElementFormInput
          type="password"
          placeholder="Sua Senha"
          onChange={onChangePassword}
          value={forms.password.value}
          invalid={forms.password.invalid}
        />
        <div className="containerButtons">
          <div className="containerButton">
            <Button
              className="button buttonLoggin"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </div>
          <Link to="/auth/sign-up" className="containerButton">
            <Button className="button buttonSiginUp" type="default">
              Sign Up
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
