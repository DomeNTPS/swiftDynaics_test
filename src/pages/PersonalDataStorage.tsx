import { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from "antd";
import { addItem } from "features/saveDataSlice";
import { getItem, deleteItem } from "features/userDataSlice";
import dayjs from "dayjs";
import TableComponent from "components/TableComponent";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { useTranslation } from "react-i18next";
import "../styles/css/form.css";

const { Option } = Select;

const PersonalDataStorage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const data = useAppSelector((state) => state.manage.data);
  const rawData = useAppSelector((state) => state.dataManage.data);
  const dispatch = useAppDispatch();
  const deleteData = () => {
    dispatch(deleteItem());
  };
  const onFinish = (values: any) => {
    console.log("Success:", values, values.dateOfBirth);
    const data = {
      ...values,
      telephone: values.telephone.code + values.telephone.number,
      key: values.username,
      dateOfBirth: dayjs(
        `${
          values.dateOfBirth.$Y - values.dateOfBirth.$M - values.dateOfBirth.$D
        }`
      ).format("D/M/YYYY"),
    };
    dispatch(addItem(data));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const getUserData = () => {
      const keys = Object.keys(localStorage);
      const rawKeys = keys.filter((i) => i.includes("user:"));
      rawKeys.forEach((i) => {
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
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 15 }}
        style={{ maxWidth: 500 }}
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
          label={`${t("nationalID")}`}
          name="nationalID"
          rules={[{ required: true }]}
        >
          <Input type="number" inputMode="numeric" style={{ width: "10%" }} maxLength={1} /> -{" "}
          <Input type="number" inputMode="numeric" style={{ width: "15%" }} maxLength={4} /> -{" "}
          <Input type="number" inputMode="numeric" style={{ width: "17%" }} maxLength={5} /> -{" "}
          <Input type="number" inputMode="numeric" style={{ width: "11%" }} maxLength={2} /> -{" "}
          <Input type="number" inputMode="numeric" style={{ width: "9%" }} maxLength={1} />
        </Form.Item> */}
        <Form.Item label={`${t("gender")}`} name="gender" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="men"> {t('men')} </Radio>
            <Radio value="women"> {t('women')} </Radio>
            <Radio value="not_to_state"> {t('not_to_state')} </Radio>
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
              <Input type="number" inputMode="numeric" style={{ width: '100%' }} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item label={`${t("passport")}`} name="passport">
          <Input type="number" inputMode="numeric" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={`${t("expect_salary")}`}
          name="salary"
          rules={[{ required: true }]}
        >
          <Input type="number" inputMode="numeric" style={{ width: '100%' }}/>
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
      <Button onClick={deleteData}>{t("delete_data")}</Button>
      <TableComponent userData={rawData}  />
    </div>
  );
};

export default PersonalDataStorage;
