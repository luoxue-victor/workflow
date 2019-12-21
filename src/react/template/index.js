import React, { useState, useReducer } from 'react'
import './index.scss'

const myReducer = (state, action) => {
  console.log(action, 'action')
  console.log(state, 'state')
  switch (action.type) {
    case ('countUp'):
      return {
        ...state,
        count: action.count
      }
    default:
      return state
  }
}

const arr = [[{ a: 1 }], [{ a: 2 }, { a: 3 }, { a: 4 }], [{ a: 5 }, { a: 6 }]]
const item = arr.map((cur, index) => {
  return <div key={index.toString()} style={{ backgroundColor: 'cyan' }}>
    {
      cur.map((item, idx) => {
        return <div key={idx.toString()}>{item.a}</div>
      })
    }
  </div>
})

export const App = () => {
  const [btnText, setBtnText] = useState('Click me, please')
  const [state, dispatch] = useReducer(myReducer, { count: 0 })

  function handleClick() {
    return setBtnText(btnText === 'Click me, please' ? 'Thanks, been clicked!' : 'Click me, please')
  }

  return (
    <div className="box">
      <button className="btn am amScale" onClick={handleClick}>
        <span>{btnText}</span>
      </button>
      <div className="btnBox">
        <div>Count: {state.count}</div>
        <button className="btn am amScale" onClick={() => dispatch({ type: 'countUp', count: state.count + 1 })}>
          <span>点我+1</span>
        </button>
      </div>
      <div>
        {item}
      </div>
    </div>
  )
}
