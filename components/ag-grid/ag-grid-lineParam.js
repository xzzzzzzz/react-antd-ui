//@flow
import AgLanguage from "./ag-grid-language";
var AggridParam = {
  params: {
    rowSelection: "multiple",
    editType: "fullRow",
    localeText: AgLanguage.chinese,
    masterDetail: false,
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
    pagination: true
  },
  initGrid: function(oriHeaders, searchList, mark) {
    var state = {};
    var gridHeader = [];
    oriHeaders.map(head => {
      let headName;
      if (head.modelName) {
        headName = head.modelName;
      } else if (head.filedName) {
        headName = head.filedName;
      }
      var header = {
        headerName: head.displayName,
        field: headName,
        filter: "agTextColumnFilter",
        width: head.width ? head.width : 200,
        hide: !head.display,
        headerTooltip: head.displayName,
        tooltipField: headName,
        menuTabs: ["filterMenuTab", "columnsMenuTab"]       
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
      if (head.modelName === "alarmtype") {
        let color = "#fff";
        header.filter = true;
        header.width = 120;
        header.filterParams = {
          values: ["低电压", "不计数", "无数据"],
          newRowsAction: "keep"
        };
        header.cellStyle = function(params) {
          var goals = params.node.data.alarmtype;
          if (goals && goals === "低电压") {
            color = "#dfdd50";
          } else if (goals && goals === "无数据") {
            color = "#bbbbbb";
          } else if (goals && goals === "不计数") {
            color = "#f19ec2";
          }
          return {
            background: color,
            border: "1px solid #fff",
            textAlign: "center"
          };
        };
      }
      if (headName == "region") {
        header.filter = true;
        header.width = 160;
        header.cellRenderer = "agGroupCellRenderer";
        header.filterParams = {
          values: searchList.region,
          newRowsAction: "keep"
        };
      }
      if (
        headName == "useraccount" ||
        headName == "device_no" ||
        headName == "meter_no"
      )
        header.width = 110;
      if (headName == "useraddress") {
        header.width = 180;
      }
      if (
        headName == "deviceno" ||
        headName == "count" ||
        headName == "sustaintime"
      ) {
        header.width = 130;
      }
      if (headName == "caliber") {
        header.cellStyle = function() {
          return { "text-align": "right", "padding-right": "25px;" };
        };       
        header.width = 100;
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
      if (headName == "metertype") {
        header.filter = true;
        header.width = 100;
        header.filterParams = {
          values: searchList.metertype,
          newRowsAction: "keep"
        };
      }
      if (headName == "vender") {
        searchList.vender.map(item=>{
          item=parseInt(item);

        });
        header.filter = true;
        header.width = 120;
        header.filterParams = {
          values: searchList.vender,
          newRowsAction: "keep"
        };
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
      if (headName == "totalVolume") {
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
      if (mark == 1) {
        if (
          headName == "region" ||
          headName == "street" ||
          headName == "useraccount" ||
          headName == "hostname" ||
          headName == "useraddress" ||
          headName == "device_no" ||
          headName == "vender" ||
          headName == "AverageUploadRate" ||
          headName == "name" ||
          headName == "caliber" || 
          headName == "address" || 
          headName == "devicenumber"
        ) {
          header.cellStyle = function() {
            return {
              "text-align": "left"
            };
          };
          header.pinned = "left";
        }
      }

      gridHeader.push(header);
    });
    state.headers = gridHeader;
    return state;
  }
};
export default AggridParam;
