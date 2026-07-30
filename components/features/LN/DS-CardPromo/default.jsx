import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import { getChainParentOfFeature } from '../../LN-10/article/common/_helper-WebApi';
import {
    getCardPosition,
    getParentLayout as getDiagramation,
    getFirstCard,
    getHrefLink
} from '../../LN-common/Juego/helper';
import { addInitialSlash } from '../../../private/LN/common/utils/addInitialSlash';
import { addForwardSlash } from '../../../private/LN/common/utils/addForwardSlash';
import get from '../../../private/common/utils/get';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import { CardPromo } from '../common/cardPromo/default';
import useGetImage from './hooks/useGetImage';
import { getRuleForIndex } from '../../../chains/LN_DS_CajaPromo/common/layoutRules';
import { usePromoContext } from '../../../chains/LN_DS_CajaPromo/common/promoContext';
import {
    buildTrackingData,
    buildLinkProps,
    getBadge,
    isTagId
} from './_helpers';

function DSCardPromo({ id: featureId, customFields, isAdmin }) {
    const { arcSite, renderables, layout: pageLayout } = useAppContext() || {};
    const { contentType } = usePromoContext();

    const {
        sectionId: originalSectionId = '',
        imageId = '',
        type: linkType = 'Interno',
        subscriber = 'NO',
        isNew = 'NO',
        badgeText = '',
        description = '',
        buttonText = ''
    } = customFields;

    const sectionId = originalSectionId?.endsWith('/')
        ? originalSectionId.slice(0, -1)
        : originalSectionId || '';

    const isTag = contentType === 'podcast' && isTagId(sectionId);

    const parentChain = getChainParentOfFeature(featureId, renderables);
    const cardPosition = getCardPosition(parentChain, featureId);
    const diagramation = getDiagramation(parentChain);
    const isFirstCard = getFirstCard(cardPosition, diagramation);

    const { resizedUrl, sources } = useGetImage({
        imageId,
        isFirstCard,
        diagramation
    });

    const { name: sectionTitle = '' } =
        useContent({
            source: isTag ? null : 'sectionSource',
            query: {
                id: addInitialSlash(sectionId),
                website: arcSite
            }
        }) || {};

    const title = isTag ? description : sectionTitle;

    if (!sectionId && isAdmin) {
        return (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100%'
                }}
            >
                <PageBuilderMessage
                    key={featureId}
                    type="warning"
                    message="El sectionId es un campo obligatorio"
                />
            </div>
        );
    }

    const articleData =
        useContent({
            source: isTag ? null : 'lnAcuSource',
            query: { sectionId, size: 1, website: arcSite }
        }) || {};

    const articleLink = isTag
        ? sectionId
        : get(articleData, 'content_elements[0].website_url', '');

    const hrefLink = isTag
        ? addForwardSlash(sectionId)
        : getHrefLink(linkType, sectionId, articleLink);

    const badge = getBadge(isNew);
    const forSubscriber = subscriber === 'SI';

    const { size, orientation, clampTitle } = getRuleForIndex(
        diagramation,
        cardPosition,
        pageLayout
    );

    const linkProps = buildLinkProps({ href: hrefLink, title, contentType });

    const trackingData = buildTrackingData({
        title,
        logoSrc: resizedUrl,
        buttonText,
        href: hrefLink,
        badge
    });

    return (
        <CardPromo
            size={size}
            orientation={orientation}
            {...trackingData}
            {...linkProps}
        >
            <CardPromo.Overlay
                badge={badge}
                badgeLabel={badgeText || 'nuevo'}
                ribbon={forSubscriber}
            />
            <CardPromo.Media src={resizedUrl} alt={title} sources={sources} />
            <CardPromo.Content>
                <CardPromo.Title clamp={clampTitle}>{title}</CardPromo.Title>
                <CardPromo.Description>
                    {isTag ? null : description}
                </CardPromo.Description>
                <CardPromo.Action title={title}>
                    {buttonText ||
                        (contentType === 'podcast' ? 'Reproducir' : 'Jugar')}
                </CardPromo.Action>
            </CardPromo.Content>
        </CardPromo>
    );
}

DSCardPromo.label = 'LN DS CardPromo';

DSCardPromo.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        sectionId: PropTypes.string.tag({
            name: 'sectionId',
            description: 'Ingrese aquí el id de la sección',
            defaultValue: ''
        }),
        imageId: PropTypes.string.tag({
            name: 'ID de imagen',
            description: 'Ingrese aquí el id de la imagen en Photo Center',
            defaultValue: ''
        }),
        type: PropTypes.oneOf(['Interno', 'Externo']).tag({
            defaultValue: 'Interno',
            name: 'Tipo de link',
            description:
                'Interno: el link apunta al último artículo publicado en la sección. Externo: el link apunta directamente al sectionId ingresado.'
        }).isRequired,
        subscriber: PropTypes.oneOf(['SI', 'NO']).tag({
            defaultValue: 'NO',
            name: 'Es cerrada?'
        }).isRequired,
        isNew: PropTypes.oneOf([
            'NO',
            'NUEVO',
            'NUEVO EPISODIO',
            'NUEVO PODCAST'
        ]).tag({
            defaultValue: 'NO',
            name: 'Es nuevo?'
        }).isRequired,
        badgeText: PropTypes.string.tag({
            name: 'Texto del badge',
            description:
                'Texto que se muestra en el badge. Si se deja vacío, muestra "nuevo".',
            defaultValue: 'nuevo'
        }),
        description: PropTypes.string.tag({
            name: 'Descripción',
            description: 'Texto que se muestra en la descripción de la card',
            defaultValue: ''
        }),
        buttonText: PropTypes.string.tag({
            name: 'Texto del botón',
            description:
                'Texto del botón de acción. Default: Jugar / Reproducir - según tipo de contenido configurado en la chain',
            defaultValue: ''
        })
    }).isRequired
};

export default DSCardPromo;
