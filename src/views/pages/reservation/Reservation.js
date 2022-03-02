import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Card, CardBody, Input, Button, Col } from "reactstrap";
import { RefreshCcw } from "react-feather";
import "../../../assets/scss/pages/invoice.scss";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { inventoryByUser } from "../../../redux/actions/inventory";
import CustomLoadingCellRenderer from "./CustomLoadingCellRenderer";
import MasterSKUCustomCellRenderer from "./MasterSKUCustomCellRenderer";
import ReservationOrder from "./ReservationOrder";
import "../../../assets/scss/pages/invoice.scss";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../../assets/scss/plugins/extensions/react-tables.scss";

class Reservation extends React.Component {
  state = {
    selector: 2,
    clickedID: [],
    displayInbounds: false,
    data: [],
    dataExport: [],
    isLoading: false,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    context: { componentParent: this },
    frameworkComponents: {
      customLoadingCellRenderer: CustomLoadingCellRenderer,
      masterSKUCustomCellRenderer: MasterSKUCustomCellRenderer,
    },
    loadingCellRenderer: "customLoadingCellRenderer",
    loadingCellRendererParams: { loadingMessage: "One moment please..." },
    getRowHeight: function (params) {
      return 250;
    },
    isFullWidthCell: function (rowNode) {
      return true;
    },
    fullWidthCellRenderer: "masterSKUCustomCellRenderer",
    isLoading: false,
    modal: false,
    fileName: "",
    fileFormat: "csv",
    dataExport: [],
  };

  componentDidMount() {
    this.getInventory();
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  getInventory = () => {
    this.setState({
      isLoading: true,
    });
    this.props.inventoryByUser((res) => {
      if (res && res.length > 0) {
        this.setState({
          data: res,
          dataExport: [],
          isLoading: false,
        });
      } else {
        this.setState({
          data: [],
          dataExport: [],
          isLoading: false,
        });
      }
    });
  };

  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
    let gridRowNode = this.gridApi.getModel();
    let filteredData = [];
    if (gridRowNode) {
      let rows = gridRowNode.rowsToDisplay;
      rows.map((r) => {
        filteredData.push(r.data);
      });
      this.setState({
        data: filteredData,
      });
    }
  };

  filterAvailableMasterSKU = (array) => {
    return array.filter((item) => item.quantity > 0);
  };

  render() {
    let { data, isLoading } = this.state;

    data = this.filterAvailableMasterSKU(data);

    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Reservation"
          breadCrumbParent="Pages"
          breadCrumbActive="Reservation"
        />
        <Col className="invoice-wrapper" sm="12">
          <Card className="invoice-page overflow-hidden agGrid-card">
            <CardBody className="py-0">
              <div className="ag-theme-material w-100 my-2">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mb-1">
                    <Button
                      disabled={isLoading}
                      className="mr-1 mb-md-0 mb-1"
                      color="primary"
                      onClick={() => this.getInventory()}
                    >
                      <React.Fragment>
                        <RefreshCcw size="15" />
                        <span className="align-middle ml-50">Refresh Data</span>
                      </React.Fragment>
                    </Button>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder="search..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>
                  </div>
                </div>

                <>
                  {data && data.length > 0 ? (
                    <ReactTable
                      data={data}
                      ref={(instance) => {
                        this.tableRef = instance;
                      }}
                      columns={[
                        {
                          Header: "Master SKU",
                          accessor: "masterSKU",
                        },
                        {
                          Header: "Balance Stock Left",
                          accessor: "quantity",
                        },
                        {
                          Cell: ({ original }) => {
                            return (
                              <ReservationOrder
                                {...original}
                                setState={this.setState.bind(this)}
                                data={data}
                              />
                            );
                          },
                        },
                      ]}
                      defaultPageSize={5}
                      className="striped highlight w-full"
                      page={this.state.page}
                      pageSize={this.state.pageSize}
                      onPageChange={(page) => this.setState({ page })}
                      onPageSizeChange={(pageSize, page) =>
                        this.setState({ page, pageSize })
                      }
                    />
                  ) : isLoading ? (
                    <div className="text-center">Getting Data...</div>
                  ) : (
                    <div className="text-center">No Data</div>
                  )}
                </>
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};
export default connect(mapStateToProps, { inventoryByUser })(Reservation);
