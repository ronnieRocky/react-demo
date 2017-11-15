import React from 'react';
import Rx from 'rx';

class SvgTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // Click events are now observables! No more proactive approach.
  componentDidMount() {
    const plusBtn = document.getElementById('plus');
    const minusBtn = document.getElementById('minus');

    const plus$ = Rx.Observable.fromEvent(plusBtn, 'click').map(e => 1);
    const minus$ = Rx.Observable.fromEvent(minusBtn, 'click').map(e => -1);
    Rx.Observable.merge(plus$, minus$)
      .do(val => console.log(`${val}`))
      .startWith(8)
      .scan((acc, n) => acc + n)
        .subscribe(value => this.setState({ count: value }));
  }

  render() {
    return (
        <div>
          <button id="plus">+</button>
          <button id="minus">-</button>
          <div>count: {this.state.count}</div>
        </div>
    );
  }
}

export default SvgTest;

