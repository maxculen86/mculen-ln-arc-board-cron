import { cx } from '@ln/cva';
import get from '../../../private/common/utils/get';
import { getChainParentOfFeature } from '../../LN-10/article/common/_helper-WebApi';
import { cardGameVariant } from './styles';

export const getParent = (featureId, renderables) =>
    getChainParentOfFeature(featureId, renderables);

export const getCardPosition = (parent, featureId) =>
    get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );

export const getParentLayout = parent => {
    if (!parent || !parent.props) return '';

    return get(parent, 'props.customFields.layout', '');
};

export const getFirstCard = (cardPosition, parentLayout) => {
    if (cardPosition !== 0) return false;

    const isValidLayout = [
        'oneLargeFourSmall',
        'oneHorizontalThreeVertical'
    ].includes(parentLayout);
    return isValidLayout;
};

export const getClassName = (parentLayout, firstCard) => {
    const layoutVariants = {
        oneHorizontalThreeVertical: cardGameVariant({ horizontal: firstCard })
    };
    return cx(layoutVariants[parentLayout] || null);
};

export const getDescriptionData = (firstCard, parentLayout, description) => {
    if (!firstCard) return null;
    const isValidLayout = [
        'oneHorizontalThreeVertical',
        'oneLargeFourSmall'
    ].includes(parentLayout);
    return isValidLayout ? description : null;
};
