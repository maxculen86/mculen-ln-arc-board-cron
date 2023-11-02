import get from '../../../../../../../../components/private/common/utils/get';
import { getAuthorId } from './getAuthorId';
import { getImageUrl } from '../../../../../../../../components/private/LN/api/common/elements/image';

const acuTransformV2Format = (
    transformedAcu,
    authorData,
    paginationValue,
    isFirstPage
) => {
    const image = getImageUrl(get(authorData, 'image.url', null));

    const authorBio = {
        longBio: authorData.longBio,
        location: authorData.location,
        education: authorData.education,
        languages: authorData.languages,
        affiliations: authorData.affiliations,
        books: authorData.books
    };

    const metadata = {
        paginate: paginationValue,
        title: authorData.name,
        banners: transformedAcu[0].banners,
        total: transformedAcu[0].acumuladoTotal,
        author: {
            id: getAuthorId(authorData._id),
            slug: authorData.slug,
            value: authorData.name,
            image: image ? image[0] : null,
            absoluteUrl: get(authorData, 'image.url', null),
            interests: authorData.intereses,
            mail: authorData.email,
            role: authorData.role,
            twitter: authorData.twitter
        }
    };

    if (isFirstPage) {
        metadata.author = {
            ...metadata.author,
            ...authorBio
        };
    }

    delete transformedAcu[0].paginar;
    delete transformedAcu[0].banners;
    delete transformedAcu[0].acumuladoTotal;

    return {
        metadata,
        items: [...transformedAcu]
    };
};

export default acuTransformV2Format;
