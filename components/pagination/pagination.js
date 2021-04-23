import React, {Component} from "react";
import {Pagination,ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";
class Paginations extends Component { 
	
	constructor(props) {
	    super(props);
		
	}
	handleChange = (page,pageSize) => {
		const {pageChange} = this.props
		if(pageChange) {
			pageChange(page,pageSize)
		}
		
	}
	render() {
		let {total,currPage,pageSize,type,pageChange,...props} = this.props;
		const cls = classNames(`${PREFIX}-pagination`, `${PREFIX}-pagination-${type}`);
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
				<div className={cls}>
					<Pagination current={currPage} showQuickJumper total={total} showTotal={(total) => `共有 ${total} 条记录`} showSizeChanger onShowSizeChange={this.handleChange} onChange={this.handleChange} {...props}/>
					<div className="paginationBtn" onClick={e => this.handleChange(currPage,pageSize)}>GO</div>
				</div>
			</ConfigProvider>
		)
	}
}
// 指定 props 的默认值：
Paginations.defaultProps = {
  type: "default",
};
Paginations.propTypes = {
  currPage: PropTypes.number,
  type: PropTypes.string,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  pageChange: PropTypes.func
  
};
export default Paginations;
