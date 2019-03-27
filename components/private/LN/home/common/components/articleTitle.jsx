import React, { Component } from 'react'

export default function ArticleTitle(props) {
  
    return (
        <h2 className="content-titulo">
            <a href={props.url}>
                {props.volanta &&
                    <span className="volanta">{props.volanta}</span>
                }
                {props.titulo}
            </a>
        </h2>
    )
  
}
