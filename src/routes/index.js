import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../components/App';
import NotFound from '../components/NotFound';
import Svg from '../components/Svg';
import SvgMap from '../components/SvgMap';
import SvgTest from '../components/SvgTest';
import SvgSample from '../components/SvgSample';
import SvgReactOld from '../components/SvgReactOld';
import FlowSvg from '../components/FlowSvg_complete';
import Redux from '../components/Redux';
import Demo1 from '../components/Demo1';
import Tree from '../components/TreeDrag/example';

const Routes = ({ history }) =>
    <Router history = { history } >
    <Route path = "/" component = { App } />
    <Route path = "/actived" component = { App } />
    <Route path = "/completed" component = { App } />
    <Route path = "/svg" component = { Svg } />
    <Route path = "/st" component = { SvgMap } />
    <Route path = "/ts" component = { SvgTest } />
    <Route path = "/sp" component = { SvgSample } />
    <Route path = "/so" component = { SvgReactOld } />
    <Route path = "/flow" component = { FlowSvg } />
    <Route path = "/redux" component = { Redux } />
    <Route path = "/demo1" component = { Demo1 } />
    <Route path = "/tree" component = { Tree } />

<Route path = "*" component = { NotFound } />
 </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
