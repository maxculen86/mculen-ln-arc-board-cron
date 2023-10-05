import get from '../../../../../../../../components/private/common/utils/get';
import { getAuthorId } from './getAuthorId';

const acuTransformV2Format = (transformedAcu, authorData, paginationValue) => {
    const metadata = {
        paginate: paginationValue,
        title: authorData.name,
        banners: transformedAcu[0].banners,
        total: transformedAcu[0].acumuladoTotal,
        author: {
            id: getAuthorId(authorData._id),
            slug: authorData.slug,
            value: authorData.name,
            image: get(authorData, 'image.url', null)
        }
    };

    delete transformedAcu[0].paginar;
    delete transformedAcu[0].banners;
    delete transformedAcu[0].acumuladoTotal;

    return {
        metadata,
        items: [...transformedAcu]
    };
};

export default acuTransformV2Format;
