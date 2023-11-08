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
import { FiUser } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import EditUserDrawer from "./editDrawer/edit-drwaer";

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

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState(false);

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
        setImageUrl(userPhoto);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const editInitiaiValues = {
    name: userData?.user?.name,
    nationality: userData?.user?.identification.nationality,
    document: userData?.user?.identification.document,
    birthDate: userData?.user?.identification.birthDate,
    street: userData?.user?.address.street,
    number: userData?.user?.address.number,
    city: userData?.user?.address.city,
    country: userData?.user?.address.country,
    zipCode: userData?.user?.address.zipCode,
    complement: userData?.user?.address.complement,
    state: userData?.user?.address.state,
    language: "Portugues",
    district: "",
    phone: userData?.user?.phone,
  };

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
    <section id="SectionUserProfile">
      <StructContainer>
        <div className="profileWrapper">
          <div className="profileHeader">
            <div className="left">
              <div className="userIcon">
                <FiUser size={16} />
              </div>
              <Text className="title">Perfil</Text>
            </div>

            <div className="buttons">
              <Button
                icon={<EyeOutlined />}
                ghost
                style={{ color: "#02A0FC", borderColor: "#02A0FC" }}
                onClick={() => {
                  setViewMode(true);
                  setEditModalVisible(true);
                }}
              />
              <Button
                icon={<FaPencilAlt />}
                ghost
                style={{ color: "#02A0FC", borderColor: "#02A0FC" }}
                onClick={() => {
                  setViewMode(false);
                  setEditModalVisible(true);
                }}
              >
                Editar
              </Button>
            </div>
          </div>
          <div className="profileBody">
            <div className="userImage">
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
                  <Avatar src={imageUrl} size={130} icon={<UserOutlined />} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <div className="teste">
              <div className="userInfos">
                <div className="campoWrapper">
                  <Text className="infoTilte">Nome</Text>
                  <Text className="infoDesc">{userData?.user.name}</Text>
                </div>
                <div className="campoWrapper">
                  <Text className="infoTilte">Status</Text>
                  <Text
                    className={`status ${
                      userData?.user.isUpdated ? "verified" : "unverified"
                    }`}
                  >
                    {userData?.user.isUpdated
                      ? [<MdVerified />]
                      : [<GoUnverified />]}
                    {userData?.user.isUpdated ? "ATUALIZADO" : " DESATUALIZADO"}
                  </Text>
                </div>
              </div>
              <div className="userInfos">
                <div className="campoWrapper">
                  <Text className="infoTilte">Documento</Text>
                  <Text className="infoDesc">
                    {userData?.user.identification.document}
                  </Text>
                </div>
                <div className="campoWrapper">
                  <Text className="infoTilte">Telefone</Text>
                  <Text className="infoDesc">{userData?.user.phone}</Text>
                </div>
              </div>
              <div className="userInfos">
                <div className="campoWrapper">
                  <Text className="infoTilte">Email</Text>
                  <Text className="infoDesc">{userData?.user.email}</Text>
                </div>
                <div className="campoWrapper">
                  <Text className="infoTilte">Nacionalidade</Text>
                  <Text className="infoDesc">
                    {userData?.user.identification.nationality}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StructContainer>
      <EditUserDrawer
        onClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
        open={editModalVisible}
        initialValues={editInitiaiValues}
        disableForm={viewMode}
        onSubmit={(values) => {
          const body = {
            user: {
              name: values.name,
              email: userData?.user.email,
              isUpdated: true,
              phone: values.phone,
              photo: "",
              emailVerified: false,
            },
            address: {
              country: values.country,
              zipCode: values.zipCode,
              complement: values.complement,
              state: values.state,
              street: values.street,
              number: values.number,
              city: values.city,
            },
            identification: {
              birthDate: values.birthDate,
              document: values.document,
              nationality: values.nationality,
            },
          };

          if (auth) {
            API.private.updateUserInformation(auth, body).then(() => {
              window.location.reload();
            });
          }
        }}
        imageUrl={imageUrl}
      />
    </section>
  );
}
