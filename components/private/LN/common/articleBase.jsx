import React from 'react';

export default function ArticleBase(props) {
    return (
        <article className={`mod-caja-nota ${props.extraClasses}`}>
            <imagen></imagen>
            <titulo></titulo>
            {props.children}
        </article>
    );
}
