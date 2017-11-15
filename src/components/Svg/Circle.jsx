import React from 'react';
// import { Enhance } from './Enhance';

export default class Circle extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  // componentWillMount() {
  //   console.log("Circle componentWillMount");
  // }

  render() {
    // console.log("Circle render");
    // console.log(this.props);
    // const cx = this.props.cx;
    // const cy = this.props.cy;
    return (
      <g className="visual-circle">
        <circle {...this.props} />
      </g>
    )
  }
}
// export default Enhance(Circle);