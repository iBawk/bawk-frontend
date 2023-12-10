import { Form, Input } from "antd";
import { ChangeEvent } from "react";

export type FildInputText = {
  value: string;
  invalid: boolean;
  valid: boolean;
};

export type DataElementInputText = {
  label?: string;
  className?: string;
  value?: FildInputText;
  isValid?: (value: string) => boolean;
  isInvalid?: (value: string) => boolean;
  masked?: (value: string) => string;
  setValue?: (newValue: FildInputText) => void;
  min?: number;
  max?: number;
  required?: boolean;
};

export default function ElementInputText({
  className,
  setValue,
  isValid,
  isInvalid,
  masked,
  value,
  label,
  max,
  min,
  required,
}: DataElementInputText) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (!value) return;

    if (max) newValue = newValue.slice(0, max ?? newValue.length);

    value.value = masked ? masked(newValue) : newValue;

    if (isValid) value.valid = isValid(value?.value);
    if (isInvalid) value.invalid = isInvalid(value?.value);

    if (min !== undefined) {
      value.valid = (value.valid || !isInvalid) && value.value.length >= min;
      value.invalid =
        (value.invalid && !!isInvalid) ||
        (!!value.value.length && value.value.length < min);
    }

    if (setValue) setValue(value);
  };

  const status = value?.valid
    ? "success"
    : value?.invalid
    ? "error"
    : undefined;

  return (
    <Form.Item
      label={label}
      required={required}
      hasFeedback
      validateStatus={status}
    >
      <Input
        className={`${className}`}
        onChange={onChange}
        value={value?.value}
        required={required}
      />
    </Form.Item>
  );
}
