import React from "react";
import {render} from "react-dom";
import "./index.less";
import { Btn, Crumbs, YhInput, Paginations,YhSelect,AgGrid,Modals,Tables } from "../lib/raui";
import "../lib/index.css"

let isModalVisible = false;
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '4',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '5',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '6',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '7',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '8',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '9',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '10',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '11',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '12',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '13',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '14',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '15',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '16',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  }
];
const columns = [
  {
	title: '姓名',
	dataIndex: 'name',
	key: 'name',
  },
  {
	title: '年龄',
	dataIndex: 'age',
	key: 'age',
  },
  {
	title: '住址',
	dataIndex: 'address',
	key: 'address',
  },
  {
	  title: '操作',
	  dataIndex: 'caozuo',
	  render:(text,record) => 
		  <div>
			<span className="editText">查看</span>
			<span style={{margin:"0 5px"}}>|</span>
			<span className="editText">删除</span>
		  </div>
	  
  }
];
const App = (
	<div className="winyh">
		<Crumbs title="面包屑"/>
	  <h1>常用组件</h1>
	  <p>antd组件</p>
	  <p>
		<Btn type="primary" onClick={() => isModalVisible = true}>
			确认/保存
		  </Btn>
		  <Btn type="return" onClick={() => console.log("winyh")}>
			禁用或返回
		  </Btn>
		  <Btn type="haveIcon" onClick={() => console.log("winyh")}>
			<img src={require('./edit.png')}/>
			带图标的按钮
		  </Btn>
	  </p>
	  
	  <p>
		输入框:
		<YhInput onChange={(value) => {console.log(value)}}/>
	  </p>
	  <p>
		下拉框:
		<YhSelect onChange={(value,option) => {console.log(value,option)}}/>
	  </p>
	  <Modals 
		title="modal弹窗"
		isModalVisible={false}
		
	  >
		<p>这是个modal弹窗</p>
	  </Modals>
	 <div className="aggridWrap">
		<Tables
			dataSource={dataSource} 
			columns={columns}
			tableHeight={400}
			// rowSelection={rowSelection}
		/>
	  </div>
	 
	  
	  <Paginations total={500} currPage={1} pageSize={10} pageChange={(page,pageSize) => console.log(page,pageSize)}/>
	</div>
)
const rootNode = document.getElementById('root');
render(App,rootNode);
