import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';

export default function StaticValidation({
    children,
    id,
    notStatic,
    ...props
}) {
    const { outputType } = useAppContext();

    if (outputType === 'amp' || notStatic) return children;

    if (outputType !== 'amp' && !notStatic)
        return (
            <Static id={id} {...props}>
                {children}
            </Static>
        );

    return null;
}

StaticValidation.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    id: PropTypes.string.isRequired,
    notStatic: PropTypes.boolean
};

StaticValidation.defaultProps = {
    notStatic: false
};
