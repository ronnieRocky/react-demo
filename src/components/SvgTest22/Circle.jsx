import React from 'react';


export default class Circle extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  };


onClick(){
  this.setState({ clicked : true  });
}

  render () {
    return (
          <g className="visual-circle">
              <circle  {...this.props} onClick={this.onClick} />
          </g>
    )
  }
}