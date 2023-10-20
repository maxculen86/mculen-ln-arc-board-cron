import get from '../../../../../../../../common/utils/get';

const validatePropsRenderBasic = (
    articleSourceNota,
    articleImage,
    articleVideo,
    props,
    configs
) => {
    const propsRender = props;
    let articleSourceNotaRender = articleSourceNota;
    let articleImageRender = articleImage;
    const articleVideoRender = articleVideo;

    const { customFields = {} } = propsRender;
    const { hideAuthors = false, hideImage = false } = customFields;

    if (hideAuthors) {
        const {
            credits,
            ...articleSourceNotaWithoutCredits
        } = articleSourceNotaRender;
        articleSourceNotaRender = articleSourceNotaWithoutCredits;
        propsRender.customFields.authors = null;
        propsRender.customFields.variant = 'regular';
    }
    if (hideImage) {
        articleImageRender = null;
    }
    return {
        propsRender,
        articleSourceNotaRender,
        articleImageRender,
        articleVideoRender
    };
};

export const validatePropsRender = (
    articleSourceNota,
    articleImage,
    articleVideo,
    props,
    configs
) => {
    if (!props) {
        throw new TypeError('The props missing in Render feature ');
    }
    const paramsBasic = validatePropsRenderBasic(
        articleSourceNota,
        articleImage,
        articleVideo,
        props,
        configs
    );
    const propsRender = paramsBasic && paramsBasic.propsRender;
    const articleSourceNotaRender =
        paramsBasic && paramsBasic.articleSourceNotaRender;
    let articleImageRender =
        paramsBasic && paramsBasic.articleImageRender
            ? paramsBasic.articleImageRender
            : null;
    let articleVideoRender =
        paramsBasic && paramsBasic.articleVideoRender
            ? paramsBasic.articleVideoRender
            : null;

    const { customFields = {} } = propsRender;
    const { variant = 'regular' } = customFields;
    const isVariantsDisabled =
        (configs &&
            configs.config &&
            Array.isArray(configs.config.variantsDisabled) &&
            configs.config.variantsDisabled.includes(variant)) ||
        false;
    // If card is variant author, if there are more than two authors it becomes regular
    if (variant === 'author' && !isVariantsDisabled) {
        if (get(articleSourceNota, 'credits.by', []).length === 1) {
            propsRender.customFields.imageId = null;
            propsRender.customFields.video = null;
            articleVideoRender = null;
            articleImageRender = null;
        } else {
            propsRender.customFields.variant = 'regular';
        }
    }

    return {
        propsRender,
        articleSourceNotaRender,
        articleImageRender,
        articleVideoRender
    };
};

export default validatePropsRender;
