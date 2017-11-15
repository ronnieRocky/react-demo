import React from 'react';
import Main from './Main';
import Svg from './Svg';
import Path from './Path';
import SvgZoom from './SvgZoom';

export default class SvgMap extends React.Component {

  render() {

    return (
     <div　className="svg">
          <SvgZoom width={"900"} height={"900"} >
            <Main />
          </SvgZoom>
     </div>
    );
  }
}



