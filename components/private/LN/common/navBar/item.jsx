/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

export default function Item(props) {
    return (
        <a href={props.href} className={`${props.colClass} item-foo`}>
            <i className={props.iconClass} />
            <p>{props.description}</p>
        </a>
    );
}
