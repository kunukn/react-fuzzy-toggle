# react-fuzzy-toggle

Interruptible toggle with a state between 0 and 1. 
You can reverse the toggle direction before it has finished the toggling.


## Demo

* npm install
* npm start

```js
import { FuzzyToggle } from 'ReactFuzzyToggle';

<FuzzyToggle
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
```
