import '../lib/react-ui-tree.less';
import theme from './theme.less';
import './index.less';
import cx from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tree from '../lib/react-ui-tree.js';
import treeData from './tree';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      tree: treeData,
    };
  }

  onClickNode = node => {
    this.setState({
      active: node,
    });
  };

  handleChange = (nodeTree) => {
    this.setState({
      tree: nodeTree,
    });
  };

  updateTree = () => {
    const { tree } = this.state;
    tree.children.push({ module: 'test' });
    this.setState({
      tree,
    });
  };

  renderNode = node => {
    return (
      <span
        className={cx('node', {
          'is-active': node === this.state.active,
        })}
        onClick={this.onClickNode.bind(null, node)}
      >
        {node.module}
      </span>
    );
  };

  render() {
    return (
      <div className="app">
        <div className={theme.tree}>
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
      </div>
    );
  }


}

// ReactDOM.render(<App />, document.getElementById('app'));
