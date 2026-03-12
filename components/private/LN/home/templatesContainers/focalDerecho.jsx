import React from 'react';

function FocalDerecho({ children }) {
    return (
        <section className="row mod-layout-articles --apertura --right">
            <div className="col-tablet-4">
                {children[1]}
                {children[2]}
            </div>

            <div className="col-tablet-8">{children[0]}</div>

            <div className="row-gap-tablet-3">
                {children[3]}
                {children[4]}
                {children[5]}
            </div>
        </section>
    );
}

export default FocalDerecho;
