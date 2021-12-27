import React from "react";
import { Card, CardBody, Row, Col, Input, Button } from "reactstrap";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { RefreshCcw, X, ChevronDown, ChevronUp } from "react-feather";
import "../../../assets/scss/pages/invoice.scss";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../../assets/scss/plugins/extensions/react-tables.scss";
import { getInventoryData } from "../../../redux/actions/inventory";
import { connect } from "react-redux";
import { generateInventoryData } from "../../tables/react-tables/TableData";
import FuzzySearch from "react-fuzzy";

const makeDefaultState = () => ({
  data: [],
  sorted: [],
  page: 0,
  pageSize: 10,
  expanded: {},
  resized: [],
  filtered: [],
  isLoading: false,
});

class Inventory extends React.Component {
  state = makeDefaultState();

  resetState = () => {
    this.setState(makeDefaultState());
  };

  getInventory = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      isLoading: true,
    });
    this.props.getInventoryData(user, (res) => {
      if (res && res.length > 0) {
        const data = generateInventoryData(res);
        this.setState({
          data: data,
          isLoading: false,
        });
      } else {
        this.setState({
          data: [],
          isLoading: false,
        });
      }
    });
  };

  clearTable = () => {
    this.setState({
      data: [],
    });
  };

  renderSwitch(key, expanded, param, rowData) {
    switch (key) {
      case "inbounds":
        return (
          <React.Fragment>
            <div
              onClick={() => this.onExpanded(rowData, key, expanded)}
              className="title text-bold-600 text-left"
              style={{ minWidth: 300 }}
            >
              <span style={{ cursor: "pointer" }}>
                {expanded ? <ChevronUp /> : <ChevronDown />} Inbounds
                <span className="mx-1 badge badge-primary badge-pill">
                  {param && param.length > 0 ? param.length : 0}
                </span>
              </span>
            </div>
            {expanded && (
              <ReactTable
                data={param}
                columns={[
                  {
                    Header: "Date",
                    accessor: "date",
                  },
                  {
                    Header: "Current Location",
                    accessor: "current_location",
                  },
                  {
                    Header: "Qty",
                    accessor: "qty",
                  },
                ]}
                showPaginationBottom={false}
                defaultPageSize={3}
                className="-striped -highlight w-full"
              />
            )}
          </React.Fragment>
        );
      case "sales":
        return (
          <React.Fragment>
            <div
              onClick={() => this.onExpanded(rowData, key, expanded)}
              className="title text-bold-600 text-left"
              style={{ minWidth: 300 }}
            >
              <span style={{ cursor: "pointer" }}>
                {expanded ? <ChevronUp /> : <ChevronDown />} Sales
                <span className="mx-1 badge badge-primary badge-pill">
                  {param && param.length > 0 ? param.length : 0}
                </span>
              </span>
            </div>
            {expanded && (
              <ReactTable
                data={param}
                columns={[
                  {
                    Header: "Store Name",
                    accessor: "storename",
                  },
                  {
                    Header: "Qty",
                    accessor: "qty",
                  },
                ]}
                showPaginationBottom={false}
                defaultPageSize={3}
                className="-striped -highlight w-full"
              />
            )}
          </React.Fragment>
        );
      case "other_use":
        return (
          <React.Fragment>
            <div
              onClick={() => this.onExpanded(rowData, key, expanded)}
              className="title text-bold-600 text-left"
              style={{ minWidth: 300 }}
            >
              <span style={{ cursor: "pointer" }}>
                {expanded ? <ChevronUp /> : <ChevronDown />} Other Use
                (Non-Sales)
                <span className="mx-1 badge badge-primary badge-pill">
                  {param && param.length > 0 ? param.length : 0}
                </span>
              </span>
            </div>
            {expanded && (
              <ReactTable
                data={param}
                columns={[
                  {
                    Header: "Reason",
                    accessor: "reason",
                  },
                  {
                    Header: "Qty",
                    accessor: "qty",
                  },
                ]}
                showPaginationBottom={false}
                defaultPageSize={3}
                className="-striped -highlight w-full"
              />
            )}
          </React.Fragment>
        );
      default:
        break;
    }
  }

  onExpanded = (rowData, key, expanded) => {
    let { data } = this.state;
    data = data.map((e) => {
      if (e.masterSKU === rowData.masterSKU) {
        e.inventory_details[key].expanded = !expanded;
      }
      return {
        ...e,
      };
    });

    this.setState({
      data: data,
    });
  };

  componentDidMount() {
    this.getInventory();
  }

  setSelectedItem = (items) => {};

  render() {
    const { data, isLoading } = this.state;

    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Inventory"
          breadCrumbParent="Pages"
          breadCrumbActive="Inventory"
        />
        <Row>
          <Col
            className="d-flex flex-column flex-md-row justify-content-end invoice-header mb-1"
            md="7"
            sm="12"
          >
            <Button
              disabled={isLoading}
              className="mr-1 mb-md-0 mb-1"
              color="primary"
              onClick={() => this.getInventory()}
            >
              {isLoading ? (
                <span>Getting Data...</span>
              ) : (
                <React.Fragment>
                  <RefreshCcw size="15" />
                  <span className="align-middle ml-50">Refresh Data</span>
                </React.Fragment>
              )}
            </Button>
            <Button
              className="mr-1 mb-md-0 mb-1"
              color="primary"
              onClick={() => this.clearTable()}
            >
              <X size="15" />
              <span className="align-middle ml-50">Clear</span>
            </Button>
          </Col>
          <Col className="d-flex flex-wrap justify-content-between mb-1">
            <div className="table-input mr-1">
              <Input
                placeholder="search..."
                onChange={(e) => this.updateSearchQuery(e.target.value)}
                value={this.state.value}
              />
            </div>
            <div className="export-btn">
              <Button.Ripple
                color="primary"
                onClick={() => this.gridApi.exportDataAsCsv()}
              >
                Export as CSV
              </Button.Ripple>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="invoice-wrapper" sm="12">
            <Card className="invoice-page">
              <CardBody>
                {data && data.length > 0 ? (
                  <ReactTable
                    TheadComponent={(props) => null}
                    data={data}
                    columns={[
                      {
                        Header: "Name",
                        accessor: "masterSKU",
                        enableRowSpan: true,
                        Cell: (props) => {
                          const rowData = props.original;
                          const childData = rowData.inventory_details;
                          let childTbData = Object.keys(childData).map(
                            (key) => {
                              return {
                                name: key,
                                expanded: childData[key].expanded,
                                children: childData[key].child,
                              };
                            }
                          );
                          return (
                            <div>
                              <div className="text-bold-600 text-left navbar-light pt-1 pb-1 px-1 mb-1">
                                {rowData.masterSKU}
                              </div>
                              <div className="">
                                {childTbData.map((item) => {
                                  return (
                                    <div
                                      key={item.name}
                                      className="d-flex flex-column flex-md-column mb-2"
                                    >
                                      {this.renderSwitch(
                                        item.name,
                                        item.expanded,
                                        item.children,
                                        rowData
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="d-flex flex-column flex-md-row justify-content-end navbar-light pt-1 pb-1 px-1">
                                <div className="title text-bold-600 mx-5">
                                  Balance Stock Left
                                </div>
                                <div className="title text-bold-600">
                                  {rowData.balance_stock_left}
                                </div>
                              </div>
                            </div>
                          );
                        },
                      },
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight w-full"
                    // Controlled props
                    page={this.state.page}
                    pageSize={this.state.pageSize}
                    // Callbacks
                    onPageChange={(page) => this.setState({ page })}
                    onPageSizeChange={(pageSize, page) =>
                      this.setState({ page, pageSize })
                    }
                  />
                ) : isLoading ? (
                  "Getting Data"
                ) : (
                  "No Data"
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};
export default connect(mapStateToProps, { getInventoryData })(Inventory);
