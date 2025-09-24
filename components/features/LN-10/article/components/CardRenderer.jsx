import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Card } from '@ln/contenidos-ui-card';
import ErrorBoundary from '../../../../private/common/ErrorBoundary';

function CardRenderer({ cardProps }) {
    return (
        <ErrorBoundary>
            <Card {...cardProps} />
        </ErrorBoundary>
    );
}

CardRenderer.propTypes = {
    cardProps: PropTypes.object.isRequired
};

export default CardRenderer;
