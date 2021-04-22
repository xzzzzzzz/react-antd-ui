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
    const { children, type, disabled, onClick,option } = this.props;
    const cls = classNames(`${PREFIX}-btn`, `${PREFIX}-btn-${type}`);

    return (
	<ConfigProvider
		locale={zhCN} autoInsertSpaceInButton={false}
	>
      <Button type="primary" className={cls} onClick={this.handleClick} disabled={disabled} {...option}>
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
  onClick: PropTypes.func,
  option: PropTypes.object
};

export default Btn;
