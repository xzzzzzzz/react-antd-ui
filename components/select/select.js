import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";
import {Select} from "antd";
const {Option} = Select;
console.log("select");

class YhSelect extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (value,option) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value,option);
    }
  };
 option = (data) => {
	 let content = []
	 data.map(item => {
		 content.push(
			<Option value={item}>{item}</Option>
		 )
	 })
	 return content
 }
  render() {
    const { type, disabled, onChange,data,...props } = this.props;
    const cls = classNames(`${PREFIX}-select`, `${PREFIX}-select-${type}`);

    return (
      <Select className={cls} onChange={this.handleChange} disabled={disabled} {...props}>
		{this.option(data)}
	  </Select>
    );
  }
}

// 指定 props 的默认值：
YhSelect.defaultProps = {
  type: "default",
  data: ["上海","北京","广州"]
};

YhSelect.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.array
};

export default YhSelect;
