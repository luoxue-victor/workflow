import React, { useState, useReducer } from 'react'

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

const arr = [[{ a: 1 }], [{ a: 4 }, { a: 5 }, { a: 6 }], [{ a: 7 }, { a: 8 }]]
const item = arr.map((cur, index) => {
  return <div key={index.toString()} style={{ margin: '20px', backgroundColor: 'cyan' }}>
    {
      cur.map((item, idx) => {
        return <p key={idx.toString()}>{item.a}</p>
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

  return <div>
    <button onClick={handleClick}>{btnText}</button>
    <div>
      <button onClick={() => dispatch({ type: 'countUp', count: state.count + 1 })}>
                +1
      </button>
      <p>Count: {state.count}</p>
    </div>
    <div style={{ display: 'flex' }}>
      {item}
    </div>
  </div>
}
