import React from 'react';
import defaultTo from 'ramda/src/defaultTo';
import map from 'ramda/src/map';
import addIndex from 'ramda/src/addIndex';
import curry from 'ramda/src/curry';
import divide from 'ramda/src/divide';
import './animation.less';

const mapIndex = addIndex(map);
const px = str => `${str}px`;
const transform = width => (idx) => {
  let trans = '';
  switch (idx) {
    case 1:
      trans = `translateZ(${width})`;
      break;
    case 2:
      trans = `rotateY(90deg) translateZ(${width})`;
      break;
    case 3:
      trans = `rotateY(90deg) rotateX(90deg) translateZ(${width})`;
      break;
    case 4:
      trans = `rotateY(180deg) rotateZ(90deg) translateZ(${width})`;
      break;
    case 5:
      trans = `rotateY(-90deg) rotateZ(90deg) translateZ(${width})`;
      break;
    case 6:
      trans = `rotateX(-90deg) translateZ(${width})`;
      break;
    default:
  }
  return trans;
}
const curriedTransform = curry(transform);
export default class AnimationCube extends React.Component {
  constructor(props) {
    super(props);
    this.enter = this.enter.bind(this);
    this.leave = this.leave.bind(this);
    this.state = {
      defParentStyles: {
        width: defaultTo('40'),
        // height: defaultTo('40'),
        top: defaultTo('0'),
        left: defaultTo('8'),
        animationDuration: defaultTo('6s'),
      },
      defChildStyles: {
        border: defaultTo('1px solid #ccc'),
        backgroundColor: defaultTo('#000000'),
        fontSize: defaultTo('25'),
        color: defaultTo('#6db33f'),
      },
      hover: false,
    }
  }

  enter() {
    if (this.props.multi) {
      this.setState({
        hover: true,
      })
    }
  }
  leave() {
    if (this.props.multi) {
      this.setState({
        hover: false,
      })
    }
  }
  render() {
    const {
      multi,
      width,
      // height,
      duration: animationDuration,
      top,
      left,
      ...props
    } = this.props;
    const dPx = str => px(divide(str)(2));
    const hover = this.state.hover;
    const pWidth = this.state.defParentStyles.width(width);
    const getTranZ = curriedTransform(dPx(hover ? defaultTo(pWidth)(pWidth * multi) : pWidth));
    // const pHeight = this.state.defParentStyles.height(height);
    const parentStyles = {
      width: px(pWidth),
      height: px(pWidth),
      animationDuration: this.state.defParentStyles.animationDuration(animationDuration),
      top: px(this.state.defParentStyles.top(top)),
      left: px(this.state.defParentStyles.left(left)),
      transformOrigin: `${dPx(pWidth)} ${dPx(pWidth)} 0`,
      lineHeight: px(pWidth),
    };
    const enhance = mapIndex(
            (child, idx) => {
              const defChildStyles = this.state.defChildStyles;
              const { border, backgroundColor, fontSize, color, ...others } = child.props;
              const tranz = px(width / 2);
              const newStyles = {
                border: this.state.defChildStyles.border(border),
                backgroundColor: this.state.defChildStyles.backgroundColor(backgroundColor),
                fontSize: px(this.state.defChildStyles.fontSize(fontSize)),
                color: this.state.defChildStyles.color(color),
                width: parentStyles.width,
                height: parentStyles.height,
                className: `face${idx + 1}`,
                transform: getTranZ(idx + 1),
              };
              return React.cloneElement(child, { ...others, ...newStyles, key: idx });
            });
    const Node = ({ className, styles, nodes, enter, leave }) =>
        <div
          className={className}
          style={{ ...styles }}
          onMouseEnter={enter}
          onMouseLeave={leave}
        >
          { enhance(nodes) }
        </div>;
    return (
      <Node
        className={'cubespinner'}
        styles={{ ...parentStyles }}
        nodes={this.props.children}
        enter={this.enter}
        leave={this.leave}
      />
    )
  }
}
