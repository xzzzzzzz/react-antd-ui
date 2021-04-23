import React, {Component} from "react";
import {Table,ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";
class Tables extends Component { 
	
	constructor(props) {
	    super(props);
		
	}
	
	render() {
		let {dataSource,columns,tableHeight,type,rowSelection,rowKey,...props} = this.props;
		const cls = classNames(`${PREFIX}-table`, `${PREFIX}-table-${type}`);
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
				<Table
					className={cls}
					dataSource={dataSource} 
					columns={columns}
					scroll={{y:tableHeight}}
					rowSelection = {rowSelection}
					pagination={false}
					rowKey={rowKey}
					{...props}
				/>
			</ConfigProvider>
		)
	}
}
// 指定 props 的默认值：
Tables.defaultProps = {
  type: "default",
};
Tables.propTypes = {
  dataSource: PropTypes.array,
  type: PropTypes.string,
  columns: PropTypes.array,
  tableHeight: PropTypes.number,
  rowSelection: PropTypes.object,
  rowKey:PropTypes.string,
  option: PropTypes.object
};
export default Tables;
