import React from 'react'

export default function LastVideoItem(props) {
  return (
    <div>
      <h4>{props.title}</h4>
      <img src={props.imgSrc} width="280px"/>
    </div>
  )
}
