import React from 'react';
import PropTypes from 'prop-types';
import { cardDiagramationVariant } from './styles';

function DiagramationCard({ children, variant }) {
    const _className = cardDiagramationVariant({ variant });
    return <div className={_className}>{children}</div>;
}

DiagramationCard.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.string
};

DiagramationCard.defaultProps = {
    children: null,
    variant: 'fourVertical'
};

export default DiagramationCard;
