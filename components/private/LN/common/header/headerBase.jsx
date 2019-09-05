import React from 'react';

export default function HeaderBase(props) {
    const { id, className, children } = props;
    return (
        <header id={id} className={className}>
            <div className="lay">
                <div className="row">{children}</div>
            </div>
        </header>
    );
}
