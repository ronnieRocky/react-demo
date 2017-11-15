import React from 'react';
import ShowShape from './ShowShape';
import Line from './Shape/Line';
import Plus from './Plus';

export default class End extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd(id) {
    this.props.onAdd(id);
  }

  render() {
    const id = this.props.id;
    const po = this.props.position;
    const shape = this.props.shape;
    return (
        <g>
            <ShowShape shape={shape} />
            <Line x1={po.x1} y1={po.y1} x2={po.x2} y2={po.y2} stroke="green" />
            <Plus id={id} cx={po.cx} cy={po.cy} onadd={this.onAdd} />
        </g>
    );
  }
}

