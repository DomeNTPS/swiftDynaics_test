import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import {
  Layout,
  Space,
  Col,
  Divider,
  Row,
  Button,
  Dropdown,
  Typography,
} from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;


const MainPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Content>
        <Row justify="space-evenly">
          <Col span={5}>
          <Link to="/layout-shifting">1</Link>
          </Col>
          <Col span={5}>
            <Button type="text" block>
              text
            </Button>
          </Col>
          <Col span={5}>
            <Link to="/personal-data-storage">3</Link>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default MainPage;
