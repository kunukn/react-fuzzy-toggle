import React from 'react';
import eases from 'eases';
import { FuzzyToggle } from 'library/ReactFuzzyToggle';

const log = console.log.bind(console);
const round = val => val.toFixed(1);
const quartInOut = eases['quartInOut'];

export default class App extends React.Component {
  state = { duration: 1000 };

  generateMarkupWithEase = ({ ease, easeName }) => ({
    onToggle,
    range,
    toggleState,
    isFuzzy,
    hasReversed,
  }) => {

    /* optional logic here */

    return (
      <div className="fuzzy-toggle">
        <div className="fuzzy-toggle__header">
          <button className="fuzzy-toggle__button" onClick={onToggle}>
            toggle
          </button>
        </div>
        <div className="fuzzy-toggle__box">
          <div>{round(range)}</div>
          <div>toggleState: {toggleState}</div>
          <div>hasReversed: {hasReversed + ''}</div>
          <div>{easeName}</div>
          <div className="visual">
            <div
              className="visual__indicator"
              style={{
                transform: `scale3d(${ease(range)}, 1, 1)`,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const components = [];

    components.push(
      <FuzzyToggle
        key={components.length}
        isEmpty
        duration={500}
        onFull={() => log('onFull')}
        onEmpty={() => log('onEmpty')}
        onIncreasing={() => log('onIncreasing')}
        onDecreasing={() => log('onDecreasing')}
        render={({ onToggle, range, toggleState, isFuzzy }) => (
          <div className="fuzzy-toggle">
            <div className="fuzzy-toggle__header">
              <button className="fuzzy-toggle__button" onClick={onToggle}>
                toggle
              </button>
            </div>
            <div className="fuzzy-toggle__box">
              <div>range: {range.toFixed(1)}</div>
              <div>state: {toggleState}</div>
              <div>isFuzzy: {isFuzzy + ''}</div>
            </div>
          </div>
        )}
      />
    );

    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        render={this.generateMarkupWithEase({
          ease: eases['quartInOut'],
          easeName: 'quartInOut',
        })}
      />
    );
    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        render={this.generateMarkupWithEase({
          ease: eases['bounceInOut'],
          easeName: 'bounceInOut',
        })}
      />
    );

    return (
      <div className="app">
        <FuzzyToggle
          isEmpty
          duration={this.state.duration}
          render={({ onToggle, range, toggleState, isFuzzy }) => {
            const value =
              toggleState === 'INCREASING'
                ? eases['circIn'](1 - range)
                : eases['bounceOut'](1 - range);

            return (
              <div className="menu-toggle">
                <div className="menu-toggle__header">
                  <button className="menu-toggle__button" onClick={onToggle}>
                    menu toggle (<span>{range.toFixed(1)}</span>)
                  </button>
                </div>
                <div
                  className="menu-toggle__box"
                  style={{
                    transform: `translate3d(calc(${-100 * value}% + ${value *
                      0.5}rem),0,0)`,
                  }}
                >
                  menu
                </div>
              </div>
            );
          }}
        />

        <button
          className="app__button"
          onClick={() => {
            this.setState({ duration: ~~(Math.random() * 800 + 200) });
          }}
        >
          Randomize duration
        </button>
        <div>{this.state.duration}</div>
        {components}
      </div>
    );
  }
}
