/*
  _state_ is internal state for sync and rendering control.
  setState is async and I need sync control because timing is important 
  and because I need to control what is to be re-rendered.
*/

import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

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

const util = {
  isFuzzy: toggleState =>
    toggleState === TOGGLE.INCREASING || toggleState === TOGGLE.DECREASING,
  clamp: ({ value, max = 1, min = 0 }) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  },
  now: () => new Date().getTime(),
  sanitizeDuration: duration => Math.max(0, parseInt(+duration, 10) || 0),
};

export default class FuzzyToggle extends React.Component {
  static defaultProps = {
    duration: 300,
    isEmpty: false,
    onFull: null,
    onEmpty: null,
    onDecreasing: null,
  };

  // static propTypes = {
  //   render: PropTypes.func.isRequired,
  //   duration: PropTypes.number,
  //   isEmpty: PropTypes.bool,
  //   onFull: PropTypes.func,
  //   onEmpty: PropTypes.func,
  //   onDecreasing: PropTypes.func,
  //   onDecreasing: PropTypes.func,
  // };

  constructor(props) {
    super(props);

    this._state_ = {
      toggleState: this.props.isEmpty ? TOGGLE.EMPTY : TOGGLE.FULL,
      hasReversed: false,
    };

    this.state = {
      toggleState: this._state_.toggleState,
      hasReversed: this._state_.hasReversed,
      range: this.props.isEmpty ? 0 : 1,
      isFuzzy: false,
    };
  }

  render() {
    return this.props.render({
      onToggle: this.onToggle,
      toggleState: this.state.toggleState,
      isFuzzy: util.isFuzzy(this.state.toggleState),
      range: this.state.range,
      hasReversed: this.state.hasReversed,
    });
  }

  onFull = () => {
    if (this.props.onFull) this.props.onFull();
  };
  onEmpty = () => {
    if (this.props.onEmpty) this.props.onEmpty();
  };
  onIncreasing = () => {
    if (this.props.onIncreasing) this.props.onIncreasing();
  };
  onDecreasing = () => {
    if (this.props.onDecreasing) this.props.onDecreasing();
  };

  onToggle = () => {
    const updateInternalState = ({ toggleState, hasReversed = false }) => {
      const now = util.now();

      this._state_.toggleState = toggleState;
      this._state_.hasReversed = hasReversed;

      if (hasReversed) {
        const { startTime } = this._state_;
        const duration = util.sanitizeDuration(this.props.duration);
        const elapsedTime = Math.min(duration, now - startTime);
        const subtract = Math.max(0, duration - elapsedTime);
        this._state_.startTime = now - subtract;
      } else {
        this._state_.startTime = now;
      }

      this.setState({
        toggleState: this._state_.toggleState,
        hasReversed: this._state_.hasReversed,
        isFuzzy: util.isFuzzy(this._state_.toggleState),
      });
    };

    const doIncrease = () => {
      this.onIncreasing();
      this.increaseEvent();
    };

    const doDecrease = () => {
      this.onDecreasing();
      this.decreaseEvent();
    };

    if (this._state_.toggleState === TOGGLE.FULL) {
      updateInternalState({ toggleState: TOGGLE.DECREASING });
      doDecrease();
    } else if (this._state_.toggleState === TOGGLE.EMPTY) {
      updateInternalState({ toggleState: TOGGLE.INCREASING });
      doIncrease();
    } else if (this._state_.toggleState === TOGGLE.INCREASING) {
      updateInternalState({
        toggleState: TOGGLE.DECREASING,
        hasReversed: true,
      });
      doDecrease();
    } else if (this._state_.toggleState === TOGGLE.DECREASING) {
      updateInternalState({
        toggleState: TOGGLE.INCREASING,
        hasReversed: true,
      });
      doIncrease();
    }
  };

  setToEmptyState = () => {
    this.setState({
      range: 0,
      toggleState: TOGGLE.EMPTY,
      isFuzzy: false,
    });
    this._state_.toggleState = TOGGLE.EMPTY;
    this.onEmpty();
  };

  decreaseEvent = () => {
    if (this._state_.toggleState !== TOGGLE.DECREASING) {
      return;
    }

    const duration = util.sanitizeDuration(this.props.duration);
    if (duration <= 0) {
      this.setToEmptyState();
      return;
    }

    const { startTime } = this._state_;

    const elapsedTime = Math.min(duration, util.now() - startTime);
    const range = util.clamp({ value: 1 - elapsedTime / duration });

    this.setState({ range });

    if (elapsedTime < duration) {
      this._state_.timeout = this.nextTick(this.decreaseEvent);
    } else {
      this.setToEmptyState();
    }
  };

  setToFullState = () => {
    this.setState({
      range: 1,
      toggleState: TOGGLE.FULL,
      isFuzzy: false,
    });
    this._state_.toggleState = TOGGLE.FULL;
    this.onFull();
  };

  increaseEvent = () => {
    if (this._state_.toggleState !== TOGGLE.INCREASING) {
      return;
    }

    const duration = util.sanitizeDuration(this.props.duration);
    if (duration <= 0) {
      this.setToFullState();
      return;
    }

    const { startTime } = this._state_;
    const elapsedTime = Math.min(duration, util.now() - startTime);
    const range = util.clamp({ value: elapsedTime / duration });

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

  componentWillUnmount() {
    cAF(this._state_.timeout);
  }
}
