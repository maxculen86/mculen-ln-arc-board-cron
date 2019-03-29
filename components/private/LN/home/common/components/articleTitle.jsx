import React, { Component } from 'react'

export default function ArticleTitle(props) {
  
    return (
        <h2 className="content-titulo">
            <a href={props.url}>
                {props.teaser &&
                    <span className="volanta">{props.teaser}</span>
                }
                {props.title}
            </a>
        </h2>
    )
  
}
