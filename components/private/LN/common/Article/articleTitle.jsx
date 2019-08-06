import React from 'react';

export default function ArticleTitle(props) {
    return (
        <h2 className="com-title-acu">
            <a href={props.canonical_url}>
                <b>{props.volanta}</b>
                {props.titleText}
            </a>
        </h2>
    );
}
