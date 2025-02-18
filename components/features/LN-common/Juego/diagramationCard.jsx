import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { cardDiagramationVariant } from './styles';
import { getSizeByLayout } from './helper';

function DiagramationCard({ children, variant }) {
    const { layout } = useAppContext();
    const sizeCard = getSizeByLayout(layout);

    const _className = cardDiagramationVariant({ variant, size: sizeCard });
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
