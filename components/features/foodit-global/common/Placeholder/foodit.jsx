import React from 'react';

export const Placeholder = () => {
    return (
        <div>
            <div>
                <h1> inicio </h1>
            </div>
            <div
                style={{
                    height: '300px',
                    background: 'blue',
                    width: '100%'
                }}
            >
                <h1 style={{ fontSize: '6rem', color: 'white' }}>
                    Placeholder default
                </h1>
            </div>
            <div>
                <h2> fin</h2>
            </div>
        </div>
    );
};

export default Placeholder;
