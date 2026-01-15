import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import get from '../../../private/common/utils/get';

export const validateVideoVertical = ({ video, videoId }) => {
    const rules = [
        {
            validation: !videoId,
            message: 'Advertencia. El campo Video es obligatorio'
        },
        {
            validation: videoId && video === null,
            message: 'Advertencia. El ID del video es incorrecto'
        }
    ];

    return pageBuilderValidator(rules);
};

export const getChainParentOfFeature = (featureId, renderables) => {
    const fooditChains = ['foodit_Carousel_Videos'];

    return renderables.find(
        elem =>
            get(elem, 'collection') === 'chains' &&
            fooditChains.includes(get(elem, 'type', '')) &&
            get(elem, 'children', []).some(
                child => get(child, 'props.id') === featureId
            )
    );
};
