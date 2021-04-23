//@flow
import React, { Component } from "react";
export default class DetailCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: [],
      data: {}
    };
    if (props.data.detail)
      this.state = {
        header: props.data.detail.cellHeaders,
        data: props.data.detail.details
      };
    else
      props.frameworkComponentWrapper.agGridReact.props.getDetail(
        props.data._id,
        this.initData
      ); // 重新获取detail信息
  }
  initData = this.initData.bind(this);
  initData(data) {
    this.setState({ header: data.cellHeaders, data: data.details });
  }
  render() {
    if (!this.state.header) {
      return <div />;
    } else {
      let detail = this.state.header.map((h, index) => {
        return (
          <div key={index} className="detailDiv">
            <span className="detailKey">{h.displayName}:</span>
            <span className="detailValue">{this.state.data[h.fieldName]}</span>
          </div>
        );
      });
      return <div className="detailDivList">{detail}</div>;
    }
  }
}
