import React from 'react';
import Static from 'fusion:static';

const withStatic = Component => props => {
    const { id } = props;
    return (
        <Static id={id}>
            <Component {...props} />
        </Static>
    );
};

export default withStatic;
