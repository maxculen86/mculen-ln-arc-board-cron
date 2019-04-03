import React from 'react'

export default function ArticleTag(props) {
  return (
    <h3 className={props.classes}>
      <a href={props.url}>
        {props.tagName}
      </a>
    </h3>
  )
}
