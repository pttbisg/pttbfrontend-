import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown, ChevronUp } from 'react-feather'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../../../assets/scss/plugins/extensions/react-tables.scss'

export default class MasterSKUCustomCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            masterData: this.props.data
        };
    }

    componentDidMount() {
        // to allow for inner scrolling
        ReactDOM.findDOMNode(this).addEventListener(
            'mousewheel',
            (event) => {
                event.stopPropagation();
            },
            false
        );
    }

    getReactContainerStyle() {
        return {
            display: 'inline-block',
            height: '100%',
        };
    }

    renderSwitch(key, expanded, param, rowData) {
        switch (key) {
            case 'inbounds':
                return (
                    <React.Fragment>
                        <div onClick={() => this.onExpanded(rowData, key, expanded)} className='title text-bold-600 text-left' style={{ minWidth: 300 }}>
                            <span style={{ cursor: 'pointer' }}>{expanded ? <ChevronUp/> : <ChevronDown/>}  Inbounds 
                                <span className='mx-1 badge badge-primary badge-pill'>{param && param.length > 0 ? param.length : 0}</span>
                            </span>
                        </div>
                        {expanded && <ReactTable
                            data={param}
                            columns={[
                                {
                                    Header: 'Date',
                                    accessor: 'date'
                            
                                },
                                {
                                    Header: 'Current Location',
                                    accessor: 'current_location'
                            
                                },
                                {
                                    Header: 'Qty',
                                    accessor: 'qty'
                            
                                }
                            ]}
                            showPaginationBottom={false}
                            defaultPageSize={3}
                            className='-striped -highlight w-full'
                        />}
                    </React.Fragment>
                )
            case 'sales':
                return (
                    <React.Fragment>
                        <div onClick={() => this.onExpanded(rowData, key, expanded)} className='title text-bold-600 text-left' style={{ minWidth: 300 }}>
                            <span style={{ cursor: 'pointer' }}>{expanded ? <ChevronUp/> : <ChevronDown/>} Sales 
                                <span className='mx-1 badge badge-primary badge-pill'>{param && param.length > 0 ? param.length : 0}</span>
                            </span>
                        </div>
                        {expanded && <ReactTable
                            data={param}
                            columns={[
                                {
                                    Header: 'Store Name',
                                    accessor: 'storename'
                            
                                },
                                {
                                    Header: 'Qty',
                                    accessor: 'qty'
                            
                                }
                            ]}
                            showPaginationBottom={false}
                            defaultPageSize={3}
                            className='-striped -highlight w-full'
                        />   }  
                    </React.Fragment>
                )
            case 'other_use':
                return (
                    <React.Fragment>
                        <div onClick={() => this.onExpanded(rowData, key, expanded)} className='title text-bold-600 text-left' style={{ minWidth: 300 }}>
                            <span style={{ cursor: 'pointer' }}>{expanded ? <ChevronUp/> : <ChevronDown/>} Other Use (Non-Sales) 
                                <span className='mx-1 badge badge-primary badge-pill'>{param && param.length > 0 ? param.length : 0}</span>
                            </span>
                        </div>
                        {expanded && <ReactTable
                            data={param}
                            columns={[
                                {
                                    Header: 'Reason',
                                    accessor: 'reason'
                            
                                },
                                {
                                    Header: 'Qty',
                                    accessor: 'qty'
                            
                                }
                            ]}
                            showPaginationBottom={false}
                            defaultPageSize={3}
                            className='-striped -highlight w-full'
                        />}    
                    </React.Fragment> 
                )
            default:
                break;
        }
    }

    onExpanded = (rowData, key, expanded) => {
        let { masterData } = this.state;
        if(masterData.masterSKU === rowData.masterSKU){
            masterData.inventory_details[key].expanded = !expanded;
        }
        
        this.setState({
            masterData: masterData
        }, () => {
            let iElm = document.getElementById(`inventory-item-${this.props.node.rowIndex}`);
            this.props.context.componentParent.methodFromParent(iElm.offsetHeight, this.props.node.rowIndex)
        })
    }

    render() {
        const { masterData } = this.state;
        const childData = masterData.inventory_details;
        let childTbData = Object.keys(childData).map(key => {
            return {
                name: key,
                expanded: childData[key].expanded,
                children: childData[key].child
            }
        })
        return (
            <div id={`inventory-item-${this.props.node.rowIndex}`} className="full-width-panel">
                <div className='text-uppercase text-bold-600 text-left navbar-light pt-1 pb-1 px-1 mb-1'>{masterData.masterSKU || ''}</div>
                <div className='mx-3'>
                    {childTbData.map(item => {
                        return (
                            <div key={item.name} className='d-flex flex-column flex-md-column mb-2'>
                                {this.renderSwitch(item.name, item.expanded, item.children, masterData)}
                            </div>
                        )
                    })}
                </div>
                <div className='d-flex flex-column flex-md-row justify-content-end navbar-light pt-1 pb-1 px-1'>
                    <div className='title text-uppercase text-bold-600 mx-5'>Balance Stock Left</div>
                    <div className='title text-bold-600'>{masterData.balance_stock_left || 0}</div>
                </div>
            </div>
        );
    }
};