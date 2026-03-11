import React from 'react';
import { cardDiagramationVariant } from './styles';

function DiagramationCard({ children = null, variant = 'fourVertical', type }) {
    const _className = cardDiagramationVariant({ variant, type });
    return <div className={_className}>{children}</div>;
}

export default DiagramationCard;
