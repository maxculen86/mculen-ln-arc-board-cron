import { CONTENT_BASE } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import getRequest from '../../getRequest';

const addGalleryData = (cachedCall, gallery, arcSite) => {
    const { _id: galleryId } = gallery;
    return cachedCall('gallerySource', getRequest, {
        query: `${CONTENT_BASE}/content/v4/galleries?website=${arcSite}&_id=${galleryId}&included_fields=content_elements,content_elements.credits`
    })
        .then(fetchedGallery => {
            const resp = {
                ...gallery
            };
            resp.content_elements = gallery.content_elements.map((v, i) => {
                return {
                    ...v,
                    ...fetchedGallery.content_elements[i]
                };
            });

            return resp;
        })
        .catch(error => {
            return logger.push(
                error,
                {
                    source: 'content/source/articleSourceNota/addGalleryData',
                    url: galleryId
                },
                arcSite,
                true
            );
        });
};

export default addGalleryData;
