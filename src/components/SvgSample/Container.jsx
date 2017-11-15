import React from 'react';
import Showcomponent from './Showcomponent';

export default class Container extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    };

    onClick(baseX, baseY, temX, temY){
        this.props.onconclick(baseX,baseY,temX,temY,true);
    }

  render () {
    let id =1;
    return (
      <g >
        { this.props.container.map(
            (component) => {
                return <Showcomponent key={id++} comp={component} oncompClick={this.onClick} />;
            }
          )
        }
      </g>
    )
  }
}