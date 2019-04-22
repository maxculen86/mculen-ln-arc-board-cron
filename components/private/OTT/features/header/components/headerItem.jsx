import React from 'react'

export default function HeaderItem(props) {
  return (
    <a href={props.href} className="header__nav__link" alt={props.alt} {...props.data}>{props.description}</a>
  )
}
