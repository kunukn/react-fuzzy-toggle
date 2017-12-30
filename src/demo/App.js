import React from 'react';
import { FuzzyToggle } from '../library/ReactFuzzyToggle';

//import eases from 'eases'; // example, provide your own easing fn
//import BezierEasing from 'bezier-easing'; // example, provide your own easing fn
//const easeNames = Object.keys(eases);

const easeInOutQuart = t =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

// const getRandomEase = () => {
//   const index = Math.floor(Math.random() * easeNames.length);
//   return eases[easeNames[index]];
// };

export default class App extends React.Component {
  state = { duration: 1000 };

  render() {
    const generateMarkup = ({ onToggle, setCollasibleElement, state }) => (
      <div className="slide-toggle">
        <div className="slide-toggle__header">
          <button className="slide-toggle__button" onClick={onToggle}>
            toggle
          </button>
        </div>
        <div className="slide-toggle__box" ref={setCollasibleElement}>
          <div className="slide-toggle__box-inner">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
            <button onClick={() => window.alert('test tabindex')}>
              dummy button
            </button>
          </div>
        </div>
        <pre>
          {(() => {
            return JSON.stringify(state, null, 2);
          })()}
        </pre>
      </div>
    );

    const components = [];

    components.push(
      <FuzzyToggle
        key={components.length}
        duration={this.state.duration}
        easeIn={easeInOutQuart}
        easeOut={easeInOutQuart}
        collapsed={Math.random() > 0.5 ? true : false}
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
        {components}
      </div>
    );
  }
}
