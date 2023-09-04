import React from "react";
import { useTranslation } from "react-i18next";
import Router from "./router/index";
import { Layout, Button, Select } from "antd";
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
  const handleChange = (value: string) => {
    changeLanguageHandler(value);
  };

  return (
    <div style={Background}>
      <Header style={headerStyle}>
        <Select
          defaultValue="en"
          style={{ width: 120, height: 'fit-content' }}
          onChange={handleChange}
          options={[
            { value: "en", label: `${t("English")}` },
            { value: "th", label: `${t("Thai")}` },
          ]}
        />
        <Button>
          <Link to="/">{t("home")}</Link>
        </Button>
      </Header>
      <Content style={{ display: "flex", justifyContent: "center" }}>
        <Router />
      </Content>
    </div>
  );
}

export default App;
