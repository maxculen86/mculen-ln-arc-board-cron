import React, { useMemo, useCallback } from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import { Category } from '@ln/foodit-ui-category';
import {
    registerCardIndex,
    validateCardCategory,
    transformCategoryData
} from './_helper';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { useGetImage } from './hooks/useGetImage';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import { isMobileWebView } from '../../foodit-global/common/utils/isMobileWebView';
import { pushFooditEvent } from '../../foodit-global/common/utils/pushFooditEvent';

function CardCategory({ id: featureId, isAdmin, customFields }) {
    const {
        title = '',
        image = '',
        url = '',
        rapida = false,
        facil = false
    } = customFields;

    const cardIndex = useMemo(() => registerCardIndex(featureId), [featureId]);
    const cardCategoryLabel =
        cardIndex !== null && cardIndex !== undefined
            ? (cardIndex + 1).toString()
            : 'N/A';

    const { resized_urls: resizedUrls } = useGetImage(image) || {};
    const { resizedUrl: imageUrl = '' } = getShortestImage(resizedUrls);

    const error = validateCardCategory({
        title,
        image,
        url,
        imageUrl,
        rapida,
        facil
    });

    const { modifiedTitle, modifiedUrl } = useMemo(
        () => transformCategoryData({ title, url, rapida, facil }),
        [title, url, rapida, facil]
    );

    const handleNavbarClick = useCallback(() => {
        if (!isMobileWebView()) return;
        pushFooditEvent({
            event: 'navbar',
            button: modifiedTitle,
            label: cardCategoryLabel
        });
    }, [modifiedTitle, cardCategoryLabel]);

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    return (
        <Static id={featureId}>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <div className="h-100" onClick={handleNavbarClick}>
                <Category
                    title={modifiedTitle}
                    imageProps={{
                        src: imageUrl,
                        alt: `Foto de ${modifiedTitle}`
                    }}
                    linkProps={{
                        href: modifiedUrl,
                        title: `Ir a ${modifiedTitle}`
                    }}
                    data-test-id={`carousel-category-card-${featureId}`}
                    data-interaction="dataLayerInteraction"
                    data-event="navbar"
                    data-button={modifiedTitle}
                    data-label={cardCategoryLabel}
                />
            </div>
        </Static>
    );
}

CardCategory.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
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
        }),
        rapida: PropTypes.bool.tag({
            name: 'Agregar filtro "Rápida"',
            description:
                'Modifica la url para agregar el filtro "Rápida" en la categoría',
            defaultValue: false
        }),
        facil: PropTypes.bool.tag({
            name: 'Agregar filtro "Fácil"',
            description:
                'Modifica la url para agregar el filtro "Fácil" en la categoría',
            defaultValue: false
        })
    }).isRequired
};

export default Consumer(CardCategory);
