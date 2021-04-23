//@flow
import AgLanguage from "./ag-grid-language";
var AggridParams = {
  params: {
    rowSelection: "multiple",
    editType: "fullRow",
    localeText: AgLanguage.chinese,
    masterDetail: true,
    defaultColDef: {
      filterParams: {
        applyButton: true, // 确认按钮
        clearButton: true, // 清空按钮
        newRowsAction: "keep",
        suppressAndOrCondition: true, // 是否显示and
        filterOptions: ["contains"] // 自定义都有哪些搜索条件
      },
      filter: true,
      sortable: true,
      editable: false,
      resizable: true
    },
    headerHeight: 48,
    rowHeight: 43,
    paginationPageSize: 14,
    pagination: true,
    groupDefaultExpanded: -1,
    detailRowHeight: 120,
    autoGroupColumnDef: {
      headerName: "公司",
      width: 240,
      menuTabs: [],
      cellRendererParams: { suppressCount: true }
    },
    getDataPath: function(data) {
      return data.region;
    },
    rowModelType: "serverSide",
    treeData: false
  },
  initCountGrid: function(oriHeaders, type) {
    var gridHeader = [];
    oriHeaders.map(head => {
      var header = {
        headerName: head.displayName,
        field: head.modelName,
        headerTooltip: head.displayName,
        tooltipField: head.filedName,
        filter: false,
        menuTabs: [],
        cellStyle: function() {
          return { "text-align": "right", "padding-right": "40px" };
          // return { "text-align": "left", "padding-left": "20px" };
        }
      };
      if (type == 1) {
        header.width = 800;
      }
      gridHeader.push(header);
    });
    return gridHeader;
  },
  
  regionInitGrid: function(oriHeaders: any, searchList, mark) {
    var state = {};
    var gridHeader = [];
    var childrenHeader = [];
    oriHeaders.map(head => {
      let headName;
      if (head.modelName) {
        headName = head.modelName;
      } else if (head.filedName) {
        headName = head.filedName;
      }
      if(head.childrens){
        let headerchildren = []
        let childrenheadName;
        head.childrens.map(childrenHead =>{
          if (childrenHead.modelName) {
            childrenheadName = childrenHead.modelName;
          } else if (childrenHead.filedName) {
            childrenheadName = childrenHead.filedName;
          }
          let childrenHeads = {
            headerName: childrenHead.displayName,
            field: childrenheadName,
            filter: "agTextColumnFilter",
            width: childrenHead.width ? childrenHead.width : 200,
            hide: !childrenHead.display,
            headerTooltip: childrenHead.displayName,
            tooltipField: childrenheadName,
            menuTabs: ["filterMenuTab", "columnsMenuTab"] 
          }
          headerchildren.push(childrenHeads)
        })
        childrenHeader = headerchildren
      }
      var header = {
        headerName: head.displayName,
        field: headName,
        filter: "agTextColumnFilter",
        width: head.width ? head.width : 200,
        hide: !head.display,
        headerTooltip: head.displayName,
        tooltipField: headName,
        menuTabs: ["filterMenuTab", "columnsMenuTab"],
        children: head.childrens.length > 0 ? childrenHeader : undefined       
      };
      if (head.filedName === "totalVolume") {
        header.headerClass = "waterClass";
        header.cellStyle = function(params) {
          var estimate = params.node.data.estimate;
          var normal = params.node.data.normal;
          if (normal == false || (normal == false && estimate)) {
            // 红色
            return {
              "text-align": "center",
              "background-color": "rgba(235,97,0,0.2) !important",
              border: "1px solid #EB6100"
            };
          } else if (estimate && normal == true) {
            // 蓝色
            return {
              "text-align": "center",
              "background-color": "rgba(110,183,237,0.2) !important",
              border: "1px solid #6EB7ED"
            };
          } else {
            return {
              "text-align": "center",
              "border-left": "1px solid #dedede",
              "border-right": "1px solid #dedede"
            };
          }
        };
      }
      if (headName == "region") {
        header.filter = true;
        header.width = 160;
      }
      if (headName == "consumption2" || headName == "consumption1") {
        header.filter = false;
        header.headerClass = "centerHeader"
      }
      if (head.filterable == false) {
        header.filter = false;
      }
      if (headName == "acc_time") header.width = 110;
      if (headName == "hostname") header.width = 110;
      if (headName == "street") {
        header.width = 100;
      }
      if (head.sortable != undefined) {
        header.sortable = head.sortable;
      }

      if (
        head.modelName == "MonthUploadRate" ||
        head.modelName == "AverageUploadRate"
      ) {
        header.width = 150;
      }
      if (head.filterable == false) {
        header.filter = false;
      }
      if (head.sortable != undefined) {
        header.sortable = head.sortable;
      }
      gridHeader.push(header);
    });
    state.headers = gridHeader;
    return state;
  },
  initGrid: function(oriHeaders: any, searchList, mark) {
    var state = {};
    var gridHeader = [];
    oriHeaders.map(head => {
      var header = {
        headerName: head.displayName,
        field: head.filedName,
        filter: "agTextColumnFilter",
        width: head.width ? head.width : 100,
        hide: !head.display,
        headerTooltip: head.displayName,
        tooltipField: head.filedName,
        menuTabs: ["filterMenuTab", "columnsMenuTab"]
      };
      if (head.type == "number") {
        header.filter = "agNumberColumnFilter";
        header.filterParams = {
          applyButton: this.params.defaultColDef.filterParams.applyButton, // 确认按钮
          clearButton: this.params.defaultColDef.filterParams.clearButton, // 清空按钮
          suppressAndOrCondition: this.params.defaultColDef.filterParams
            .suppressAndOrCondition, // 是否显示and
          filterOptions: [
            "greaterThanOrEqual",
            "lessThanOrEqual",
            "equals",
            "notEqual"
          ] // 自定义都有哪些搜索条件
        };
        header.cellStyle = function() {
          return { "text-align": "right", "padding-right": "40px" };
        };
      }
      if (head.filedName == "region") {
        header.filter = true;
        header.width = 160;
        header.cellRenderer = "agGroupCellRenderer";
        header.filterParams = {
          values: searchList.region,
          newRowsAction: "keep"
        };
        /*    header.headerCheckboxSelection = true;
        header.headerCheckboxSelectionFilteredOnly = true;
        header.cellRendererParams = {
          checkbox: true
        }; */
      }
      if (
        head.filedName == "useraccount" ||
        head.filedName == "device_no" ||
        head.filedName == "meter_no"
      )
        header.width = 110;
      if (head.filedName == "useraddress") {
        header.width = 180;
      }
      if (head.filedName == "caliber") {
        header.cellStyle = function() {
          return { "text-align": "right", "padding-right": "25px;" };
        };
        header.width = 80;
        header.filter = true;
        header.filterParams = {
          values: searchList.caliber,
          comparator: function(a, b) {
            var numA = parseInt(a);
            var numB = parseInt(b);
            if (numA > numB) {
              return 1;
            } else if (numA < numB) {
              return -1;
            } else {
              return 0;
            }
          },
          newRowsAction: "keep"
        };
      }
      if (head.filedName == "metertype") {
        header.filter = true;
        header.width = 80;
        header.filterParams = {
          values: searchList.metertype,
          newRowsAction: "keep"
        };
      }
      if (head.filedName == "vender") {
        header.filter = true;
        header.width = 120;
        header.filterParams = {
          values: searchList.vender,
          newRowsAction: "keep"
        };
      }
      if (head.filedName == "acc_time") header.width = 110;
      if (head.filedName == "hostname") header.width = 100;
      if (head.filedName == "street") header.width = 90;
      if (head.filedName == "totalVolume") {
        header.width = 120;
        header.cellStyle = function() {
          return {
            "text-align": "right",
            "padding-right": "40px",
            borderRight: "1px solid #ddd",
            borderLeft: "1px solid #ddd"
          };
        };
        header.headerClass = "waterClass";
      }
      if (
        head.filedName == "MonthUploadRate" ||
        head.filedName == "AverageUploadRate"
      ) {
        header.width = 150;
      }
      if (head.filterable == false) {
        header.filter = false;
      }
      if (head.sortable != undefined) {
        header.sortable = head.sortable;
      }
      if (mark == 1) {
        if (
          head.filedName == "region" ||
          head.filedName == "street" ||
          head.filedName == "useraccount" ||
          head.filedName == "hostname" ||
          head.filedName == "useraddress" ||
          head.filedName == "device_no" ||
          head.filedName == "vender" ||
          head.filedName == "AverageUploadRate" ||
          head.filedName == "name" ||
          head.filedName == "address" || 
          head.filedName == "devicenumber"
        ) {
          header.pinned = "left";
        }
      }
      gridHeader.push(header);
    });
    state.headers = gridHeader;
    return state;
  }
};
export default AggridParams;
