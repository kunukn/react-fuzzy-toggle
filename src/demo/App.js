import React from 'react';
import { FuzzyToggle } from '../library/ReactFuzzyToggle';

const round = val => val.toFixed(2);

export default class App extends React.Component {
  state = { duration: 1000 };

  render() {
    const generateMarkup = ({ onToggle, state }) => (
      <div className="fuzzy-toggle">
        <div className="fuzzy-toggle__header">
          <button className="fuzzy-toggle__button" onClick={onToggle}>
            toggle
          </button>
        </div>
        <div className="fuzzy-toggle__box">
          <div>{round(state.range)}</div>
          <div>{state.toggleState}</div>
        </div>
      </div>
    );

    const components = [];

    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        render={generateMarkup}
      />
    );
    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        render={generateMarkup}
      />
    );

    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        render={generateMarkup}
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
