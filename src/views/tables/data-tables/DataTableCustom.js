import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import DataTableBasic from "./DataTableBasic";
import DataTableSale from "./DataTableSale";
import DataTableOthers from "./DataTableOthers";
import DataTableInbouds from "./DataTableInbounds";
import { Star, Search } from "react-feather";

const res = [
  {
    masterSKU: "mst-moft-laptop-stand-dark-grey",
    inventory_details: {
      inbounds: [],
      sales: [
        {
          storename: "interstellargoods.myshopify.com",
          qty: 9,
        },
      ],
      other_use: [],
    },
    balance_stock_left: -9,
  },
  {
    masterSKU: "mst-skinners-M-black-blue",
    inventory_details: {
      inbounds: [],
      sales: [],
      other_use: [],
    },
    balance_stock_left: 0,
  },
  {
    masterSKU: "mst-determinant-face-mask-white",
    inventory_details: {
      inbounds: [],
      sales: [
        {
          storename: "interstellargoods.myshopify.com",
          qty: 231,
        },
      ],
      other_use: [],
    },
    balance_stock_left: -231,
  },
  {
    masterSKU: "mst-det-all-occasion-smart-shirt-pblue-reg-39",
    inventory_details: {
      inbounds: [],
      sales: [],
      other_use: [],
    },
    balance_stock_left: 0,
  },
];
const CustomHeader = (props) => {
  return <></>;
};

class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "Inbounds",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => <DataTableInbouds />,
      },
      {
        name: "Sales",
        selector: "date",
        sortable: true,
        cell: (row) => <DataTableSale />,
      },
      {
        name: "Other uses",
        selector: "status",
        sortable: true,
        cell: (row) => <DataTableOthers />,
      },
    ],
    data: [
      {
        name: res[0].masterSKU,
      },
    ],
    filteredData: [],
    value: "",
  };

  handleFilter = (e) => {
    let value = e.target.value;
    let data = this.state.data;
    let filteredData = this.state.filteredData;
    this.setState({ value });

    if (value.length) {
      filteredData = data.filter((item) => {
        let startsWithCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase());
        let includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.date.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.revenue.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition;
        } else return null;
      });
      this.setState({ filteredData });
    }
  };

  render() {
    let { data, columns, value, filteredData } = this.state;
    return (
      <Card>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={columns}
            noHeader
            subHeader
            subHeaderComponent={
              <CustomHeader value={value} handleFilter={this.handleFilter} />
            }
          />
        </CardBody>
      </Card>
    );
  }
}

export default DataTableCustom;
