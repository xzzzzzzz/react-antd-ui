import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";

class Crumbs extends Component { 
	
	constructor(props) {
	    super(props);
		
	}
	render() {
		let {type,title} = this.props
		 const cls = classNames(`${PREFIX}-crumbs`, `${PREFIX}-crumbs-${type}`);
		return (
			<div className={cls}>
				{title}
			</div>
		)
	}
}
// 指定 props 的默认值：
Crumbs.defaultProps = {
  type: "default",
};
Crumbs.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string
};
export default Crumbs;
