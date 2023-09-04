import { useState, useEffect } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Space,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "features/saveDataSlice";
import { getItem, clearAlltem, deleteItem } from "features/userDataSlice";
import dayjs from "dayjs";
import TableComponent from "components/TableComponent";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { UserInterface } from "types/interface";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const PersonalDataStorage = () => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const data = useAppSelector((state) => state.manage.data);
  console.log(data);
  const rawData = useAppSelector((state) => state.dataManage.data);
  console.log(rawData);
  const dispatch = useAppDispatch();
  const clearData = () => {
    dispatch(clearAlltem());
    console.log(localStorage, rawData);
  };
  const deleteData = () => {
    dispatch(deleteItem());
    console.log(localStorage, rawData);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values, values.dateOfBirth);
    const data = {
      ...values,
      key: values.username,
      dateOfBirth: dayjs(
        `${
          values.dateOfBirth.$Y - values.dateOfBirth.$M - values.dateOfBirth.$D
        }`
      ).format("D/M/YYYY"),
    };
    console.log(data);
    dispatch(addItem(data));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // let rawKeys = [];
    const getUserData = () => {
      console.log("get");

      const keys = Object.keys(localStorage);
      const rawKeys = keys.filter((i) => i.includes("user:"));
      console.log(rawKeys);
      rawKeys.forEach((i) => {
        console.log(JSON.parse(localStorage.getItem(i) as string));
        console.log("dispatch");
        console.log(rawData.length , rawKeys.length)
        if (rawKeys.length > rawData.length) {

          dispatch(getItem(JSON.parse(localStorage.getItem(i) as string)));
        }
      });
    };
    

    getUserData();

  }, [data, dispatch,  rawData.length]);

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label={`${t("name_title")}`}
          name="nameTitles"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="mr">Mr.</Select.Option>
            <Select.Option value="mrs">Mrs.</Select.Option>
            <Select.Option value="ms">Ms.</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={`${t("firstname")}`}
          name="username"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={`${t("lastname")}`} name="surname" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={`${t("date_of_birth")}`}
          name="dateOfBirth"
          rules={[{ required: true }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          label={`${t("nationality")}`}
          name="nationality"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="th">Thai</Select.Option>
            <Select.Option value="en">English</Select.Option>
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="National ID"
          name="nationalID"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "13%" }} type="number" maxLength={1} /> -{" "}
          <Input style={{ width: "15%" }} maxLength={4} /> -{" "}
          <Input style={{ width: "17%" }} maxLength={5} /> -{" "}
          <Input style={{ width: "11%" }} maxLength={2} /> -{" "}
          <Input style={{ width: "9%" }} maxLength={1} />
        </Form.Item> */}
        <Form.Item label={`${t("gender")}`} name="gender" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={`${t("telephone_number")}`} rules={[{ required: true }]}>
          <Space.Compact>
            <Form.Item name={["telephone", "code"]} noStyle>
              <Select style={{ width: "40%" }}>
                <Option value="+66">+66</Option>
                <Option value="+1">+1</Option>
              </Select>
            </Form.Item>
            <Form.Item name={["telephone", "number"]} noStyle>
              <Input />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item label={`${t("passport")}`} name="passport">
          <Input />
        </Form.Item>
        <Form.Item
          label={`${t("expect_salary")}`}
          name="salary"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            {t("clear_data")}
          </Button>
          <Button type="primary" htmlType="submit">
          {t("submit")}
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={clearData}>Clear localStorage</Button>
      <Button onClick={deleteData}>{t("delete_data")}</Button>
      <TableComponent userData={rawData}  />
    </div>
  );
};

export default PersonalDataStorage;
