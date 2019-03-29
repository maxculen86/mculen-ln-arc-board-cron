import React from 'react'

export default function ArticleBajada (props) {
    return (
        <h4 className="content-bajada">
            <a href={props.url}>
                {props.subheader}
            </a>
        </h4>
    )
}