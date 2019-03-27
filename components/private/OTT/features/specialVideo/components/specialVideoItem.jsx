import React from 'react'

export default function SpecialVideoItem(props) {
  console.log(props.imgSrc)
    
  return (
    <div>
      <img src={props.imgSrc} width="280px"/>
    </div>
  )
}
