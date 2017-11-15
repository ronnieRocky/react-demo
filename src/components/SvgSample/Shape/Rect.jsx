import React from 'react';

export default class Rect extends React.Component {
  render () {
    return (
          <g>
              <rect {...this.props} />
          </g>
    )
  }
}
