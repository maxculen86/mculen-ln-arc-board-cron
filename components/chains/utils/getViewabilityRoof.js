import get from '../../private/common/utils/get';

const searchPrev = (index, chains) => {
    const prevChain = get(chains, `[${index - 1}]`, {});
    const isRoofHidden = get(prevChain, 'props.customFields.hideTitle');

    const prevRoof =
        !isRoofHidden && get(prevChain, 'props.customFields.title');
    if (prevRoof) return prevRoof;

    const prevIndex = index - 1;

    if (prevIndex >= 0) {
        return searchPrev(prevIndex, chains);
    }

    return undefined;
};

const getViewabilityRoof = (
    chainId = '',
    renderables = [],
    { title, hideTitle } = {}
) => {
    if (title && !hideTitle) {
        return title;
    }

    const chains = renderables.filter(
        block =>
            block.collection === 'chains' &&
            !get(block, 'props.customFields.hideCaja')
    );

    const chainIndex = chains.findIndex(x => x.props.id === chainId);

    return searchPrev(chainIndex, chains);
};

export default getViewabilityRoof;
