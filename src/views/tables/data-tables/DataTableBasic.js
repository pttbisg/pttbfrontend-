import React from "react"
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import DataTable from "react-data-table-component"
import SimpleTable from "../react-tables/SimpleTable"
const res = [
  {
    "masterSKU": "mst-moft-laptop-stand-dark-grey",
    "inventory_details": {
      "inbounds": [],
      "sales": [
        {
          "storename": "interstellargoods.myshopify.com",
          "qty": 9
        }
      ],
      "other_use": []
    },
    "balance_stock_left": -9
  },
  {
    "masterSKU": "mst-skinners-M-black-blue",
    "inventory_details": {
      "inbounds": [],
      "sales": [],
      "other_use": []
    },
    "balance_stock_left": 0
  },
  {
    "masterSKU": "mst-determinant-face-mask-white",
    "inventory_details": {
      "inbounds": [],
      "sales": [
        {
          "storename": "interstellargoods.myshopify.com",
          "qty": 231
        }
      ],
      "other_use": []
    },
    "balance_stock_left": -231
  },
  {
    "masterSKU": "mst-det-all-occasion-smart-shirt-pblue-reg-39",
    "inventory_details": {
      "inbounds": [],
      "sales": [],
      "other_use": []
    },
    "balance_stock_left": 0
  }
]
const columns = [
  {
    name: "Id",
    selector: "id",
    sortable: true
  },
  {
    name: "First Name",
    selector: "first_name",
    sortable: true
  }
]

const data = [
  {
    id: 1,
    first_name: "Alyss",
    last_name: "Lillecrop",
    email: "alillecrop0@twitpic.com",
    gender: "Female"
  },
  {
    id: 2,
    first_name: "Shep",
    last_name: "Pentlow",
    email: "spentlow1@home.pl",
    gender: "Male"
  }
]

class DataTableBasic extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
        </CardHeader>
        <CardBody>
          <DataTable data={data} columns={columns} noHeader />
        </CardBody>
      </Card>
    )
  }
}

export default DataTableBasic
