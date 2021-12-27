import React, { useEffect, useState } from "react";
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

import {
  Star,
  Search,
  MapPin,
  Calendar,
  Package,
  ShoppingCart,
  HelpCircle,
  ChevronUp,
} from "react-feather";
import D from "./customDT.module.css";
import "./customDT.module.css";
import "./global.css";

function DataTableCustomBK(props) {
  const [columns, setColumns] = useState([
    {
      name: "Sales",
      selector: "sales",
      id: "sales",
      sortable: true,
      maxWidth: "33%",
      cell: (row) => (
        <div className={D.SalesHolder}>
          <div className={D.col}>
            <span className={D.Title}>
              <ShoppingCart size={20} />{" "}
            </span>

            <span className={D.reason}>{row.storename}</span>
          </div>
          <div className={D.colQty}>
            <span className={D.Title}>
              <Package size={20} />
            </span>
            <span className={D.otherQty}>{row.saleQty}</span>
          </div>
        </div>
      ),
    },
    {
      name: "Other reasons",
      selector: "others",
      id: "others",

      sortable: true,
      cell: (row) => (
        <div>
          {(row.reason || row.otherQty) && (
            <div>
              <div className={D.col}>
                <span className={D.Title}>
                  <HelpCircle size={20} />
                </span>

                <span className={D.reason}>{row.reason}</span>
              </div>
              <div className={D.colQty}>
                <span className={D.Title}>
                  <Package size={20} />
                </span>
                <span className={D.otherQty}>{row.otherQty}</span>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ]);
  const [data, setData] = useState([
    {
      date: "2015-10-2",
      currentLocation: "london",
      qty: "5",
      storename: "interstellargoods",
      saleQty: 9,
      reason: "damaged",
      otherQty: 9,
    },
    {
      date: "2015-10-2",
      currentLocation: "Cairo",
      qty: "5",
      storename: "interstellargoods",
      saleQty: 9,
      reason: "damaged",
      otherQty: 9,
    },
    {
      date: "2015-10-2",
      currentLocation: "Cairo",
      qty: "5",
      storename: "interstellargoods",
      saleQty: 9,
      reason: "damaged",
      otherQty: 9,
    },
  ]);
  const [saleCol, setSaleCol] = useState([
    {
      name: "Sales",
      selector: "sales",
      id: "sales",
      sortable: true,

      cell: (row) => (
        <div className={D.SalesHolder}>
          <div className={D.col}>
            <span className={D.Title}>
              <ShoppingCart size={20} />{" "}
            </span>

            <span className={D.reason}>{row.storename}</span>
          </div>
          <div className={D.colQty}>
            <span className={D.Title}>
              <Package size={20} />
            </span>
            <span className={D.otherQty}>{row.saleQty}</span>
          </div>
        </div>
      ),
    },
  ]);
  const [otherCol, setOtherCol] = useState([
    {
      name: "Other reasons",
      selector: "others",
      id: "others",
      sortable: true,
      cell: (row) => (
        <div>
          {(row.reason || row.otherQty) && (
            <div>
              <div className={D.col}>
                <span className={D.Title}>
                  <HelpCircle size={20} />
                </span>

                <span className={D.reason}>{row.reason}</span>
              </div>
              <div className={D.colQty}>
                <span className={D.Title}>
                  <Package size={20} />
                </span>
                <span className={D.otherQty}>{row.otherQty}</span>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ]);
  const [show, setShow] = useState(true);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);
  return (
    <div className={D.customTable}>
      <div
        className="d-flex flex-row gap-3 cursor-pointer  "
        onClick={() => {
          setShow(!show);
        }}
      >
        {" "}
        <ChevronUp
          size={20}
          style={{
            fontSize: "1rem",
            transition: ".15s",
            transform: show ? "rotate(180deg)" : "rotate(90deg)",
          }}
        />
        <p className={`text-capitalize text-bold-600 ml-1 ${D.bounds}`}>
          OutBounds
        </p>
      </div>
      <div>
        {width > 650 && show ? (
          <>
            <DataTable
              className="dataTable-custom"
              data={data}
              columns={columns}
              responsive
              highlightOnHover
              fixedHeader
              noHeader
            />
          </>
        ) : (
          show && (
            <>
              <DataTable
                className="dataTable-custom"
                data={data}
                columns={saleCol}
                responsive
                highlightOnHover
                fixedHeader
                noHeader
              />
              <DataTable
                className="dataTable-custom"
                data={data}
                columns={otherCol}
                responsive
                highlightOnHover
                fixedHeader
                noHeader
              />
            </>
          )
        )}
      </div>
    </div>
  );
}

export default DataTableCustomBK;

/* search mechanism 
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



*/
/*inbounds column */
// {
//   name: "Inbounds",
//   selector: "name",
//   sortable: true,
//   minWidth: "200px",
//   minHeight: "200px",
//   cell: (row) => (
//     <div className={D.inbounds}>
//       <div className={D.col}>
//         <span className={`${D.Title} ${D.locationSVG}`}><MapPin size={20}/></span>
//         <span className={D.location}>{row.currentLocation}</span>
//       </div>
//       <div className={D.col}>
//         <span className={D.Title}><Calendar size={20}/></span>

//         <span className={D.date}>{row.date}</span>
//       </div>
//       <div className={D.colQty}>
//         <span className={D.Title}><Package size={20} /></span>
//         <span className={D.qty}>{row.qty}</span>
//       </div>
//     </div>
//   ),
// },
