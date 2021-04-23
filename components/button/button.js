import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";
import { Button,ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
console.log("button")
class Btn extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  render() {
    const { children, type, disabled, onClick,...props } = this.props;
    const cls = classNames(`${PREFIX}-btn`, `${PREFIX}-btn-${type}`);

    return (
	<ConfigProvider
		locale={zhCN} autoInsertSpaceInButton={false}
	>
      <Button type="primary" className={cls} onClick={this.handleClick} disabled={disabled} {...props}>
        {children}
      </Button>
	  </ConfigProvider>
    );
  }
}

// 指定 props 的默认值：
Btn.defaultProps = {
  type: "default",
};

Btn.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Btn;
