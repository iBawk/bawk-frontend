import "./layout.scss";
import { Row, Col } from "antd";
import { Outlet } from "react-router-dom";
import SectionQuickPresentation from "../../components/sections/quick-presentation/quick-presentation";

export default function LayoutAuth() {
  return (
    <main id="LayoutAuth">
      <Row justify="center">
        <Col span={8}>
          <SectionQuickPresentation />
        </Col>
        <Col span={8}>
          <Outlet />
        </Col>
      </Row>
    </main>
  );
}
