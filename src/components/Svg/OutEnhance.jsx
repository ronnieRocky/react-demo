import React from 'react';
// import Direct from './Direct';
// import { Enhance } from './Enhance';
import Circle from './Circle';
import Line from './Line';

export const OutEnhance = (x, y) => 
    (ComposedComponent) => 
            class extends React.Component {
              constructor(props) {
                  super(props);
                  this.state = {
                    matrix: [1, 0, 0, 1, 0, 0],
                    dragging: false,
                    scales: 0,
                  };
                  this.onWheel = this.onWheel.bind(this);
                }

                onWheel(e) {
                  e.preventDefault();
                  e.deltaY < 0 ?
                    this.zoom(1.05):
                    this.zoom(0.95);
                }

                zoom(scale) {
                  const m = this.state.matrix;
                  const len = m.length;
                  for (let i = 0; i < len; i++) {
                    m[i] *= scale;
                  }
                  m[4] += (1 - scale) * this.props.width / 2;
                  m[5] += (1 - scale) * this.props.height / 2;
                  this.setState({
                    matrix: m,
                    scales: scale,
                  });
                }
                componentWillMount() {
                  console.log("componentWillMount");
                  console.log(this.props.cx);
                  
                  const m = this.state.matrix;
                  m[4] += x;
                  m[5] += y;
                  this.setState({
                    matrix: m,
                  });
                }

                render() {
                  console.log("Enhance render");
                  console.log(this.props);
                  const { scale } = this.state.scales;
                  const matrix = [1, 0, 0, 1, x, y];
                  return (
                    <div onWheel={this.onWheel}>
                      <svg width={800} height={900}>
                        <g 
                          
                        >
                          <Circle className={"cir"} cx={"0"} cy={"0"} r={2} fill={'black'} stroke= {'black'} transform={`matrix(${matrix.join(' ')})`} />
                          <ComposedComponent {...this.props} transform={`matrix(${matrix.join(' ')})`}/>
                          <Circle className={"cir"} cx={"120"} cy={"0"} r={2} fill={'red'} stroke= {'red'} transform={`matrix(${matrix.join(' ')})`} />
                          <Line x1={100} y1={30} x2={100} y2={90} stroke="red" transform={`matrix(${matrix.join(' ')})`} />
                         <Line x1={100} y1={30} x2={100} y2={90} stroke="red" transform={`matrix(${matrix.join(' ')})`} />
                       </g>
                      </svg>
                    </div>
                  )
                }
};

// function tt(x,y){
//   return function ss(ComposedComponent){
//     class extends React.Component {
//         render() {
//           return (
//             <div onWheel={this.onWheel}>
//               <svg width={800} height={900}>
//                 <g x={x} y={y}
//                   transform={`matrix(${this.state.matrix.join(' ')})`}
//                 >
//                   <ComposedComponent {...this.props} />
//                 </g>
//               </svg>
//             </div>
//           )
//         }
//   };
// }

// tt(10,40)(React)