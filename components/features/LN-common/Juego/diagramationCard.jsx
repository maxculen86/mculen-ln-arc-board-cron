import React from 'react';
import PropTypes from 'prop-types';
import { cardDiagramationVariant } from './styles';

function DiagramationCard({ children, variant, type }) {
    const _className = cardDiagramationVariant({ variant, type });
    return <div className={_className}>{children}</div>;
}

DiagramationCard.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    variant: PropTypes.string
};

DiagramationCard.defaultProps = {
    children: null,
    variant: 'fourVertical'
};

export default DiagramationCard;
