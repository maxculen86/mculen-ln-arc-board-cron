import get from '../../utils/get';

const playerRules = [
    {
        id: 'OSRCuuxn',
        match: renderables =>
            renderables.some(
                elem =>
                    get(elem, 'collection') === 'chains' &&
                    get(elem, 'type') === 'LN10_Caja_Carrusel' &&
                    !get(elem, 'props.customFields.hideCarousel', false)
            )
    },
    {
        id: 'tMVdYMxO',
        match: renderables =>
            renderables.some(elem => get(elem, 'type') === 'LN-10/videoPlayer')
    }
];

export const selectJwPlayerId = (renderables = []) => {
    const matchedRule = playerRules.find(rule => rule.match(renderables));
    return matchedRule?.id || null;
};
