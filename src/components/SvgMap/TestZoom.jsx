import React from 'react';
import ReactDOM from 'react-dom';
import {Viewer, ViewerHelper} from 'react-svg-pan-zoom';

export default class TestZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
      value: ViewerHelper.getDefaultValue(),
      tool: 'pan'  //one of `none`, `pan`, `zoom`, `zoom-in`, `zoom-out`
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    console.log(this.state.value);
  }
  handleChange(event) {
    console.log(event.value);
    this.setState({value: event.value});
  }

  handleClick(event){
    console.log('click', event.x, event.y, event.originalEvent);
  }

  render() {
      
    const { width, height } = this.props;
    return (

         <svg width={width} height={height}>
          <g
            transform={`matrix(${this.state.matrix.join(' ')})`}
          >
          
            {this.props.children}
             <Viewer width={900} height={900} value={this.state.value}
                tool={this.state.tool}  onChange={this.handleChange} onClick={this.handleClick}>

      <circle cx="90" cy="90" r="30" fill="green" stroke="green" />

                </Viewer>
          </g>
        </svg>
     
    );
  }
}