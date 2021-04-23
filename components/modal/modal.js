import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";
import {Modal,ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
console.log("modal");

class Modals extends Component {
  constructor(props) {
    super(props);
  }

  handleOk = (value) => {
    const { handleOk } = this.props;
	console.log(value)
    if (handleOk) {
      handleOk(value);
    }
  };
  handleCancel = (value) => {
    const { handleCancel } = this.props;
	console.log(value)
    if (handleCancel) {
      handleCancel(value);
    }
  };
  render() {
    const {children,isModalVisible,handleOk,handleCancel,title,type,...props} = this.props;
    const cls = classNames(`${PREFIX}-modal`, `${PREFIX}-modal-${type}`);

    return (
	<ConfigProvider
		locale={zhCN} autoInsertSpaceInButton={false}
		getPopupContainer={node => {
		 if (node) {
			 return node.parentNode;
		 }
		 return document.body;
		}}
	>
      <Modal title={title} visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} {...props}>
		  {children}
		</Modal>
	</ConfigProvider>
    );
  }
}

// 指定 props 的默认值：
Modals.defaultProps = {
  type: "default",
  title: "modal"
};

Modals.propTypes = {
  type: PropTypes.string,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  isModalVisible: PropTypes.boolean,
  title: PropTypes.string
};

export default Modals;
