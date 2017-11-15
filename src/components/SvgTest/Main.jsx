
import React from 'react';
import Circle from './Circle';
import SVG from './Svg';
import Rect from './Rect';
import Path from './Path';
import Line from './Line';
import Template from './Template';
import Container from './Container';


export default class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      dragging: false,
      container : [ <circle className={"cir"} cx={"90"} cy={"90"} r={"30"} fill={"green"} stroke={"green"} />],
    };
    this.ConClick = this.ConClick.bind(this);
  };


    ConClick(con){
        this.setState({
            container : [...this.state.container, ...con],
        });
    }

  render() {
    return (
        <g className="MainGroup">
           <Container container={this.state.container} onconclick={this.ConClick} />
        </g>
    )
  }
}
    // {this.props.results.map(function(result) {
    //           return <ListItemWrapper key={result.id} data={result}/>;
    //         })}
    //         <Circle />
          // <ClickTemplate component={Circle}  />

          // <ClickTemplate cx={"90"} cy={"90"} r={"30"} fill={"green"} stroke={"green"} />
// var buttonprop = {
//     cx: '140',
//     cy: '80',
//     r: '10',
//     fill: 'white',
//     stroke: 'green',

//     x: '130',
//     y: '100',
//     rx: '10',
//     ry: '5',
//     width: '30',
//     height: '20',
//   };

// export default class SvgTest extends React.Component {
//   constructor(props) {
//      super(props);
//      this.state = {
//           container: [],
//           startX : 90,
//           startY : 90,
//           startR : 30,
//           rwidth : 100,
//           rheigth : 100,
//         };
//      this.onClick = this.onClick.bind(this);
//      this.buttonClick = this.buttonClick.bind(this);
//    };



//   buttonClick(type, bol) {
//     console.log(type);
//     console.log(bol);
//     let x= this.state.startX;
//     let y = this.state.startY;
//     let r = this.state.startR;
//     let rw = this.state.rwidth;
//     let rh = this.state.rheigth;
//     let pd = "M"+(x-5)+" "+(y+2*r)+"l5 5 5-5z";
//     let con =[];

//     if(type === "circle"){
//       con.push( <Line x1={x} y1={y+r} x2={x} y2={y+2*r} stroke="black"  /> );
//       con.push( <Path d={pd} /> );
//       con.push( <Circle cx={x} cy={y+5+3*r} r={r} />);
//       y = y+5+4*r;
//      }else{
//       con.push( <Line x1={x} y1={y+r} x2={x} y2={y+2*r} stroke="black"  /> );
//       con.push( <Path d={pd} /> );
//       con.push( <Rect x={x-rw/2} y={y+2*r+5} height={rh} width={rw} /> );
//       y = y+2*r+5+rh;
//     }
             
//     const state ={
//  	    container: [...con],
//       // startX : x,
//       // startY : y,
//     };
//     this.setState(state);
// }


//   onClick(e) {
//      let con = [];
//         console.log('onclick start ');
//         con.push(<Button txt={"cir"} type={"circle"} buttonprop={buttonprop} onbuttonClick={this.buttonClick} />);
//         con.push(<Button txt={"rect"} type={"rect"} buttonprop={buttonprop} onbuttonClick={this.buttonClick} />);

//         const state = {
//           container: [...con],
//         };

//         this.setState(state);
//   }

//   render() {
//     // const cirproptest = {cx:"90", cy:"90", r:"30", fill:"green", stroke:"green"};
//     return (
//       <div>
//         <SVG title={"SVG TEST"} description={"description"} minX={"0"} minY={"0"} width={"900"} height={"900"} >
//           <Circle cx={"90"} cy={"90"} r={"30"} fill={"green"} stroke={"green"} onClick={this.onClick} />
//           {this.state.container}
//         </SVG>
//       </div>
//     )
//   }
// }

