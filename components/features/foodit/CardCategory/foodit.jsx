import React, { useMemo } from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import { Category } from '@ln/foodit-ui-category';
import {
    groupsParser,
    itemGroupsParser,
    registerCardIndex,
    resolveUrl,
    validateCardCategory
} from './_helper';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { useGetImage } from './hooks/useGetImage';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';

function CardCategory({ id: featureId, isAdmin = false, customFields }) {
    const {
        title = '',
        image = '',
        url = '',
        query = '',
        groups = [],
        itemGroups = []
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
        query,
        groups,
        itemGroups
    });

    const groupsParsered = groupsParser(groups);
    const groupSelecteds = groupsParsered.join('|');

    const itemGroupSelecteds = itemGroupsParser({
        itemGroups,
        groups: groupsParsered
    })
        .join('|')
        .replaceAll(',', '^');

    const urlCustom = resolveUrl({
        query,
        titleAcu: title,
        groups: groupSelecteds,
        itemGroups: itemGroupSelecteds,
        featureId
    });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    return (
        <Static id={featureId}>
            <div className="h-100">
                <Category
                    title={title}
                    imageProps={{
                        src: imageUrl,
                        alt: `Foto de ${title}`
                    }}
                    linkProps={{
                        href: url || urlCustom,
                        title: `Ir a ${title}`
                    }}
                    data-test-id={`carousel-category-card-${featureId}`}
                    data-interaction="dataLayerInteraction"
                    data-event="navbar"
                    data-button={title}
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
        query: PropTypes.string.tag({
            label: 'Termino a buscar',
            description: 'Ingrese aquí texto de busqueda',
            defaultValue: ''
        }),
        groups: PropTypes.list.tag({
            label: 'Grupos de busqueda',
            description: 'Ingrese aquí los grupos de busqueda',
            defaultValue: []
        }),
        itemGroups: PropTypes.list.tag({
            label: 'Valores de los grupos de busqueda',
            description:
                'Ingrese aquí los datos, si son multiples separe con coma',
            defaultValue: []
        })
    }).isRequired
};

export default Consumer(CardCategory);
