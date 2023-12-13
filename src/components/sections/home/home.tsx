import { useEffect } from "react";
import StructContainer from "../../structs/container/container";
import "./home.scss";

import { Typography } from "antd";

import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";
import { walletResponse } from "../../../services/api/endpoints/wallet";

const { Text } = Typography;

interface Props {
  user: ResponseGetUserMe;
  walletValues: walletResponse;
  chartValues: {
    data: {
      date: string;
      value: number;
    }[];
    totalValue: number;
  };
}

export default function SectionHome({
  user,
  walletValues,
  chartValues,
}: Props) {
  useEffect(() => {
    console.log(user);
    console.log(walletValues);
    console.log(chartValues);
  }, [user]);

  return (
    <section id="SectionHome">
      <StructContainer>
        <div className="homeWrapper">
          <div className="homeHeader">
            <div className="left">
              <Text className="title">Boa-vindas, {user.user.name}</Text>
            </div>
          </div>
          <div className="walletResume">
            <Text>Resumo</Text>
            <div className="walletResumeCards">
              <div className="walletResumeCard">
                <div className="walletResumeCardHeader">
                  <Text>Vendas Hoje</Text>
                  <Text>Ontem</Text>
                </div>
                <div className="walletResumeCardBody">
                  <Text>R$ {chartValues.data[0].value}</Text>
                  <Text>R$ {chartValues.data[1].value}</Text>
                </div>
              </div>
              <div className="walletResumeCard">
                <div className="walletResumeCardHeader">
                  <Text>Saldo Disponivel</Text>
                </div>
                <div className="walletResumeCardBody">
                  <Text>R$ {walletValues.amout_free}</Text>
                </div>
              </div>
              <div className="walletResumeCard">
                <div className="walletResumeCardHeader">
                  <Text>Pendente</Text>
                </div>
                <div className="walletResumeCardBody">
                  <Text>R$ {walletValues.amout_reclused}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StructContainer>
    </section>
  );
}
