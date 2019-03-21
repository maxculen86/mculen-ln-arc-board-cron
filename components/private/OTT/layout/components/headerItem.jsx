import React from 'react'

export default function HeaderItem(props) {
  return (
    <a href={props.href} alt={props.alt} data={props.data}>{props.description}</a>
  )
}
