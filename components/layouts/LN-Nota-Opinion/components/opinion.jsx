import React from 'react';

function Opinion({ children, ...props }) {
    // TODO: construir template, dejamos esto a modo mock
    return (
        <div {...props}>
            <h1 className="mb-24 text-56">probando H1</h1>
            <div>{children}</div>
        </div>
    );
}

export default Opinion;
