import React from 'react';
import PropTypes from 'prop-types';
import ModFigcaption from '../../../../private/common/mod-figcaption';
import { figCaptionVariants } from './styles';

function OpeningEpigraph({ className, title, credit, variant }) {
    const figCaptionVariant = figCaptionVariants({
        variant
    });

    if (!title && !credit) return null;

    return (
        (credit || title) && (
            <div className={className}>
                <ModFigcaption
                    className={figCaptionVariant}
                    title={title}
                    credit={credit}
                />
            </div>
        )
    );
}

OpeningEpigraph.propTypes = {
    data: PropTypes.shape({}).isRequired,
    className: PropTypes.string,
    title: PropTypes.shape({}),
    credit: PropTypes.shape({}),
    variant: PropTypes.oneOf(['mobile', 'desktop'])
};

OpeningEpigraph.defaultProps = {
    className: '',
    title: {},
    credit: {},
    variant: 'mobile'
};

export default OpeningEpigraph;
