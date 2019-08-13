import React from 'react';

export default function HeaderBase(props) {
    return (
        <header className={props.className}>
            <div className="lay">
                <div className="row">{props.children}</div>
            </div>
        </header>
    );
}
