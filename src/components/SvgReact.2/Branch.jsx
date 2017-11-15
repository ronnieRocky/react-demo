import React from 'react';
import ShowShape from './ShowShape';
import Line from './Shape/Line';
import Plus from './Plus';

export default class Branch extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd(id) {
    this.props.onAdd(id);
  }

  render() {
    const id = this.props.id;
    const module = this.props.shape;
    const position = this.props.position;
    const sp = position.sp;
    const vlp = position.vlp;
    const plus = position.plusp;
    const lp = position.lp;
    return (
    <g>
        <ShowShape shape={module} />
        <Line x1={vlp.x1} y1={vlp.y1} x2={vlp.x2} y2={vlp.y2} stroke="green" />
        <Plus id={id} cx={plus.cx} cy={plus.cy} onadd={this.onAdd} />
        <Line x1={lp.x1} y1={lp.y1} x2={lp.x2} y2={lp.y2} stroke="red" />
    </g>
    );
  }
}
