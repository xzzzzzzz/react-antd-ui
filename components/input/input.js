import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";
import {Input} from "antd";

console.log("input");

class YhInput extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    const { onChange } = this.props;
	console.log(e.target.value)
    if (onChange) {
      onChange(e.target.value);
    }
  };

  render() {
    const { type, disabled, onChange ,option} = this.props;
    const cls = classNames(`${PREFIX}-input`, `${PREFIX}-input-${type}`);

    return (
      <Input className={cls} onChange={this.handleChange} disabled={disabled} {...option}/>
    );
  }
}

// 指定 props 的默认值：
YhInput.defaultProps = {
  type: "default",
};

YhInput.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  option: PropTypes.object
};

export default YhInput;
