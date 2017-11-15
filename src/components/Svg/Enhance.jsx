import React from 'react';
import Direct from './Direct';

export const Enhance = (ComposedComponent) => class extends React.Component {



  // render() {
  //   console.log("Enhance render");
  //   console.log(this.props);
  //   const { scale } = this.state.scales;
  //   return (
  //     <div onWheel={this.onWheel}>
  //       <svg width={800} height={900}>
  //         <g
  //           transform={`matrix(${this.state.matrix.join(' ')})`}
  //         >
  //           <ComposedComponent {...this.props} />
  //         </g>
  //       </svg>
  //     </div>
  //   )
  // }
};