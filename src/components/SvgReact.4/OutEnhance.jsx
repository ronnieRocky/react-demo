import React from 'react';
import Circle from './Shape/Circle';

export const OutEnhance = (x, y) => 
    (ComposedComponent) => 
            class extends React.Component {
              constructor(props) {
                  super(props);
                  this.state = {
                    matrix: [1, 0, 0, 1, 0, 0],
                  };
                  // this.onclick= this.onclick.bind(this);
                }

                onclicks(e) {
                  console.log(e.target.id);
                  // this.props.onClick(e.target.id, 100);
                }

                render() {
                  // console.log("Enhance render");
                  // console.log(this.props);
                  const matrix = [1, 0, 0, 1, x, y];
                  return (
                        <g>
                          <ComposedComponent {...this.props} transform={`matrix(${matrix.join(' ')})`} />
                        </g>
                  )
                }
};
