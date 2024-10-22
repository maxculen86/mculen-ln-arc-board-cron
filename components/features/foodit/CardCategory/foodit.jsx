import React from 'react';
import Consumer from 'fusion:consumer';

import PropTypes from 'fusion:prop-types';
import { Category } from '@ln/foodit-ui-category';
import { validateCardCategory } from './_helper';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { useGetImage } from './hooks/useGetImage';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';

function CardCategory({
    isAdmin,
    customFields: { title = '', image = '', url = '' }
}) {
    const { resized_urls: resizedUrls } = useGetImage(image) || {};

    const { resizedUrl: imageUrl = '' } = getShortestImage(resizedUrls);

    const error = validateCardCategory({ title, image, url, imageUrl });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }
    return (
        <Category
            title={title}
            imageProps={{
                src: imageUrl,
                alt: `Foto de ${title}`
            }}
            linkProps={{
                href: url,
                title: `Ir a ${title}`
            }}
        />
    );
}

CardCategory.propTypes = {
    isAdmin: PropTypes.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            label: 'Titulo',
            description: 'Ingrese aquí el titulo de la categoria',
            defaultValue: ''
        }),
        image: PropTypes.string.tag({
            label: 'Imagen',
            description: 'Ingrese aquí el ID de la imagen',
            defaultValue: ''
        }),
        url: PropTypes.string.tag({
            label: 'URL',
            description: 'Ingrese aquí la url de la categoria',
            defaultValue: ''
        })
    }).isRequired
};

export default Consumer(CardCategory);
