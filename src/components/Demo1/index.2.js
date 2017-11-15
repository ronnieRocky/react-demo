import React from 'react';
import ReactDOM from 'react-dom';
import * as SRD from 'storm-react-diagrams';
import computeLayout from 'css-layout';
import range from 'lodash/range';
import './style.css';

/**
 *
 * Simple test showing the Object oriented way of using this library.
 *
 */
const em = (n) => {
  return n * 12;
}

const createLayoutMap = (obj, map = {}) => {
  if (obj.id) {
    map[obj.id] = obj.layout;
  }
  if (obj.children) {
    for (let i = 0; i < obj.children.length; i++) {
      createLayoutMap(obj.children[i], map);
    }
  }
  return map;
}

const numServers = 2;

const nodeTree = {
  id: 'root',
  style: { alignItems: 'center' },
  children: [
    {
      id: 'rescaleBox',
      style: { padding: em(1), width: em(12) },
      children: [
        { id: 'rescaleLabel', style: { height: em(1) } },
        {
          id: 'computeNodes',
          style: { height: em(3), marginBottom: em(2), marginTop: em(1) },
        },
        { id: 'licenseProxy', style: { height: em(3) } },
      ],
    },
    {
      id: 'onPremiseBox',
      style: {
        marginTop: em(3),
      },
      children: [
        { id: 'onPremiseLabel', style: { height: em(1), margin: em(1) } },
        {
          id: 'onPremiseServers',
          style: {
            flexDirection: 'row',
            marginBottom: em(1),
            paddingLeft: em(0.5),
            paddingRight: em(0.5),
          },
          children: range(0, numServers).map(i => {
            return {
              id: `server${i}`,
              style: {
                height: em(6),
                marginLeft: em(0.5),
                marginRight: em(0.5),
                width: em(8),
              },
            };
          }),
        },
      ],
    },
  ],
};

const gettext = s => { return s };
export default class Demo1 extends React.Component {

  render() {
    // ... all the other stuff above ...
    computeLayout(nodeTree);
    const l = createLayoutMap(nodeTree);
    console.log('---l')
    console.log(l);
    return (
      <svg width={l.root.width} height={l.root.height} xmlns="http://www.w3.org/2000/svg">
        <g transform={`translate(${l.rescaleBox.left}, ${l.rescaleBox.top})`}>
          <rect
            width={l.rescaleBox.width}
            height={l.rescaleBox.height}
            stroke="#70a5c3"
            strokeWidth="3"
            fill="#f9f9f9"
          />
          <text x={l.rescaleLabel.left} y={l.rescaleLabel.top} dy="1em" fontSize={em(1)}>
            {gettext('Rescale')}
          </text>
          <g transform={`translate(${l.computeNodes.left}, ${l.computeNodes.top})`}>
            <rect
              width={l.computeNodes.width}
              height={l.computeNodes.height}
              fill="#ffffdd"
              stroke="#333333"
              strokeWidth="2"
            />
            <text
              x={l.computeNodes.width / 2}
              y={l.computeNodes.height / 2}
              textAnchor="middle"
              dy="0.3em"
              fontSize={em(1)}
            >
              {gettext('Compute Nodes')}
            </text>
          </g>
          <g transform={`translate(${l.licenseProxy.left}, ${l.licenseProxy.top})`}>
            <rect
              width={l.licenseProxy.width}
              height={l.licenseProxy.height}
              fill="#ffffdd"
              stroke="#333333"
              strokeWidth="2"
            />
            <text
              x={l.licenseProxy.width / 2}
              y={l.licenseProxy.height / 2}
              textAnchor="middle"
              dy="-.3em"
              fontSize={em(1)}
            >
              {gettext('License Proxy')}
            </text>
            <text
              x={l.licenseProxy.width / 2}
              y={l.licenseProxy.height / 2}
              textAnchor="middle"
              dy="1em"
              fontSize={em(1)}
            >
              {gettext('licenseProxyIp')}
            </text>
          </g>
          // ... and so on, the rest is left as an exercise for the reader
   
          <g transform={`translate(${l.onPremiseBox.left}, ${l.onPremiseBox.top})`}>
            <rect
              width={l.onPremiseBox.width}
              height={l.onPremiseBox.height}
              stroke="#70a5c3"
              strokeWidth="3"
              fill="#f9f9f9"
            />
            <text x={l.onPremiseBox.left} y={l.onPremiseBox.top} dy="1em" fontSize={em(1)}>
              {gettext('onPremiseBox')}
            </text>
            <g transform={`translate(${l.onPremiseLabel.left}, ${l.onPremiseLabel.top})`}>
              <rect
                width={l.onPremiseLabel.width}
                height={l.onPremiseLabel.height}
                fill="#ffffdd"
                stroke="#333333"
                strokeWidth="2"
              />
              <text
                x={l.onPremiseLabel.width / 2}
                y={l.onPremiseLabel.height / 2}
                textAnchor="middle"
                dy="0.3em"
                fontSize={em(1)}
              >
                {gettext('onPremiseLabel')}
              </text>
            </g>
            <g transform={`translate(${l.onPremiseServers.left}, ${l.onPremiseServers.top})`}>
              <rect
                width={l.onPremiseServers.width}
                height={l.onPremiseServers.height}
                fill="#ffffdd"
                stroke="#333333"
                strokeWidth="2"
              />
              <text
                x={l.onPremiseServers.width / 2}
                y={l.onPremiseServers.height / 2}
                textAnchor="middle"
                dy="-.3em"
                fontSize={em(1)}
              >
                {gettext('onPremiseServers')}
              </text>
            </g>
          </g>
        </g>
      </svg>
    );
  }




}

