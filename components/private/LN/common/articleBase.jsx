import React from 'react';

export default function ArticleBase(props) {
    return (
        <article className={`mod-caja-nota ${props.extraClasses}`}>
            {props.children}
        </article>
    );
}
