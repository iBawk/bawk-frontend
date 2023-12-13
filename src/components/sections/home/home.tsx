import StructContainer from "../../structs/container/container";
import "./home.scss";

import { Button, Typography } from "antd";

import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";
import { walletResponse } from "../../../services/api/endpoints/wallet";
import { Line } from "@ant-design/charts";

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
  const chartProps = {
    data: chartValues.data,
    xField: "date",
    yField: "value",
  };

  const last = chartValues.data.length - 1;

  return (
    <section id="SectionHome">
      <StructContainer>
        <div className="homeWrapper">
          <div className="homeHeader">
            <div className="left">
              <Text className="title">Boas-vindas ! {user.user.name}</Text>
            </div>
          </div>
          <div className="walletResume">
            <Text>Resumo</Text>
            <div className="walletResumeCards">
              <div className="walletResumeCard">
                <div className="walletResumeCardHeader">
                  <Text className="primaryTitle">Vendas Hoje</Text>
                  <Text className="secondaryTitle">Ontem</Text>
                </div>
                <div className="walletResumeCardBody">
                  <Text className="mainValue blue">
                    R$ {chartValues.data[last].value},00
                  </Text>
                  <Text className="secondaryValue">
                    R$ {chartValues.data[last - 1].value},00
                  </Text>
                </div>
              </div>
              <div className="walletResumeCard">
                <div className="walletResumeCardHeader">
                  <Text className="primaryTitle">Saldo disponível</Text>
                </div>
                <div className="walletResumeCardBody">
                  <Text className="mainValue green">
                    R$ {walletValues.amount_free},00
                  </Text>
                </div>
              </div>
              <div className="walletResumeCard">
                <div className="walletResumeCardHeader">
                  <Text className="primaryTitle">Pendente</Text>
                </div>
                <div className="walletResumeCardBody">
                  <Text className="mainValue yellow">
                    R$ {walletValues.amount_recluse},00
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="chartWrapper">
            <div className="chartHeader">
              <div className="chartHeaderLeft">
                <Text className="mainText">GRÁFICO DE FATURAMENTO</Text>
                <Text className="secondaryText">
                  VENDAS R${chartValues.totalValue},00
                </Text>
              </div>
              <div className="chartHeaderRight">
                <Button disabled>
                  <Text>7 Dias</Text>
                </Button>
              </div>
            </div>
            <div className="chartBody">
              <Line {...chartProps} />
            </div>
          </div>
        </div>
      </StructContainer>
    </section>
  );
}
