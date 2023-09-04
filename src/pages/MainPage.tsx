import { useTranslation,  } from "react-i18next";
import {
  Layout,
  Col,
  Row,
} from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Content>
      <Row justify="space-evenly">
        <Col span={7}>
          <Link to="/layout-shifting">
            <div style={{ backgroundColor: "white", padding: "20px" }}>
              {t("test")}1<p>{t("Header")}</p>
            </div>
          </Link>
        </Col>
        <Col span={7}>
          <div style={{ backgroundColor: "white", padding: "20px" }}>
            {t("test")}2<p>{t("Header2")}</p>
          </div>
        </Col>
        <Col span={7}>
          <Link to="/personal-data-storage">
            <div style={{ backgroundColor: "white", padding: "20px" }}>
              {t("test")}3<p>{t("Header3")}</p>
            </div>
          </Link>
        </Col>
      </Row>
    </Content>
  );
};

export default MainPage;
