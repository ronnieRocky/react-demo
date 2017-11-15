import React from 'react';
import Rect from './Rect';
import Circle from './Circle';
import Flow from '../Flow/Flow';
import Node from '../Flow/Node';
import styles from './index.less';
// import './index.less';

export default class Svg extends React.Component {

  render() {
    return (
    <div
      className={styles.stage}
    >
       <div className={styles.cubespinner}>
          <div className={styles.face1}>Y</div>
          <div className={styles.face2}>O</div>
          <div className={styles.face3}>N</div>
          <div className={styles.face4}>O</div>
          <div className={styles.face5}>B</div>
          <div className={styles.face6}>I</div>
       </div>
    </div>
    )
  }
}
