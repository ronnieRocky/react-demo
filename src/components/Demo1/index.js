import React from 'react';
import ReactDOM from 'react-dom';
import * as SRD from 'storm-react-diagrams';
import computeLayout from 'css-layout';
import mermaid from 'mermaid';
import './style.css';

const ss = () => {
  return (`graph LR
A[Square Rect] --> B((Circle))
A[Square Rect] --> C((Circle))
`)
}

export default class Demo1 extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="mermaid">
          {ss()}
      </div>
    )
  }


}

