# react-fuzzy-toggle

Interruptible toggle with a state between 0 and 1. 
You can reverse the toggle direction before it has finished the toggling.


## Demo

* npm install
* npm start

```js
import { FuzzyToggle } from 'react-fuzzy-toggle';

<FuzzyToggle
  duration={500 /* duration in milli seconds */ }
  isFull={/* default true */}
  onFull={() => {/* optional callback when full happens */}}
  onEmpty={() => {/* optional callback */}}
  onIncreasing={() => {/* optional callback */}}
  onDecreasing={() => {/* optional callback */}}
  render={({ onToggle, state }) => (
    <div className="fuzzy-toggle">
      <div className="fuzzy-toggle__header">
        <button className="fuzzy-toggle__button" onClick={onToggle}>
          toggle
        </button>
      </div>
      <div className="fuzzy-toggle__box">
        <div>value between 0 and 1 included: {state.range.toFixed(1)}</div>
        <div>full, empty, increasing or decreasing: {state.toggleState}</div>
      </div>
    </div>
  )}
/>
```
