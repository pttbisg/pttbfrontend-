import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import {
    Card,
    CardBody,
    Input,
    Button,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    CustomInput,
    Table
} from 'reactstrap'
import { AgGridReact } from 'ag-grid-react'
import { RefreshCcw, ChevronDown, ChevronUp } from 'react-feather'
import '../../../assets/scss/pages/invoice.scss'
import '../../../assets/scss/plugins/tables/_agGridStyleOverride.scss'
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb'
import { generateInventoryData, generateInventoryDataExport } from '../../tables/react-tables/TableData'
import { getInventoryData } from '../../../redux/actions/inventory'
import CustomLoadingCellRenderer from './CustomLoadingCellRenderer'
import MasterSKUCustomCellRenderer from './MasterSKUCustomCellRenderer'
import XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import "../../../assets/scss/pages/invoice.scss"
import ReactTable from "react-table"
import "react-table/react-table.css"
import "../../../assets/scss/plugins/extensions/react-tables.scss"

class Inventory extends React.Component {
    state = {
        data: null,
        agData: null,
        paginationPageSize: 20,
        currenPageSize: '',
        getPageSize: '',
        defaultColDef: {
            sortable: true,
            editable: false,
            resizable: false,
            suppressMenu: true,
            autoHeight: true
        },
        context: {componentParent: this},
        frameworkComponents: {
            customLoadingCellRenderer: CustomLoadingCellRenderer,
            masterSKUCustomCellRenderer: MasterSKUCustomCellRenderer
        },
        loadingCellRenderer: 'customLoadingCellRenderer',
        loadingCellRendererParams: { loadingMessage: 'One moment please...' },
        getRowHeight: function (params) {
            return 250;
        },
        isFullWidthCell: function (rowNode) {
            return true
        },
        fullWidthCellRenderer: 'masterSKUCustomCellRenderer',
        columnDefs: [
            {
                headerName: 'Name',
                field: 'masterSKU',
                width: 175,
                filter: false,
                checkboxSelection: false,
                headerCheckboxSelectionFilteredOnly: false,
                headerCheckboxSelection: false,
                cellRenderer: 'masterSKUCustomCellRenderer',
            }
        ],
        isLoading: false,
        modal: false,
        fileName: '',
        fileFormat: 'csv',
        dataExport: []
    }

    componentDidMount() {
        this.getInventory();
    }

    toggleModal = () => {
        this.renderTableData();
        this.setState({ modal: !this.state.modal })
    }

    handleExport = () => {
        this.toggleModal()
        let table = ReactDOM.findDOMNode(this.tableRef)
        let bookType = this.state.fileFormat.length ? this.state.fileFormat : 'xlsx'
        let wb = XLSX.utils.table_to_book(table, { sheet: 'Sheet JS' })
        let wbout = XLSX.write(wb, { bookType, bookSST: true, type: 'binary' })

        const s2ab = s => {
            var buf = new ArrayBuffer(s.length)
            var view = new Uint8Array(buf)
            for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
            return buf
        }
        let file =
            this.state.fileFormat.length && this.state.fileFormat.length
                ? `${this.state.fileName}.${this.state.fileFormat}`
                : this.state.fileName.length
                    ? `${this.state.fileName}.xlsx`
                    : this.state.fileFormat.length
                        ? `excel-sheet.${this.state.fileFormat}`
                        : 'excel-sheet.xlsx'

        return FileSaver.saveAs(
            new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
            file
        )
    }

