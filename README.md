# react-fuzzy-toggle

Interruptible toggle with a state between 0 and 1. 
You can reverse the toggle direction before it has finished the toggling.

## npm

https://www.npmjs.com/package/react-fuzzy-toggle

## cdn

https://unpkg.com/react-fuzzy-toggle/


## demo

* npm install
* npm start

```js
import { FuzzyToggle } from 'react-fuzzy-toggle';

<FuzzyToggle
  duration={500 /* duration in milli seconds */ }
  isEmpty={false /* default false */}
  onFull={({hasReversed}) => {/* optional callback when full happens */}}
  onEmpty={({hasReversed}) => {/* optional callback */}}
  onIncreasing={({range, hasReversed}) => {/* optional callback */}}
  onDecreasing={({range, hasReversed}) => {/* optional callback */}}
  render={({ 
    onToggle, 
    range, 
    toggleState, 
    isFuzzy,
    hasReversed, 
  }) => (
    <div className="fuzzy-toggle">
      <div className="fuzzy-toggle__header">
        <button className="fuzzy-toggle__button" onClick={onToggle}>
          toggle
        </button>
      </div>
      <div className="fuzzy-toggle__box">
        <div>value between 0 and 1 included: {range.toFixed(1)}</div>
        <div>full, empty, increasing or decreasing: {toggleState}</div>
        <div>if range is between 0 and 1 not included: {isFuzzy}</div>
      </div>
    </div>
  )}
/>
```
