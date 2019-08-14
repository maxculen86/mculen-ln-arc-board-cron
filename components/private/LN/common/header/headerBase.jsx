import React from 'react';

export default function HeaderBase(props) {
    return (
        <header id={props.id} className={props.className}>
            <div className="lay">
                <div className="row">{props.children}</div>
            </div>
        </header>
    );
}
