import React from 'react';
import DragandZoom from './DragandZoom';
import GitHub from 'github-api';
import http from 'http';
import map from 'ramda/src/map';
import pick from 'ramda/src/pick';
import lensProp from 'ramda/src/lensProp';
import reduce from 'ramda/src/reduce';
import view from 'ramda/src/view';
import { Table, Icon } from 'antd';

const log = s => console.log(s);
export default class SvgSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Cui_Chenyi@bp.ogis-ri.co.jp',
      password: 'cui123456',
      dataSource: [],
    }
  }
  componentWillMount() {
    const gh = new GitHub({
      // this.props.username
      // this.props.password
      username: this.state.username,
      password: this.state.password,
    });

    const getLabelName = (name, label) => name + view(lensProp('name'))(label);
    const combinLabelName = (labels) => reduce(getLabelName)('')(labels);
    const rebuildData = (data) => {
      return {
        key: data.number,
        title: data.title + combinLabelName(data.labels),
      }
    }
    const issues = gh.getIssues('ogis-es3/yonobi-web');
    issues.listIssues({}).then(({ data }) => {
      // Promises!
      const selectKey = ['number', 'title', 'labels'];
      const selectData = map(pick(selectKey))(data);
      log(selectData)
      const dataSource = map(rebuildData)(selectData);
      // return dataSource;
      this.setState({ dataSource });
    });
  }
  render() {
    const columns = [{
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      // render: text => <a href="#">{text}</a>,
    },
    //  {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // }, {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // }
    ];

    const data = [{
      key: '1',
      title: 'John Brown',
      // age: 32,
      // address: 'New York No. 1 Lake Park',
    }, {
      key: '266',
      title: 'Jim Green',
      // age: 42,
      // address: 'London No. 1 Lake Park',
    },
     {
        key: '33',
        title: 'Joe Black',
        // age: 32,
        // address: 'Sidney No. 1 Lake Park',
      },
      ];
    return (
     <div>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            bordered
          />
     </div>
    );
  }
}

