/*
  _state_ is internal state, used for minimize unnessary re-renderings.
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
  };

  // static propTypes = {
  //   duration: PropTypes.number,
  //   isFull: PropTypes.bool,
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
      duration: this._state_.duration,
      range: this._state_.range,
    };
  }

  now() {
    return new Date().getTime();
  }

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

    if (this._state_.toggleState === TOGGLE.FULL) {
      update_State_({ toggleState: TOGGLE.DECREASING });
      this.setState({
        toggleState: TOGGLE.DECREASING,
      });
      this.decreaseEvent();
    } else if (this._state_.toggleState === TOGGLE.EMPTY) {
      update_State_({ toggleState: TOGGLE.INCREASING });
      this.setState({
        toggleState: TOGGLE.INCREASING,
      });
      this.increaseEvent();
    } else if (this._state_.toggleState === TOGGLE.INCREASING) {
      update_State_({ toggleState: TOGGLE.DECREASING, isReverse: true });
      this.setState({
        toggleState: TOGGLE.DECREASING,
      });
      this.decreaseEvent();
    } else if (this._state_.toggleState === TOGGLE.DECREASING) {
      update_State_({
        toggleState: TOGGLE.INCREASING,
        isReverse: true,
      });
      this.setState({
        toggleState: TOGGLE.INCREASING,
      });
      this.increaseEvent();
    }
  };

  setDuration = duration => {
    const durationNumber = parseInt(duration, 10) || 0;
    this._state_.duration = durationNumber;
    return durationNumber;
  };

  setToEmptyState = () => {
    this._state_.toggleState = TOGGLE.EMPTY;
    this.setState({
      toggleState: TOGGLE.EMPTY,
      range: 0,
    });
  };

  decreaseEvent = () => {
    if (this._state_.toggleState !== TOGGLE.DECREASING) {
      return;
    }

    const { duration, startTime } = this._state_;
    const elapsedTime = Math.min(duration, this.now() - startTime);
    const range = elapsedTime / duration;

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
      const duration = this.setDuration(nextProps.duration);
      this.setState({ duration });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    //return nextState.value !== this.state.value;
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
