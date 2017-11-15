import React from 'react';
import Showcomponent from './Showcomponent';
import Unit from './Unit';

export default class Container extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    };

    onClick(con){
        this.props.onconclick(con);
    }
  

  render () {
    let id=1;
    return (
      <g className="container">
        { this.props.container.map(
            (component) => {
                // return <Unit component={<Showcomponent key={id++} comp={component} oncompClick={this.onClick} />} />;
                return <Unit key={id++} component={component} oncontainer={this.onClick} />;
            }
          )
        }
      </g>
    )
  }
}