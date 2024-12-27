import get from '../../../../../../../../components/private/common/utils/get';
import { getAuthorId } from './getAuthorId';
import { getImageUrlBasedOnResizerVersion } from '../../../../../../../../components/private/LN/api/common/elements/image';
import { removeEmptyItems } from '../../../../../../../../components/private/LN/api/common/utils/responseCleaner';

const acuTransformV2Format = (
    transformedAcu,
    authorData,
    paginationValue,
    isFirstPage
) => {
    const transformedAcuAux = [...transformedAcu];
    const image = getImageUrlBasedOnResizerVersion(
        get(authorData, 'image.url', null)
    );

    const metadata = {
        paginate: paginationValue,
        title: authorData.name,
        banners: transformedAcuAux[0].banners,
        total: transformedAcuAux[0].acumuladoTotal
    };

    const authorId = get(authorData, '_id');

    if (isFirstPage) {
        metadata.author = removeEmptyItems({
            id: getAuthorId(authorId),
            slug: authorData.slug ? authorData.slug : authorId,
            value: authorData.name,
            image: image || null,
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

    delete transformedAcuAux[0].paginar;
    delete transformedAcuAux[0].banners;
    delete transformedAcuAux[0].acumuladoTotal;

    return {
        metadata,
        items: transformedAcuAux
    };
};

export default acuTransformV2Format;
