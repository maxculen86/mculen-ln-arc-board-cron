import React from 'react'

export default function LastVideoItem(props) {
    console.log("props que legan a LastVideoItem component ", props)
  return (
    <div>
      <h4>{props.title}</h4>
      <img src={props.imgSrc} width="280px"/>
    </div>
  )
}
