/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';

export default function StaticValidation({ children, id, isStatic, ...props }) {
    const { outputType } = useAppContext();

    if (outputType === 'amp' || !isStatic) return children;

    if (outputType && outputType !== 'amp' && isStatic)
        return (
            <Static id={id} {...props}>
                {children}
            </Static>
        );

    return null;
}

StaticValidation.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
        .isRequired,
    id: PropTypes.string.isRequired,
    isStatic: PropTypes.boolean
};

StaticValidation.defaultProps = {
    isStatic: true
};
