import React from 'react';


export default class Group extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  };


onClick(){
  this.setState({ clicked : true  });
}

  render () {
    return (
          <g>
              <circle  {...this.props} onClick={this.onClick} />
          </g>
    )
  }
}