    getInventory = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            isLoading: true
        })
        this.props.getInventoryData(user, res => {
            if (res && res.length > 0) {
                const data = generateInventoryData(res)
                const dataExport = generateInventoryDataExport(res)
                this.setState({
                    data: data,
                    agData: data,
                    dataExport: dataExport,
                    isLoading: false
                })
            } else {
                this.setState({
                    data: [],
                    dataExport: [],
                    isLoading: false
                })
            }
        });
    }

    onGridReady = params => {
        this.gridApi = params.api
        this.gridColumnApi = params.columnApi
        this.setState({
            currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
            getPageSize: this.gridApi.paginationGetPageSize(),
            totalPages: this.gridApi.paginationGetTotalPages()
        })
    }

    updateSearchQuery = val => {
        this.gridApi.setQuickFilter(val)
        let gridRowNode = this.gridApi.getModel();
        let filteredData = [];
        if(gridRowNode) {
            let rows = gridRowNode.rowsToDisplay;
            rows.map(r => {
                filteredData.push(r.data);
            })
            this.setState({
                data: filteredData
            })
        }
    }

    renderTableData = () => {
        let gridRowNode = this.gridApi.getModel();
        let rawData = [];
        let dataExport = [];
        if(gridRowNode) {
            let rows = gridRowNode.rowsToDisplay;
            rows.map(r => {
                let item = {
                    masterSKU: '',
                    inventory_details: {},
                    balance_stock_left: 0
                };

                item.masterSKU = r.data.masterSKU;
                item.inventory_details.inbounds = r.data.inventory_details.inbounds.child ? r.data.inventory_details.inbounds.child : [];
                item.inventory_details.sales = r.data.inventory_details.sales.child ? r.data.inventory_details.sales.child: [];
                item.inventory_details.other_use = r.data.inventory_details.other_use.child ? r.data.inventory_details.other_use.child : [];
                item.balance_stock_left = r.data.balance_stock_left;
                rawData.push(item);
            })
            dataExport = generateInventoryDataExport(rawData);
            this.setState({
                dataExport: dataExport
            })
        }
    }
    
    methodFromParent = (height, rowIndex) => {
        let agParent = document.getElementsByClassName("ag-full-width-container")[0];
        let agRows = document.getElementsByClassName("ag-row");
        let agCurrentRow = agRows[rowIndex];
        console.log(document.getElementsByClassName("ag-row"))
        let agParentH = agParent.offsetHeight;
        let agRowH = agCurrentRow.offsetHeight;
        agParent.style.height = `${(agParentH - agRowH) + height}px`;
        agCurrentRow.style.height = `${height}px`;

        for (let i = 0; i < agRows.length; i ++) {
            if(i === 0) {
                agRows[0].style.transform = `translateY(${0}px)`
            } else {
                agRows[i].style.height = `${height}px`;
                agRows[i].style.transform = `translateY(${height*i}px)`;
            }
        }
        for(let r of agRows) {
            console.log({
                h: r.style.height,
                tr: r.style.transform
            })
        }
    }

    renderSwitch(key, expanded, param, rowData) {
        switch (key) {
            case 'inbounds':
                return (
                    <React.Fragment>
                        <div onClick={() => this.onExpanded(rowData, key, expanded)} className="title text-bold-600 text-left" style={{ minWidth: 300 }}>
                            <span style={{ cursor: 'pointer' }}>{expanded ? <ChevronUp/> : <ChevronDown/>}  Inbounds 
                                <span className="mx-1 badge badge-primary badge-pill">{param && param.length > 0 ? param.length : 0}</span>
                            </span>
                        </div>
                        {expanded && <ReactTable
                            data={param}
                            columns={[
                                {
                                    Header: "Date",
                                    accessor: "date"
                            
                                },
                                {
                                    Header: "Current Location",
                                    accessor: "current_location"
                            
                                },
                                {
                                    Header: "Qty",
                                    accessor: "qty"
                            
                                }
                            ]}
                            showPaginationBottom={false}
                            defaultPageSize={3}
                            className="-striped -highlight w-full"
                        />   }
                    </React.Fragment>
                )
            case 'sales':
                return (
                    <React.Fragment>
                        <div onClick={() => this.onExpanded(rowData, key, expanded)} className="title text-bold-600 text-left" style={{ minWidth: 300 }}>
                            <span style={{ cursor: 'pointer' }}>{expanded ? <ChevronUp/> : <ChevronDown/>} Sales 
                                <span className="mx-1 badge badge-primary badge-pill">{param && param.length > 0 ? param.length : 0}</span>
                            </span>
                        </div>
                        {expanded && <ReactTable
                            data={param}
                            columns={[
                                {
                                    Header: "Store Name",
                                    accessor: "storename"
                            
                                },
                                {
                                    Header: "Qty",
                                    accessor: "qty"
                            
                                }
                            ]}
                            showPaginationBottom={false}
                            defaultPageSize={3}
                            className="-striped -highlight w-full"
                        />   }  
                    </React.Fragment>
                )
            case 'other_use':
                return (
                    <React.Fragment>
                        <div onClick={() => this.onExpanded(rowData, key, expanded)} className="title text-bold-600 text-left" style={{ minWidth: 300 }}>
                            <span style={{ cursor: 'pointer' }}>{expanded ? <ChevronUp/> : <ChevronDown/>} Other Use (Non-Sales) 
                                <span className="mx-1 badge badge-primary badge-pill">{param && param.length > 0 ? param.length : 0}</span>
                            </span>
                        </div>
                        {expanded && <ReactTable
                            data={param}
                            columns={[
                                {
                                    Header: "Reason",
                                    accessor: "reason"
                            
                                },
                                {
                                    Header: "Qty",
                                    accessor: "qty"
                            
                                }
                            ]}
                            showPaginationBottom={false}
                            defaultPageSize={3}
                            className="-striped -highlight w-full"
                        />}    
                    </React.Fragment> 
                )
            default:
                break;
        }
    }

    onExpanded = (rowData, key, expanded) => {
        let { data } = this.state;
        data = data.map(e => {
            if(e.masterSKU === rowData.masterSKU){
                e.inventory_details[key].expanded = !expanded;
            }
            return {
                ...e
            }
        })
        
        this.setState({
            data: data
        })
    }

    render() {
        const { agData, data, columnDefs, defaultColDef, isLoading, dataExport } = this.state;
        let renderTableData = dataExport.map(col => {
            return (
            <tr key={`${col.masterSKU}&${col.balanceStockLeft*Math.random()}&${new Date().getTime()}`}>
                <td>{col.masterSKU}</td>
                <td>{col.inboundLocation}</td>
                <td>{col.inboundDate}</td>
                <td>{col.inboundQty}</td>
                <td>{col.saleStoreName}</td>
                <td>{col.saleQty}</td>
                <td>{col.otherUseReason}</td>
                <td>{col.otherUsrQty}</td>
                <td>{col.balanceStockLeft}</td>
            </tr>
            )
        })

        return (
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbTitle='Inventory'
                    breadCrumbParent='Pages'
                    breadCrumbActive='Inventory'
                />
                <Col className='invoice-wrapper' sm='12'>
                    <Card className='invoice-page overflow-hidden agGrid-card'>
                        <CardBody className='py-0'>
                            <div className='ag-theme-material w-100 my-2'>
                                <div className='d-flex flex-wrap justify-content-between align-items-center'>
                                    <div className='mb-1'>
                                    <Button
                                        disabled={isLoading}
                                        className='mr-1 mb-md-0 mb-1'
                                        color='primary'
                                        onClick={() => this.getInventory()}>
                                        <React.Fragment>
                                            <RefreshCcw size='15' />
                                            <span className='align-middle ml-50'>Refresh Data</span>
                                        </React.Fragment>
                                    </Button>
                                    </div>
                                    <div className='d-flex flex-wrap justify-content-between mb-1'>
                                        <div className='table-input mr-1'>
                                            <Input
                                                placeholder='search...'
                                                onChange={e => this.updateSearchQuery(e.target.value)}
                                                value={this.state.value} />
                                        </div>
                                        {!isLoading && <div className='export-btn'>
                                            <Button.Ripple
                                                color='primary'
                                                onClick={this.toggleModal}
                                                // onClick={() => this.gridApi.exportDataAsCsv()}
                                                >
                                                Export
                                            </Button.Ripple>
                                        </div>}
                                    </div>
                                </div>
                                <>
                                {data && data.length > 0 ?
                                    <ReactTable
                                        TheadComponent={props => null}
                                        data={data}
                                        columns={[
                                            {
                                                Header: "Name",
                                                accessor: "masterSKU",
                                                enableRowSpan: true,
                                                Cell: props => {
                                                    const rowData = props.original;
                                                    const childData = rowData.inventory_details;
                                                    let childTbData = Object.keys(childData).map(key => {
                                                        return {
                                                            name: key,
                                                            expanded: childData[key].expanded,
                                                            children: childData[key].child
                                                        }
                                                    })
                                                    return (
                                                        <div>
                                                            <div className='text-uppercase text-bold-600 text-left navbar-light pt-1 pb-1 px-1 mb-1'>{rowData.masterSKU || ''}</div>
                                                            <div className="">
                                                                {childTbData.map(item => {
                                                                    return (
                                                                        <div key={item.name} className="d-flex flex-column flex-md-column mb-2">
                                                                            {this.renderSwitch(item.name, item.expanded, item.children, rowData)}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            <div className='d-flex flex-column flex-md-row justify-content-end navbar-light pt-1 pb-1 px-1'>
                                                                <div className='title text-uppercase text-bold-600 mx-5'>Balance Stock Left</div>
                                                                <div className='title text-bold-600'>{rowData.balance_stock_left || 0}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                        ]}
                                        defaultPageSize={5}
                                        className="-striped -highlight w-full"
                                        // Controlled props
                                        page={this.state.page}
                                        pageSize={this.state.pageSize}
                                        // Callbacks
                                        onPageChange={page => this.setState({ page })}
                                        onPageSizeChange={(pageSize, page) =>
                                            this.setState({ page, pageSize })
                                        }
                                    /> : isLoading ? <div className="text-center">Getting Data...</div> : <div className="text-center">No Data</div>}
                                </>
                                <>
                                    <Table
                                    style={{ height: 0 }}
                                    innerRef={el => (this.tableRef = el)}
                                    className="table-hover-animation mt-2"
                                    responsive>
                                        <thead>
                                        <tr>
                                            <th>Master SKU</th>
                                            <th>Inventory Inbound Location</th>
                                            <th>Inventory Inbound Date</th>
                                            <th>Inventory Inbound Qty</th>
                                            <th>Inventory Sale Store Name</th>
                                            <th>Inventory Sale Qty</th>
                                            <th>Inventory Other Use Reason</th>
                                            <th>Inventory Other Use Qty</th>
                                            <th>Balance Stock Left</th>
                                        </tr>
                                        </thead>
                                        <tbody>{renderTableData}</tbody>
                                    </Table>
                                    <div className="ag-grid-tbl">{agData && agData.length > 0 && <AgGridReact
                                        gridOptions={{}}
                                        rowSelection='multiple'
                                        defaultColDef={defaultColDef}
                                        columnDefs={columnDefs}
                                        rowData={agData}
                                        onGridReady={this.onGridReady}
                                        colResizeDefault={'shift'}
                                        animateRows={true}
                                        floatingFilter={false}
                                        headerHeight={0}
                                        pagination={true}
                                        paginationPageSize={this.state.paginationPageSize}
                                        pivotPanelShow='always'
                                        suppressDragLeaveHidesColumns={true}
                                        frameworkComponents={this.state.frameworkComponents}
                                        loadingCellRenderer={this.state.loadingCellRenderer}
                                        loadingCellRendererParams={this.state.loadingCellRendererParams}
                                        getRowHeight={this.state.getRowHeight}
                                        isFullWidthCell={this.state.isFullWidthCell}
                                        fullWidthCellRenderer={this.state.fullWidthCellRenderer}
                                        context={this.state.context}
                                    />}</div>
                                </>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggleModal}
                className='modal-dialog-centered'>
                <ModalHeader toggle={this.toggleModal}>Export To Excel</ModalHeader>
                <ModalBody>
                    <FormGroup>
                    <Input
                        type='text'
                        value={this.state.fileName}
                        onChange={e => this.setState({ fileName: e.target.value })}
                        placeholder='Enter File Name'
                    />
                    </FormGroup>
                    <FormGroup>
                    <CustomInput
                        type='select'
                        id='selectFileFormat'
                        name='customSelect'
                        value={this.state.fileFormat}
                        onChange={e => this.setState({ fileFormat: e.target.value })}>
                        <option>xlsx</option>
                        <option>csv</option>
                        <option>txt</option>
                    </CustomInput>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' disabled={this.state.fileName === ''} onClick={this.handleExport}>
                    Export
                    </Button>
                    <Button color='flat-danger' onClick={this.toggleModal}>
                    Cancel
                    </Button>
                </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        values: state.auth.login
    }
}
export default connect(mapStateToProps, { getInventoryData })(Inventory)