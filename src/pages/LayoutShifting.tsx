import React from "react";
import { Layout, Space, Divider, Button, Row, Col } from "antd";
import "../styles/css/shape.css";

const { Content } = Layout;

const LayoutShifting = () => {
  const shapeList = [
    "square",

    "circle",

    "oval",

    "trapezoid",

    "rectangle",

    "parallelogram",
  ];
  const [shape, setShape] = React.useState(shapeList);

  React.useEffect(() => {}, [shape]);

  const prevSlide = () => {
    setShape(shape.concat(shape.shift() as string));
  };

  const nextSlide = () => {
    const lastShape = shape.pop() as string;
    setShape([lastShape].concat(shape));
  };

  const swap = () => {
    const x = shape.splice(0, shape.length / 2);
    setShape(shape.concat(x));
  };

  const shuffleArray = () => {
    const shuffle = shape.sort(() => Math.random() - 0.5);
    console.log(shuffle);
    setShape(shuffle);
  };
  return (
    <div>
      <Content>
        <Button className="button" onClick={prevSlide}>
          <div className="triangle-left"></div>
        </Button>
        <Button className="button" onClick={swap}>
          <div className="triangle-up"></div>
        </Button>
        <Button className="button" onClick={swap}>
          <div className="triangle-down"></div>
        </Button>
        <Button className="button" onClick={nextSlide}>
          <div className="triangle-right"></div>
        </Button>
        <Row gutter={[16, 24]} style={{ maxWidth: "700px" }} >
          {shape.map((item, idx) => {
            return (
              <Col key={idx}>
                <Button  className="background" onClick={shuffleArray}>
                  <div style={{ margin: "20px" }} className={`${item}`} />
                </Button>
              </Col>
            );
          })}
        </Row>
      </Content>
    </div>
  );
};

export default LayoutShifting;
