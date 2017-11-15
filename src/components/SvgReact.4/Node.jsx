import React from 'react';

export default class Node extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultoffset: 50,
    }
  }

  onAdd(id) {
    this.props.onAdd(id);
  }


  render() {
    const { component, offset } = this.props;
    
    return (
        component
    )
  }
}
