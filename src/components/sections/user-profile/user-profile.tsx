import { useEffect, useState } from "react";
import API from "../../../services/api/api";
import { useNavigate } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import StructContainer from "../../structs/container/container";
import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";
import "./user-profile.scss";

import {
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, message, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";

import { Typography } from "antd";
import { FaPencilAlt } from "react-icons/fa";

const { Text } = Typography;

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function SectionUserProfile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<ResponseGetUserMe>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const auth = Auth.getAuth();

  useEffect(() => {
    if (!auth) {
      navigate("/auth/login");
      return;
    }

    API.private
      .getUserMe(auth.token, auth.tokenType)
      .then((response) => {
        setUserData(response);

        const userPhoto = API.public.getUserImageURL(response.user.id);
        console.log(userPhoto);

        const test = API.private.getUserImage(auth, auth.tokenType);
        console.log("teste", test);

        setImageUrl(userPhoto);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onChangeImage = (value: RcFile) => {
    setLoading(true);
    const auth = Auth.getAuth();

    if (!auth) {
      navigate("/auth/login");
      return;
    }

    API.private
      .postUserImage(auth, userData?.user.id || "", value)
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <section id="SectionUserPofile">
      <StructContainer>
        <div className="profileWrapper">
          <div className="profileHeader">
            <Text className="title">Perfil</Text>

            <div className="buttons">
              <Button>
                <EyeOutlined />
              </Button>
              <Button>
                <FaPencilAlt />
                Editar
              </Button>
            </div>
          </div>
          <div className="profileBody">
            <div className="upload">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={(e) => {
                  if (e.file?.originFileObj) {
                    onChangeImage(e.file.originFileObj);
                  }
                }}
              >
                {imageUrl ? (
                  <Avatar src={imageUrl} size={100} icon={<UserOutlined />} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <div className="userInfos">
              <div className="campoWrapper">
                <Text className="campos">Nome</Text>
                <Text className="campos2">{userData?.user.name}</Text>
              </div>
              <div className="campoWrapper">
                <Text className="campos">Documento</Text>
                <Text className="campos2">501.646.970-98</Text>
              </div>
              <div className="campoWrapper">
                <Text className="campos">Telefone</Text>
                <Text className="campos2">(84) 2583-5225</Text>
              </div>
            </div>
            <div className="userInfos">
              <div className="campoWrapper">
                <Text className="campos">Status</Text>
                <Text className="status">DESATUALIZADO</Text>
              </div>
              <div className="campoWrapper">
                <Text className="campos">Email</Text>
                <Text className="campos2">{userData?.user.email}</Text>
              </div>
              <div className="campoWrapper">
                <Text className="campos">Idioma</Text>
                <Text className="campos2">Portugues</Text>
              </div>
            </div>
          </div>
        </div>
      </StructContainer>
    </section>
  );
}
