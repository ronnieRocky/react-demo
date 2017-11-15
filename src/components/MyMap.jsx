import React from 'react';

class MyMap extends React.Component {
  render() {
    return (
      <g>
        <circle cx="40" cy="40" r="50" fill="green" stroke="green"></circle>
		<rect x="50" y="50" height="100" width="100" fill="black" stroke="teal"></rect>
      </g>
    );
  }
}
export default MyMap;