import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';

export default function useGetArticlesToPreload({
    filter,
    imageConfig,
    website = 'la-nacion-ar',
    articleId = '',
    imageId = '',
    collectionId = '',
    initialPosition = 0,
    isFocal = false,
    staticMode = true,
    size
}) {
    const setSource = () => {
        if (articleId && imageId) return 'relatedImageSource';

        if (articleId) return 'articleSourceNota';

        if (collectionId) return 'collectionsSource';

        return null;
    };

    const articleResp = useContent({
        source: setSource(),
        query: {
            id: imageId || articleId || collectionId,
            ...(collectionId && {
                from: initialPosition,
                isFocal
            }),
            website,
            size,
            imageConfig
        },
        filter,
        staticMode
    });

    return articleId ? [articleResp] : get(articleResp, 'content_elements', []);
}
