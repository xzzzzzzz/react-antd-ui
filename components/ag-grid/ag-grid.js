//@flow
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { SetFilterModel } from "ag-grid-enterprise";

class Aggrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailCellRenderer: "myDetailCellRenderer"
    };
  }
  exportGrid = this.exportGrid.bind(this);
  onSelectionChanged = this.onSelectionChanged.bind(this);
  getDetail = this.getDetail.bind(this);
  onRowDoubleClicked = this.onRowDoubleClicked.bind(this);
  updateData = this.updateData.bind(this);
  autoSize = this.autoSize.bind(this);
  componentDidUpdate() {
    this.autoSize();
  }
  onGridSizeChanged = () => {
    this.autoSize();
  };
  onGridReady = params => {
    this.gridApi = params.api;
    setTimeout(() => {
      this.autoSize();
    }, 500);
    this.updateData();
  };
  autoSize() {
    if (this.gridApi) {
      var columns = this.gridApi.columnController.getAllDisplayedVirtualColumns();
      if (
        columns &&
        columns.length <= 11 &&
        !this.props.notAutoSize &&
        this.props.display == "block"
      )
        this.gridApi.sizeColumnsToFit();
    }
  }
  updateData() {
    const datasource = this.ServerSideDatasource();
    this.gridApi.setServerSideDatasource(datasource);
  }
  ServerSideDatasource = () => {
    let _this = this;
    return {
      getRows(params) {
        _this.props.getAggridNewData(params.request, params.successCallback);
      }
    };
  };
  onSelectionChanged() {
    var selectRows = this.gridApi.getSelectedRows();
    var ids = [];
    selectRows.map(row => {
      ids.push(row._id);
    });
    if (this.props.onSelectChanged) {
      this.props.onSelectChanged(ids);
    }
  }
  getContextMenuItems(params) {
    return ["copy", "copyWithHeaders"];
  }
  exportGrid(name) {
    var params = {
      fileName: name,
      sheetName: name
    };
    this.gridApi.exportDataAsExcel(params);
  }
  getDetail(id, callBack) {
    this.props.getDetail(id, callBack);
  }
  onRowDoubleClicked(row) {
    if (this.props.getNewLine) {
      this.props.getNewLine(row.data);
    }
  }
  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "95.5%", width: "100%" }}
      >
        {
          <AgGridReact
            onGridReady={this.onGridReady}
            onGridSizeChanged={this.onGridSizeChanged}
            onFirstDataRendered={this.onGridSizeChanged}
            onColumnVisible={this.onGridSizeChanged}
            onRowDoubleClicked={this.onRowDoubleClicked}
            masterDetail={this.props.params.masterDetail}
            detailCellRenderer={this.state.detailCellRenderer}
            frameworkComponents={{
              myDetailCellRenderer: this.props.myDetailCellRenderer
            }}
            getContextMenuItems={this.getContextMenuItems}
            columnDefs={this.props.headers.headers}
            rowData={this.props.data}
            pagination={this.props.params.pagination}
            paginationPageSize={this.props.params.paginationPageSize}
            cacheBlockSize={this.props.params.paginationPageSize}
            defaultColDef={this.props.params.defaultColDef}
            rowSelection={this.props.params.rowSelection}
            editType={this.props.params.editType}
            suppressDragLeaveHidesColumns={true}
            localeText={this.props.params.localeText}
            onSelectionChanged={this.onSelectionChanged}
            getDetail={this.getDetail}
            headerHeight={this.props.params.headerHeight}
            rowHeight={this.props.params.rowHeight}
            detailRowHeight={this.props.params.detailRowHeight}
            rowModelType={this.props.params.rowModelType}
            enableRangeSelection={true}
            enableCellTextSelection={true}
            suppressRowTransform={true}
          />
        }
      </div>
    );
  }
}
export default Aggrid;
