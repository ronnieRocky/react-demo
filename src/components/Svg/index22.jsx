import React from 'react';


 // App
export default class Svg extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      x: 30,
      y: 30,
    };
    this.head = this.head.bind(this);
    
    this.ss = this.ss.bind(this);
    }
    
ss(){
  console.log("sdfasdf");
}
    head(x, y){
        this.setState({
          x,
          y,
        });
    }

  render() {
    return (
     <svg xmlns="http://www.w3.org/2000/svg"
       version="1.1"
       height='800'
       width='900'
     >
      <g>
        <Header ontest={this.head} x={this.state.x} y={this.state.y} />
        <IconUmbrella onClick={this.ss} x={this.state.x} y={this.state.y} ontest={this.head} hw={{ h: '800', w: '900' }} />
      </g>
      </svg>
    )
  }
}

//  Header
class Header extends React.Component {
     constructor(props) {
      super(props);
    }

  render() {
    const {x, y} = this.props;

    return (
     <circle cx={x} cy={y} r="30" fill="red" stroke="red" />
   )
  }
}


// Icon
class IconUmbrella extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }


  render() {
    const {x, y, hw} = this.props;
    return (
        <rect  x={x} y={y} height="20" width="20" fill="white" stroke="green" />
   )
  }
}
