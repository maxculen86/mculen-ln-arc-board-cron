import { CONTENT_BASE } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import getRequest from '../../getRequest';
import get from '../../../../../components/private/common/utils/get';

// TODO: Investigar posibilidad de dejar de usar esta función (los datos de la galeria parecen llegar sin necesidad de hacer una consulta adicional)

const addGalleryData = (cachedCall, gallery, arcSite) => {
    const { _id: galleryId } = gallery;
    return cachedCall('gallerySource', getRequest, {
        query: `${CONTENT_BASE}/content/v4/galleries?website=${arcSite}&_id=${galleryId}&included_fields=content_elements,content_elements.credits`
    })
        .then(fetchedGallery => {
            const resp = {
                ...gallery
            };
            resp.content_elements = gallery.content_elements.map((v, i) => ({
                ...v,
                ...get(fetchedGallery, 'content_elements', [])[i]
            }));

            return resp;
        })
        .catch(error =>
            logger.push(
                error,
                {
                    source: 'content/source/articleSourceNota/addGalleryData',
                    url: galleryId
                },
                arcSite,
                true
            )
        );
};

export default addGalleryData;
