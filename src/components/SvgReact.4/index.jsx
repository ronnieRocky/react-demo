import React from 'react';
import Main from './Main';
import Path from './Shape/Path';
import SvgZoom from './SvgZoom';

export default class SvgReact extends React.Component {

  render() {
    console.log(this.props);
    return (
     <div className="svg">
          <SvgZoom width={"900"} height={"900"} >
            <Main {...this.props} />
          </SvgZoom>
     </div>
    );
  }
}



