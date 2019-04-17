import React from 'react';

export default function Program(props) {
    return (
        <a href={props.href}>
            <div>
                <h5>{props.description}</h5>
                <img src={props.imgSrc} />
            </div>
        </a>
    );
}
