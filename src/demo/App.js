import React from 'react';
import eases from 'eases';
import { FuzzyToggle } from '../library/ReactFuzzyToggle';

const log = console.log.bind(console);
const __ = null;
const round = val => val.toFixed(1);
const quartInOut = eases['quartInOut'];

window.easeNames = Object.keys(eases);

export default class App extends React.Component {
  state = { duration: 1000 };

  generateMarkupWithEase = (ease, easeName) => ({ onToggle, range, toggleState, isFuzzy }) => (
    <div className="fuzzy-toggle">
      <div className="fuzzy-toggle__header">
        <button className="fuzzy-toggle__button" onClick={onToggle}>
          toggle
        </button>
      </div>
      <div className="fuzzy-toggle__box">
        <div>{round(range)}</div>
        <div>{toggleState}</div>
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

  render() {
    const components = [];

    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        render={this.generateMarkupWithEase(eases['quartInOut'], 'quartInOut')}
        onFull={log.bind(__, 'onFull')}
        onEmpty={log.bind(__, 'onEmpty')}
        onIncreasing={log.bind(__, 'onIncreasing')}
        onDecreasing={log.bind(__, 'onDecreasing')}
      />
    );
    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        render={this.generateMarkupWithEase(
          eases['bounceInOut'],
          'bounceInOut'
        )}
      />
    );

    components.push(
      <FuzzyToggle
        key={'demo'}
        isEmpty
        duration={500}
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
              <div>isFuzzy: {isFuzzy+''}</div>
            </div>
          </div>
        )}
      />
    );

    return (
      <div className="app">
        <button
          className="app__button"
          onClick={() => {
            this.setState({ duration: ~~(Math.random() * 800 + 200) });
          }}
        >
          Randomize
        </button>
        <div>{this.state.duration}</div>
        {components}
      </div>
    );
  }
}
