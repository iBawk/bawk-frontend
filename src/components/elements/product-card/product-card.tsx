import "./product-card.scss";
import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ElementPriceTag from "../price-tag/price-tag";

export type DataElementProductCard = {
  title: string;
  img: string;
  description: string;
  category: string;
  viewLink?: string;
  editLink?: string;
  status: boolean;
  price: string;
  forSale?: boolean;
  forOwner?: boolean;
  onDelete?: () => void;
};

export default function ElementProductCard({
  title,
  description,
  forOwner,
  forSale,
  img,
  onDelete,
  viewLink,
  editLink,
  price,
  category,
  status,
}: DataElementProductCard) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  return (
    <>
      <div className={`ConfirmModal ${modalStatus ? "active" : ""}`}>
        <div className="contentModal">
          <h2>Deseja realmente excluir ?</h2>
          <div className="contianerButton">
            <Button
              className="button"
              type="default"
              onClick={() => setModalStatus(false)}
            >
              Não
            </Button>
            <Button className="button" type="primary" onClick={onDelete}>
              Sim
            </Button>
          </div>
        </div>
      </div>
      <div className="ElementProductCard">
        <div className="header">
          <img className="img" src={img} alt="" />
          <ElementPriceTag>R$ {price}</ElementPriceTag>
        </div>

        <div className="body">
          <h3 className="title">dasdasd asdasddas {title}</h3>
          <span className="category">{category}</span>
          <hr className="bar" />
          <p className="text">{description}</p>
        </div>

        <div className="footer">
          {onDelete && (
            <Button
              onClick={() => setModalStatus(true)}
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Deletar
            </Button>
          )}
          {editLink && (
            <Link to={editLink} title={`Editar ${title}`}>
              <Button type="default" icon={<EditOutlined />} size="small">
                Editar
              </Button>
            </Link>
          )}
          {viewLink && (
            <Link to={viewLink} title={`Visualizar ${title}`}>
              <Button type="default" icon={<EyeOutlined />} size="small">
                Visualizar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
