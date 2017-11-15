import React from 'react';
import Rect from './Shape/Rect';
import Circle from './Shape/Circle';
import Line from './Shape/Line';
import Test from './Shape/Shape';
import { onPosition, isVertical } from './utils/Math';
import { isUndefined } from './utils/Func';

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultlen: 50,
      r: 10,
      w: 0,
      h: 0,
    }
    this.onFlash = this.onFlash.bind(this);
  }
  // getChildContext() {
  //   return { flow: this.onText };
  // }
  // // handleClick() {
  // //   // console.log("handleClick");
  // // }
  onText(x, y, text) {
    const px = "px";
    const tx = x + px;
    const ty = (y+10) + px;
    return  <text x={tx} y={ty} font-family="sans-serif" font-size="20px" fill="black">
              {text}
            </text>;
  }

  onFlash(w, h) {
    console.log("onNodeFlash");
    this.setState({
      w,
      h,
    });
    this.context.flow(w, h);
  }
  render() {
    console.log("node render--------------------");
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const Shape = this.props.shape;
    const { location, ...others } = this.props;
    const { x, y, width, height, fill, offset, direction } = { ...others };
    const name = "teset:hahaha";
    const temoffset = isUndefined(offset, 0);
    const isvertical = isVertical(direction);
    const max = (a, b) => {return a > b ? a : b };
    const sw = this.state.w;
    const sh = this.state.h;
    const position = onPosition(x, y, r, defaultlen, max(width, sw), max(height, sh), temoffset, direction);
    const sp = position.sp;
    const vlp = position.vlp;
    const plus = position.plusp;
    const lp = position.lp;
    // const test = (tx, ty, shape) => {
    //   return <svg>
    //           <defs>
    //             <g id="shape" ref="group" style={{ stroke:"green", fill: "none" }}>
    //               <rect x="50" y="50" width="50" height="50" />
    //               <circle cx="50" cy="50" r="50" />
    //             </g>
    //           </defs>
    //           <use xlinkHref="#shape" x={tx} y={ty} />
    //         </svg>
    // };
    const sty = { border: '1px solid green' };
    const test = (tx, ty, w, h, shape) => {
      const viewbox = [tx, ty, w, h];
      console.log(`${viewbox.join(' ')}`);
      return <svg
        width={w} height={h} viewBox={`${viewbox.join(' ')}`}
        preserveAspectRatio="xMidYMid meet"
        style={sty}
      >
            <rect x="50" y="50" width="50" height="50" />
            <circle cx="60" cy="60" r="30" />
       
      </svg>
    };
    return (
      <g className="visual-node" onClick={this.handleClick} >
        <Test shape={() => test(x, y, width, height)} onflash={this.onFlash} />
        <Rect {...others} width={max(width, sw)} height={max(height, sh)} fillOpacity="0.2" />
        { this.onText(x, y, name) }
        {
          isvertical ?
          (
            location === 'last' ?
                <g className="visual-last">
                    <Line x1={vlp.x1} y1={vlp.y1}
                      x2={vlp.x2} y2={vlp.y2}
                      fill={"white"} stroke={"black"}
                    />
                    <Circle cx={plus.cx} cy={plus.cy}
                      r={r} fill={"white"} stroke={"pink"}
                    />
                </g>
            :
                <g className="visual-connection">
                  <Line x1={vlp.x1} y1={vlp.y1}
                    x2={vlp.x2} y2={vlp.y2}
                    fill={"white"} stroke={"green"}
                  />
                    <Circle cx={plus.cx} cy={plus.cy}
                      r={r} fill={"white"} stroke={"pink"}
                    />
                  <Line x1={lp.x1} y1={lp.y1}
                    x2={lp.x2} y2={lp.y2}
                    fill={"white"} stroke={"red"}
                  />
                </g>
          )
          :
          null
        }
      </g>
    )
  }
}

Node.contextTypes = {
  flow: React.PropTypes.func,
};
