import React from "react";
import { useTranslation } from "react-i18next";
import Router from "./router/index";
import { Layout, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  alignItems: "right",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  background: "none",
  display: "flex",
  justifyContent: "flex-end",
};

function App() {
  const Background: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(48deg, rgba(110,218,120,1) 0%, rgba(255,162,0,1) 80%)",
    height: "100vh",
  };
  const { t, i18n } = useTranslation();
  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={(e) => changeLanguageHandler("th")}>ไทย</div>,
    },
    {
      key: "2",
      label: <div onClick={(e) => changeLanguageHandler("en")}>Eng</div>,
    },
  ];

  return (
    <div style={Background}>
      <Header style={headerStyle}>
        <Dropdown
          trigger={["click"]}
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["1"],
          }}
        >
          <Button>Selectable</Button>
        </Dropdown>
        <Link to="/">{t("home")}</Link>
      </Header>
      <Content style={{ display: "flex", justifyContent: 'center' }}>
        <Router />
      </Content>
    </div>
  );
}

export default App;
