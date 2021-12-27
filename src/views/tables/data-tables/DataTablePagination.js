import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import { MapPin, Calendar, Package, ChevronUp } from "react-feather";
import D from "./customDT.module.css";
import "./global.css";

function DataTablePagination(props) {
  const [show, setShow] = useState(false);
  const [columns, setColumns] = useState(
    window.innerWidth > 560
      ? [
          {
            name: "Date",
            selector: "date",

            sortable: true,
          },
          {
            name: "Current LocationPagination",
            selector: "location",

            sortable: true,
          },
          {
            name: "Qty",
            selector: "qty",

            sortable: true,
          },
        ]
      : [
          {
            name: "Info",
            id: "info",
            sortable: true,
            cell: (row) => (
              <div className="d-flex my-0 w-10 flex-wrap flex-column">
                <div className={D.col}>
                  <span className={`${D.Title} ${D.locationSVG}`}>
                    <MapPin size={20} />
                  </span>
                  <span className={D.location}>{row.current_location}</span>
                </div>
                <div className={D.col}>
                  <span className={D.Title}>
                    <Calendar size={20} />
                  </span>

                  <span className={D.date}>{row.date}</span>
                </div>
                <div className={D.colQty}>
                  <span className={D.Title}>
                    <Package size={20} />
                  </span>
                  <span className={D.qty}>{row.qty}</span>
                </div>
              </div>
            ),
          },
        ]
  );
  //===========
  //const { data } = this.state.data;
  //==========

  //const [data, setData] = useState(props.data.inventory_details.inbounds);

  console.log(props.data[0]);

  return (
    <div>
      <div
        className="d-flex flex-row gap-3 cursor-pointer bg-transparent"
        onClick={() => {
          setShow(!show);
        }}
      >
        <ChevronUp
          size={20}
          style={{
            transition: ".15s",
            transform: show ? "rotate(180deg)" : "rotate(90deg)",
          }}
        />
        <p className={`text-capitalize text-bold-600 ml-1 ${D.bounds}`}>
          inbounds
        </p>
      </div>
      <div>
        {show && (
          <React.Fragment>
            <DataTable
              data={props.data}
              columns={columns}
              noHeader
              responsive
              striped={window.innerWidth < 560}
              highlightOnHover
              pagination={props.data.length > 10}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default DataTablePagination;
