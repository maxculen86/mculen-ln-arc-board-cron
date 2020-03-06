import React from 'react';
import PropTypes from 'fusion:prop-types';

const FocalIzquierdo = ({ children }) => (
    <section className="row mod-layout-articles --apertura --left">
        <div className="col-tablet-8">{children[0]}</div>

        <div className="col-tablet-4">
            {children[1]}
            {children[2]}
        </div>

        <div className="row-gap-tablet-3">
            {children[3]}
            {children[4]}
            {children[5]}
        </div>
    </section>
);

FocalIzquierdo.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default FocalIzquierdo;
