import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";
import SimpleTable from "../react-tables/SimpleTable";
import D from "./customDT.module.css";

const columns = [
  {
    name: "Date",
    selector: "id",
    sortable: true,
    center: true,
  },
  {
    name: "Current Location",
    selector: "first_name",
    sortable: true,
    center: true,
  },
  {
    name: "Qty",
    selector: "first_name",
    sortable: true,
    center: true,
    wrap: true,
  },
];

const data = [
  {
    id: 1,
    first_name: "Alyss",
    last_name: "Lillecrop",
    email: "alillecrop0@twitpic.com",
    gender: "Female",
  },
];

class DataTableInbounds extends React.Component {
  render() {
    return (
      <Card>
        <h2 className={D.headers}>Inbounds</h2>
        <CardBody>
          <DataTable data={data} columns={columns} center noHeader background />
        </CardBody>
      </Card>
    );
  }
}

export default DataTableInbounds;
