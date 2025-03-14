import { cx } from '@ln/cva';
import get from '../../../private/common/utils/get';
import { getChainParentOfFeature } from '../../LN-10/article/common/_helper-WebApi';
import { cardOrientation } from './styles';
import { addForwardSlash } from '../../../private/LN/common/utils/addForwardSlash';

export const DIAGRAMATIONS = {
    oneLargeFourSmall: 'oneLargeFourSmall',
    twoHorizontal: 'twoHorizontal',
    fourVertical: 'fourVertical',
    oneHorizontalThreeVertical: 'oneHorizontalThreeVertical'
};

export const getParent = (featureId, renderables) =>
    getChainParentOfFeature(featureId, renderables);

export const getCardPosition = (parent, featureId) =>
    get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );

export const getParentLayout = parent => {
    if (!parent || !parent.props) return DIAGRAMATIONS.fourVertical;

    return get(parent, 'props.customFields.layout', DIAGRAMATIONS.fourVertical);
};

export const getFirstCard = (cardPosition, parentLayout) => {
    if (cardPosition !== 0) return false;

    const isValidLayout = [
        DIAGRAMATIONS.oneLargeFourSmall,
        DIAGRAMATIONS.oneHorizontalThreeVertical
    ].includes(parentLayout);
    return isValidLayout;
};

export const getClassName = (parentLayout, firstCard) => {
    const layoutVariants = {
        oneHorizontalThreeVertical: cardOrientation({ horizontal: firstCard }),
        fourVertical: 'col-span-4 col-span-3_sm'
    };
    return cx(layoutVariants[parentLayout] || null);
};

export const getDescriptionData = (firstCard, parentLayout, description) => {
    if (!firstCard) return null;
    const isValidLayout = [
        DIAGRAMATIONS.oneLargeFourSmall,
        DIAGRAMATIONS.oneHorizontalThreeVertical
    ].includes(parentLayout);
    return isValidLayout ? description : null;
};

export const getHrefLink = (type, section, link) =>
    type === 'Externo' ? addForwardSlash(section) : addForwardSlash(link);
