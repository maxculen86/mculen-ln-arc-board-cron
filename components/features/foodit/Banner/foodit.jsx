import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';

import { checkForId } from '../../LN-10/article/common/_helper-WebApi.js';
import { validateBannerReceta } from './_helper';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../private/LN/common/utils/mediaHelper';
import get from '../../../private/common/utils/get';

import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { Link } from '@ln/foodit-ui-link';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import StaticContent from '../../../private/common/staticContent';
import filter from '../../../../content/filters/LN/home/imageFilter.js';

const Banner = ({
    id: featureId,
    customFields: { imageId: id, link: redirectUrl, hideBanner, title }
}) => {
    if (hideBanner) return <></>;

    const imageId = checkForId(id);

    const { isAdmin } = useAppContext();

    // TODO: configurar imageConfig
    const imageConfig = 'm';

    const relatedImage = useContent({
        source: (imageId && 'relatedImageSource') || null,
        query: {
            id: imageId,
            imageConfig
        },
        filter,
        staticMode: true
    });

    const { resized_urls = [], url = '' } = get(
        relatedImage,
        'promo_items.basic',
        {}
    );
    const { resizedUrl } = getShortestImage(resized_urls);

    const error = validateBannerReceta({
        title,
        imageId,
        image: relatedImage,
        url: redirectUrl
    });

    if (isAdmin && !!error) {
        return (
            <article data-feature-id={featureId}>
                <WarningMessage
                    featureId={featureId}
                    type={error.type}
                    message={error.message}
                />
            </article>
        );
    }

    return (
        <StaticContent>
            {!error && relatedImage && (
                <div className="banner-container relative w-100 z-1 flex jc-center ai-center h-250 h-160_lg overflow-y-clip">
                    <Link href={redirectUrl} title={title}>
                        <Adaptableimage
                            src={resizedUrl || url}
                            sources={getImagesToLoadWithPicture(resized_urls)}
                            alt={title}
                        />
                    </Link>
                </div>
            )}
        </StaticContent>
    );
};

Banner.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        imageId: PropTypes.string.tag({
            name: 'ID de la imagen',
            description: 'Ingrese aquí el id de la imagen',
            default: ''
        }).isRequired,
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese el texto del título.',
            default: ''
        }).isRequired,
        link: PropTypes.string.tag({
            name: 'URL de redireccionamiento',
            description: 'Coloque la URL de destino aquí',
            default: ''
        }).isRequired,
        hideBanner: PropTypes.bool.tag({
            name: 'Ocultar banner',
            description: 'Seleccione si no debe mostrarse el banner',
            default: false
        })
    })
};

export default Consumer(Banner);
