import React, { useState } from 'react'
import './iframe.css'

export default function Iframe({ src }) {
  const [count, setCount] = useState(0)

  return (
    <iframe style={{ height: '100vh', }} src={src || 'https://www.baidu.com/'} frameborder="0"></iframe>
  )
}
