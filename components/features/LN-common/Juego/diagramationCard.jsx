import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { cardDiagramationVariant } from './styles';
import { getSizeByLayout } from './helper';
import checkSection from '../../../private/LN/common/utils/checkSection';

function DiagramationCard({ children, variant }) {
    const { layout, globalContent } = useAppContext();
    const primarySection = checkSection(globalContent, '/juegos');
    const sizeCard = getSizeByLayout(layout, primarySection);

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
