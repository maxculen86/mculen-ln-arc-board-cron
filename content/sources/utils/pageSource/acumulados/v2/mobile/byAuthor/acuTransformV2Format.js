import get from '../../../../../../../../components/private/common/utils/get';
import { getAuthorId } from './getAuthorId';
import {
    getImageUrl,
    getImageUrlBasedOnResizerVersion
} from '../../../../../../../../components/private/LN/api/common/elements/image';
import { removeEmptyItems } from '../../../../../../../../components/private/LN/api/common/utils/responseCleaner';

const acuTransformV2Format = (
    transformedAcu,
    authorData,
    paginationValue,
    isFirstPage
) => {
    const image = getImageUrlBasedOnResizerVersion(
        get(authorData, 'image.url', null)
    );

    const metadata = {
        paginate: paginationValue,
        title: authorData.name,
        banners: transformedAcu[0].banners,
        total: transformedAcu[0].acumuladoTotal
    };

    if (isFirstPage) {
        metadata.author = removeEmptyItems({
            id: getAuthorId(authorData._id),
            slug: authorData.slug ? authorData.slug : authorData._id,
            value: authorData.name,
            image: image ? image : null,
            absoluteUrl: get(authorData, 'image.url', null),
            interests: authorData.intereses,
            mail: authorData.email,
            role: authorData.role,
            twitter: authorData.twitter,
            longBio: authorData.longBio,
            location: authorData.location,
            education: authorData.education,
            languages: authorData.languages,
            affiliations: authorData.affiliations,
            books: authorData.books
        });
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
