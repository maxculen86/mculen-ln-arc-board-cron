import React from 'react';
import { Card } from '@ln/contenidos-ui-card';
import ErrorBoundary from '../../../../private/common/ErrorBoundary';

function CardRenderer({ cardProps }) {
    return (
        <ErrorBoundary>
            <Card {...cardProps} />
        </ErrorBoundary>
    );
}

export default CardRenderer;
