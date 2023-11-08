import { useState } from "react";
import "./image-input.scss";

export type DataElementImageInput = {
  className?: string;
  required: boolean;
  onChange?: (value: File | null) => void;
  value: File | null;
  imgPlaceHolder?: string;
};

export default function ElementImageInput({
  className,
  required,
  onChange,
  value,
  imgPlaceHolder,
}: DataElementImageInput) {
  const [imagemFile, setImageFile] = useState<File | null>(value);

  const PreviwerImage = () => {
    if (imagemFile) {
      return (
        <img
          className={`${className} img`}
          src={URL.createObjectURL(imagemFile)}
          alt=""
        />
      );
    }

    return (
      <img
        className={`${className} img`}
        src={
          imgPlaceHolder ??
          "https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg"
        }
        alt=""
      />
    );
  };

  return (
    <div id="ElementImageInput">
      <PreviwerImage />
      <input
        required={required}
        className="input"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.item(0) ?? null;
          setImageFile(file);
          if (onChange) onChange(file);
        }}
      />
    </div>
  );
}
