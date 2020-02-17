import React from 'react';
import PropTypes from 'fusion:prop-types';

const FocalDerecho = ({ children }) => (
    <section className="row">
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
            className="col-tablet-4"
            style={{
                paddingLeft: '1.6875rem'
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

FocalDerecho.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default FocalDerecho;
