import React from 'react';
import PropTypes from 'fusion:prop-types';

const FocalDerecho = ({ children }) => (
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

FocalDerecho.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default FocalDerecho;
