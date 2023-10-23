import "./form-input.scss";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

export type DataElementFormInput = {
  type?: HTMLInputTypeAttribute | undefined;
  invalid?: boolean;
  valid?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function ElementFormInput(data: DataElementFormInput) {
  const { type, valid, invalid, onChange, value, placeholder } = data;

  const isValid = valid ? "valid" : "";
  const isInvalid = invalid ? "invalid" : "";

  return (
    <div className={`ElementInput ${isValid} ${isInvalid}`}>
      <input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <CloseOutlined className={`icon invalid`} />
      <CheckOutlined className={`icon valid`} />
    </div>
  );
}
