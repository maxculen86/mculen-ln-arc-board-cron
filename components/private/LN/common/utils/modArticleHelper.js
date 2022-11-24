import get from '../../../common/utils/get';
import getAuthorsPhoto from '../../../common/utils/getAuthorsPhoto';

const getImageDestacada = (
    isRenderAuthor,
    isRenderAuthorOpinion,
    articleData
) => {
    return isRenderAuthor || isRenderAuthorOpinion
        ? getAuthorsPhoto(articleData)
        : get(articleData, 'promo_items.basic', null);
};

const getMediaData = (
    videoBackground,
    device,
    mobileImageForMultimediaBox,
    layout,
    isRenderAuthor,
    isRenderAuthorOpinion,
    articleData
) => {
    const imagenDestacada = getImageDestacada(
        isRenderAuthor,
        isRenderAuthorOpinion,
        articleData
    );

    const type = get(imagenDestacada, 'type', null);
    const isMobile = device === 'mobile';
    const isMobileAndGrilla1 = isMobile && layout === 'grilla1';
    const image = type === 'image' ? imagenDestacada : null;

    const rules = [
        {
            validation: layout === 'grillaVideo1',
            data: videoBackground
        },
        {
            validation: videoBackground && !isMobile,
            data: videoBackground
        },
        {
            validation: videoBackground && isMobileAndGrilla1,
            data: get(mobileImageForMultimediaBox, 'promo_items.basic', image)
        },
        {
            validation: mobileImageForMultimediaBox && isMobileAndGrilla1,
            data: get(mobileImageForMultimediaBox, 'promo_items.basic', image)
        }
    ];

    return {
        mediaData: get(
            rules.find(({ validation }) => validation),
            'data',
            image
        ),
        withMobileImage: mobileImageForMultimediaBox && isMobileAndGrilla1
    };
};

export default getMediaData;
