import StructContainer from "../../structs/container/container";
import "./finance.scss";

import { Typography } from "antd";

import { walletResponse } from "../../../services/api/endpoints/wallet";
import { MdPix } from "react-icons/md";

const { Text } = Typography;

interface Props {
  walletValues: walletResponse;
}

export default function SectionFinance({ walletValues }: Props) {
  return (
    <section id="SectionHome">
      <StructContainer>
        <div className="financeWrapper">
          <div className="financeHeader">
            <div className="left">
              <Text className="title">Finanças</Text>
            </div>
          </div>
          <div className="walletResume">
            <Text>Resumo</Text>
            <div className="walletResumeCards">
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
              <div className="walletResumeCard">
                <div className="walletResumeCardHeader">
                  <Text className="primaryTitle">Reservado</Text>
                </div>
                <div className="walletResumeCardBody">
                  <Text className="mainValue">R$ 0,00</Text>
                </div>
              </div>
              <div className="walletResumeCard">
                <div className="walletResumeCardHeader">
                  <Text className="primaryTitle">Total</Text>
                </div>
                <div className="walletResumeCardBody">
                  <Text className="mainValue blue">
                    R$ {walletValues.amount_free + walletValues.amount_recluse}
                    ,00
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="financeBody">
            <div className="bodyWithdraw">
              <div className="bodyWithdrawLeft">
                <MdPix size={30} />
                <Text className="title">Solicite um saque</Text>
              </div>
              <div className="bodyWithdrawRight">
                <h3 className="subTitle">Valor</h3>
                <div className="bodyWithdrawInput">
                  <div className="inputWrapper">
                    <div className="addOnBefore">
                      <p className="text">R$</p>
                    </div>
                    <input
                      type="number"
                      className="input"
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <button className="button">Solicitar saque</button>
                </div>
              </div>
            </div>
            <div className="bodyExtract">
              <p className="title">Extrato</p>
              <div className="division"></div>
              <div className="content">
                <img
                  src="https://app.kirvano.com/_next/static/media/icon-empty-card.eaa3c75b.svg"
                  alt="lollapaluza"
                />
                <h2>Não há registros...</h2>
                <p>Quando surgirem, você poderá visualizá-los por aqui.</p>
              </div>
            </div>
          </div>
        </div>
      </StructContainer>
    </section>
  );
}
