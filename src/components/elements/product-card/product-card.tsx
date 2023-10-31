import { Button } from "antd";
import "./product-card.scss";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

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
  return (
    <div className="ElementProductCard">
      <div className="header">
        <img className="img" src={img} alt="" />
        <span className="priceTag">R$ {price}</span>
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
            onClick={onDelete}
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
  );
}
