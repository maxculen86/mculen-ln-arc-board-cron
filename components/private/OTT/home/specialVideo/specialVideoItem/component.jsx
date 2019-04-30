import React from 'react';

export default function SpecialVideoItem(props) {
    return (
        <a href={props.url} target="_blank">
            <div>
                <img src={props.imgSrc} width="280px" />
            </div>
        </a>
    );
}
