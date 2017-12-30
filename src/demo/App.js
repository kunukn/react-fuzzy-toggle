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

  generateMarkupWithEase = (ease, easeName) => ({ onToggle, state }) => (
    <div className="fuzzy-toggle">
      <div className="fuzzy-toggle__header">
        <button className="fuzzy-toggle__button" onClick={onToggle}>
          toggle
        </button>
      </div>
      <div className="fuzzy-toggle__box">
        <div>{round(state.range)}</div>
        <div>{state.toggleState}</div>
        <div>{easeName}</div>
        <div className="visual">
          <div
            className="visual__indicator"
            style={{
              transform: `scale3d(${ease(state.range)}, 1, 1)`,
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
        duration={500}
        render={({ onToggle, state }) => (
          <div className="fuzzy-toggle">
            <div className="fuzzy-toggle__header">
              <button className="fuzzy-toggle__button" onClick={onToggle}>
                toggle
              </button>
            </div>
            <div className="fuzzy-toggle__box">
              <div>{state.range.toFixed(1)}</div>
              <div>{state.toggleState}</div>
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
