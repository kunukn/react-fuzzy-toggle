import React from 'react';
import eases from 'eases';
import { FuzzyToggle } from '../library/ReactFuzzyToggle';

const round = val => val.toFixed(1);
const ease = eases['quartInOut'];

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
          <div className="visual">
          <div className="visual__indicator"
            style={{
              transform: `scale3d(${ease(state.range)}, 1, 1)`,
            }}
          ></div>
          </div>
        </div>
      </div>
    );

    const components = [];

    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        render={generateMarkup}
        onFull={()=>console.log('onFull')}
        onEmpty={()=>console.log('onEmpty')}
        onIncreasing={()=>console.log('onIncreasing')}
        onDecreasing={()=>console.log('onDecreasing')}
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
