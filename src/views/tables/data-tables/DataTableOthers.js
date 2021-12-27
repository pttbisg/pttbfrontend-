import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";
import SimpleTable from "../react-tables/SimpleTable";
import D from "./customDT.module.css";

const columns = [
  {
    name: "Reason",
    selector: "id",
    sortable: true,
    center: true,
  },
  {
    name: "Qty",
    selector: "first_name",
    sortable: true,
    center: true,
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
  {
    id: 2,
    first_name: "Shep",
    last_name: "Pentlow",
    email: "spentlow1@home.pl",
    gender: "Male",
  },
];

class DataTableOther extends React.Component {
  render() {
    return (
      <Card>
        <h2 className={D.headers}>Other Reasons</h2>
        <CardBody >
          <DataTable data={data} columns={columns} center noHeader />
        </CardBody>
      </Card>
    );
  }
}

export default DataTableOther;
