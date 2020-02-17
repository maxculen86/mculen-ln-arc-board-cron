import React from 'react';
import PropTypes from 'fusion:prop-types';

const FocalIzquierdo = ({ children }) => (
    <section className="row">
        <div
            className="col-tablet-4"
            style={{
                paddingRight: '1.6875rem'
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#E9E9E9',
                    padding: '10px'
                }}
            >
                {children[1]}
                {children[2]}
            </div>
        </div>
        <div
            className="col-tablet-8"
            style={{
                minHeight: '250px',
                background: '#cccccc',
                padding: '10px'
            }}
        >
            {children[0]}
        </div>
        <div
            className="row-gap-tablet-3"
            style={{
                width: '100%',
                minHeight: '100px',
                marginTop: '1.875rem'
            }}
        >
            <div
                style={{
                    padding: '10px',
                    background: '#E9E9E9'
                }}
            >
                {children[3]}
            </div>
            <div
                style={{
                    padding: '10px',
                    background: '#E9E9E9'
                }}
            >
                {children[4]}
            </div>
            <div
                style={{
                    padding: '10px',
                    background: '#E9E9E9'
                }}
            >
                {children[5]}
            </div>
        </div>
    </section>
);

FocalIzquierdo.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default FocalIzquierdo;
