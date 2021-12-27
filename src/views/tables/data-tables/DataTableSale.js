import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";
import SimpleTable from "../react-tables/SimpleTable";
import D from "./customDT.module.css";

const columns = [
  {
    name: "Store Name",
    selector: "name",
    sortable: true,
    center: true,
  },
  {
    name: "Qty",
    selector: "Qty",
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
];
function DataTableSale() {
  
  return (
    <Card>
      <h2 className={D.headers}>Sales</h2>

      <CardBody>
        <DataTable data={data} columns={columns} noHeader />
      </CardBody>
    </Card>
  );
}

export default DataTableSale;
