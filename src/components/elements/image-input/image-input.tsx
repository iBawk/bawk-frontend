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
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp"
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
