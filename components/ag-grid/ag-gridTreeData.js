//@flow
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

class AggridTreeData extends React.PureComponent {  
  exportGrid = this.exportGrid.bind(this);
  componentDidUpdate() {
    this.gridApi.sizeColumnsToFit();
  }
  onGridSizeChanged = () => {
    this.gridApi.sizeColumnsToFit();
  };
  onGridReady = params => {
    this.gridApi = params.api;
  }; 
  exportGrid(name) {
    var params = {
      fileName: name,
      sheetName: name
    };
    this.gridApi.exportDataAsExcel(params);
  }
  render() {  
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "100%", width: "100%" }}
      >
        {
          <AgGridReact
            onGridReady={this.onGridReady}
            onGridSizeChanged={this.onGridSizeChanged}
            onFirstDataRendered={this.onGridSizeChanged}           
            columnDefs={this.props.headers}
            rowData={this.props.data}           
            defaultColDef={this.props.params.defaultColDef}
            suppressDragLeaveHidesColumns={true}
            localeText={this.props.params.localeText}
            headerHeight={this.props.params.headerHeight}
            rowHeight={this.props.params.rowHeight}           
            groupDefaultExpanded={this.props.params.groupDefaultExpanded}
            autoGroupColumnDef={this.props.params.autoGroupColumnDef}
            getDataPath={this.props.params.getDataPath}
            treeData={true} 
          />
        }
      </div>
    );
  }
}
export default AggridTreeData;
