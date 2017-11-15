import React from 'react';
import ShowShape from './ShowShape';
import Line from './Shape/Line';
import Plus from './Plus';
import { OutEnhance } from './OutEnhance';

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
    const LineEnhance = OutEnhance(po.x1, 0)(Line);
    return (
        <g>
            <ShowShape shape={shape} />
            <LineEnhance x1={0} y1={po.y1} x2={0} y2={po.y2} stroke="green" />
            <Plus id={id} cx={po.cx} cy={po.cy} onadd={this.onAdd} />
        </g>
    );
  }
}

