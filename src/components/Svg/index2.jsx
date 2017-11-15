import React from 'react';
import Rect from './Rect';
import { Motion, spring } from 'react-motion';
import { SvgReact } from '../flow';


export default class Svg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isfold: true,
      offset: 100,
    };
    this.onclick = this.onclick.bind(this);
  }

  onclick(id) {
    console.log("index onclick");
    console.log(id);
    this.setState({
      isfold: !this.state.isfold,
      offset: this.state.isfold ? 100 : -100,
    });
  }

  render() {
    const arr = [Rect, Rect, Rect];
    const offset = 100;
    return (
        <SvgReact x={100} y={30} arr={arr} offset={this.state.offset} onClick={this.onclick} />
          
    );
  }
}
