import "./layout.scss";
import { Row, Col } from "antd";
import SectionQuickPresentation from "../../components/sections/quick-presentation/quick-presentation";

interface Props {
  children: React.ReactNode;
}

export default function LayoutAuth({ children }: Props) {
  return (
    <main id="LayoutAuth">
      <Row justify="center">
        <Col span={8}>
          <SectionQuickPresentation />
        </Col>
        <Col span={8}>{children}</Col>
      </Row>
    </main>
  );
}
