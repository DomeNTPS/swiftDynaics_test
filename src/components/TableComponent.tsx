import { useState } from "react";
import type { TableProps } from "antd";
import { Table } from "antd";
import type {
  ColumnsType,
  SorterResult,
  TableRowSelection,
} from "antd/es/table/interface";
import { DataType } from "../types/interface";
import { selectItem } from "features/userDataSlice";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { useTranslation } from "react-i18next";

const TableComponent = (data: any) => {
  const { t } = useTranslation();
  console.log(data, data.userData);

  const ids = data.userData.map((i: any) => i.username);
  console.log(ids);
  const filtered = data.userData.filter(
    (i: any, index: number) => !ids.includes(i.username, index + 1)
  );

  console.log(filtered);

  const selected = useAppSelector((state) => state.dataManage.selectedData);
  console.log(selected);
  const dispatch = useAppDispatch();

  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: t("firstname"),
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === "username" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => {
        if (a.gender < b.gender) {
          return -1;
        }
        if (a.gender > b.gender) {
          return 1;
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === "gender" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("telephone_number"),
      dataIndex: "telephone",
      key: "telephone",
      sorter: (a, b) => {
        if (a.telephone.number < b.telephone.number) {
          return -1;
        }
        if (a.telephone.number > b.telephone.number) {
          return 1;
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === "telephone" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a, b) => {
        if (a.nationality < b.nationality) {
          return -1;
        }
        if (a.nationality > b.nationality) {
          return 1;
        }
        return 0;
      },
      sortOrder:
        sortedInfo.columnKey === "nationality" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    dispatch(selectItem(newSelectedRowKeys))
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div style={{ maxWidth: "600px" }}>
      <Table
        columns={columns}
        dataSource={filtered}
        onChange={handleChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default TableComponent;
