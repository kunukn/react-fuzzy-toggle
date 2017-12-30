/*
  _state_ is internal state.
  used for minimizing unnessary re-renderings and because setState is async.
*/

import React from 'react';
//import PropTypes from 'prop-types';

const log = console.log.bind(console);
const warn = console.warn.bind(console);

const rAF = window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : callback => window.setTimeout(callback, 16);
const cAF = window.cancelAnimationFrame
  ? window.cancelAnimationFrame.bind(window)
  : window.clearInterval.bind(window);

const TOGGLE = {
  EMPTY: 'EMPTY',
  FULL: 'FULL',
  DECREASING: 'DECREASING',
  INCREASING: 'INCREASING',
};

export default class FuzzyToggle extends React.Component {
  static defaultProps = {
    duration: 300,
    isFull: true,
    onFull: null,
    onEmpty: null,
    onDecreasing: null,
    onDecreasing: null,
  };

  // static propTypes = {
  //   duration: PropTypes.number,
  //   isFull: PropTypes.bool,
  //   onFull: PropTypes.func,
  //   onEmpty: PropTypes.func,
  //   onDecreasing: PropTypes.func,
  //   onDecreasing: PropTypes.func,
  // };

  constructor(props) {
    super(props);

    this._state_ = {
      toggleState: this.props.isFull ? TOGGLE.FULL : TOGGLE.EMPTY,
      range: this.props.isFull ? 1 : 0,
    };

    this.setDuration(this.props.duration);

    this.state = {
      toggleState: this._state_.toggleState,
      range: this._state_.range,
    };
  }

  now() {
    return new Date().getTime();
  }

  onFull = () => {
    this.props.onFull && this.props.onFull();
  };
  onEmpty = () => {
    this.props.onEmpty && this.props.onEmpty();
  };
  onIncreasing = () => {
    this.props.onIncreasing && this.props.onIncreasing();
  };
  onDecreasing = () => {
    this.props.onDecreasing && this.props.onDecreasing();
  };

  onToggle = () => {
 
    const update_State_ = ({ toggleState, isReverse }) => {
      const now = this.now();

      this._state_.toggleState = toggleState;

      if (isReverse) {
        const { duration, startTime } = this._state_;
        const elapsedTime = Math.min(duration, now - startTime);
        const subtract = Math.max(0, duration - elapsedTime);
        this._state_.startTime = now - subtract;
      } else {
        this._state_.startTime = now;
      }
    };

    const doIncrease = () => {
      this.setState({ toggleState: TOGGLE.INCREASING });
      this.onIncreasing();
      this.increaseEvent();
    }

    const doDecrease = () => {
      this.setState({ toggleState: TOGGLE.DECREASING });
      this.onDecreasing();
      this.decreaseEvent();
    }

    if (this._state_.toggleState === TOGGLE.FULL) {
      update_State_({ toggleState: TOGGLE.DECREASING });
      doDecrease();
    } else if (this._state_.toggleState === TOGGLE.EMPTY) {
      update_State_({ toggleState: TOGGLE.INCREASING });
      doIncrease();
    } else if (this._state_.toggleState === TOGGLE.INCREASING) {
      update_State_({ toggleState: TOGGLE.DECREASING, isReverse: true });
      doDecrease();
    } else if (this._state_.toggleState === TOGGLE.DECREASING) {
      update_State_({
        toggleState: TOGGLE.INCREASING,
        isReverse: true,
      });
      doIncrease();
    }
  };

  setDuration = duration => {
    this._state_.duration = parseInt(duration, 10) || 0;
  };

  setToEmptyState = () => {
    this._state_.toggleState = TOGGLE.EMPTY;
    this.setState({
      toggleState: TOGGLE.EMPTY,
      range: 0,
    });
    this.onEmpty();
  };

  decreaseEvent = () => {
    if (this._state_.toggleState !== TOGGLE.DECREASING) {
      return;
    }

    const { duration, startTime } = this._state_;
    const elapsedTime = Math.min(duration, this.now() - startTime);
    const range = 1 - elapsedTime / duration;

    this.setState({ range });

    if (elapsedTime < duration) {
      this._state_.timeout = this.nextTick(this.decreaseEvent);
    } else {
      this.setToEmptyState();
    }
  };

  setToFullState = () => {
    this._state_.toggleState = TOGGLE.FULL;
    this.setState({
      toggleState: TOGGLE.FULL,
      range: 1,
    });
    this.onFull();
  };

  increaseEvent = () => {
    if (this._state_.toggleState !== TOGGLE.INCREASING) {
      return;
    }

    const { duration, startTime } = this._state_;
    const elapsedTime = Math.min(duration, this.now() - startTime);
    const range = elapsedTime / duration;

    this.setState({ range });

    if (elapsedTime < duration) {
      this.nextTick(this.increaseEvent);
    } else {
      this.setToFullState();
    }
  };

  nextTick = callback => {
    this._state_.timeout = rAF(callback);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.duration !== this.props.duration) {
      this.setDuration(nextProps.duration);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.range !== this.state.range;
  }

  render() {
    return this.props.render({
      onToggle: this.onToggle,
      state: this.state,
    });
  }

  componentWillUnmount() {
    cAF(this._state_.timeout);
  }
}
