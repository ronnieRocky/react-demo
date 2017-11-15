import React from 'react';
import Main from './Main';
import Svg from './Svg';
import math from 'mathjs';
import { Table } from 'antd';

const dataSource = [{
  key: '0',
  id: '1231231',
  name: '11',
  age: 5,
  address: '西湖区湖底公园1号'
},{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  
  onCellClick: (record, e) => {
    console.log('Click cell', record, e.target);
  },
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  render: text => <a href="#">{text}</a>,
  onCellClick: (record, e) => {
    console.log('Click cell', record, e.target);
  },
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
  render: text => <a href="#">{text}</a>,
  onCellClick: (record, e) => {
    console.log('Click cell', record, e.target);
  },
}];

export default class SvgTest extends React.Component {

  render() {
    const l = (...arg) => console.log('----'+ `${arg[0]}`+'---   ', ...arg);
const ss = ()=> <div>123</div>;
    l('render', ss, '567', '123')
    // console.log(math.intersect([0, 0], [10, 10], [10, 0], [0, 10])[1]);
    return (
     <div　className="svg">
        <Table dataSource={dataSource} columns={columns} />
     </div>
    );
  }
}



