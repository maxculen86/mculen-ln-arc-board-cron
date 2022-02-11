import React from 'react';
import PropTypes from 'prop-types';
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
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
        .isRequired,
    id: PropTypes.string.isRequired,
    notStatic: PropTypes.boolean
};

StaticValidation.defaultProps = {
    notStatic: false
};
