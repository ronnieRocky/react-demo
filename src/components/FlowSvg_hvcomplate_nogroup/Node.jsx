import React from 'react';
import Rect from './Shape/Rect';
import Circle from './Shape/Circle';
import Line from './Shape/Line';
import { onPosition, isCircle } from './utils/Math';
import { isUndefined } from './utils/Func';

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultlen: 50,
      r: 10,
    }
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   // console.log("handleClick");
  // }

  render() {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const Shape = this.props.shape;
    const { location, ...others } = this.props;
    const { x, y, width, height, fill, offset, direction } = { ...others };
    const temoffset = isUndefined(offset, 0);
    const iscircle = isCircle(direction);
    const position = onPosition(x, y, r, defaultlen, width, height, temoffset, direction, iscircle);
    const sp = position.sp;
    const vlp = position.vlp;
    const plus = position.plusp;
    const lp = position.lp;
    return (
      <g onClick={this.handleClick} >
        <Shape {...others} />
        {
        location === 'last' ?
            <g>
             {
                iscircle ?
                <Line x1={vlp.x1} y1={vlp.y1}
                  x2={vlp.x2} y2={vlp.y2}
                  fill={"white"} stroke={"black"}
                />
                :
                null
              }
              {
                iscircle ?
                <Circle cx={plus.cx} cy={plus.cy}
                  r={r} fill={"white"} stroke={"pink"}
                />
                :
                null
              }
            </g>
         :
            <g>
              <Line x1={vlp.x1} y1={vlp.y1}
                x2={vlp.x2} y2={vlp.y2}
                fill={"white"} stroke={"green"}
              />
              {
                iscircle ?
                <Circle cx={plus.cx} cy={plus.cy}
                  r={r} fill={"white"} stroke={"pink"}
                />
                :
                null
              }
              <Line x1={lp.x1} y1={lp.y1}
                x2={lp.x2} y2={lp.y2}
                fill={"white"} stroke={"red"}
              />
            </g>
        }
      </g>
    )
  }
}
