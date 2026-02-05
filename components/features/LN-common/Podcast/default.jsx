import React from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/cva';
import { Badge } from '@ln/contenidos-ui-badge';
import { CardCover } from '@ln/contenidos-ui-cardcover';
import { Icon } from '@ln/common-ui-icon';
import { addInitialSlash } from '../../../private/LN/common/utils/addInitialSlash';
import { getChainParentOfFeature } from '../../LN-10/article/common/_helper-WebApi';
import {
    getCardPosition,
    getParentLayout,
    getFirstCard,
    getHrefLink,
    getDescriptionData,
    getClassName
} from '../Juego/helper';
import getGameProperties from '../../../private/LN/common/utils/getGameProperties';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import get from '../../../private/common/utils/get';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { tagVariant } from './style';
import {
    buildLinkProps,
    buildTrackingData,
    buildVariant,
    getTagState,
    isTagId
} from './_helpers';
import { addForwardSlash } from '../../../private/LN/common/utils/addForwardSlash';
import useGetImage from './hooks/useGetImage';

function Podcast({ id: featureId, customFields, isAdmin }) {
    const { contextPath, deployment, arcSite, renderables } = useAppContext();
    const {
        sectionId: originalSectionId = '',
        podcastType,
        isNewPodcast,
        description,
        subscriber,
        buttonText = '',
        imageId = ''
    } = customFields;

    const sectionId = originalSectionId?.endsWith('/')
        ? originalSectionId.slice(0, -1)
        : originalSectionId || '';

    const isTag = isTagId(sectionId);

    const parentChain = getChainParentOfFeature(featureId, renderables);
    const cardPosition = getCardPosition(parentChain, featureId);
    const parentLayout = getParentLayout(parentChain);
    const isFirstCard = getFirstCard(cardPosition, parentLayout);

    const { resizedUrl, sources } = useGetImage({
        imageId,
        isFirstCard,
        parentLayout
    });

    const { name: sectionTitle = '' } =
        useContent({
            source: isTag ? null : 'sectionSource',
            query: {
                id: addInitialSlash(sectionId),
                website: arcSite
            }
        }) || {};

    const podcastProperties = getGameProperties(
        sectionTitle,
        contextPath,
        deployment,
        sectionId,
        'videopodcast'
    );

    const title = isTag ? description : podcastProperties?.title;
    const forSubscriber = subscriber === 'SI';

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
            query: {
                sectionId,
                size: 1,
                website: arcSite
            }
        }) || {};

    const articleLink = isTag
        ? sectionId
        : get(articleData, 'content_elements[0].website_url', '');

    const hrefLink = isTag
        ? addForwardSlash(articleLink)
        : getHrefLink(podcastType, sectionId, articleLink);

    const tagState = getTagState({ isNewPodcast, forSubscriber });
    const { badge, showRibbon, showTag } = tagState;
    const tagClass = tagVariant({
        badge: !!badge,
        ribbon: !!showRibbon
    });
    const variantData = buildVariant(isFirstCard, parentLayout);
    const linkData = buildLinkProps({ href: hrefLink, title });

    const descriptionData = getDescriptionData(
        isFirstCard,
        parentLayout,
        description
    );

    const trackingData = buildTrackingData({
        title,
        logoSrc: resizedUrl,
        buttonText,
        href: hrefLink,
        badge
    });

    const buttonClass = cx('cardGame__hover opacity-1__hover bg-white', {
        'mt-24_m': isFirstCard && parentLayout === 'oneLargeFourSmall'
    });

    return (
        <CardCover
            {...trackingData}
            variant={variantData}
            linkProps={linkData}
            className={cx(getClassName(parentLayout, isFirstCard))}
        >
            {showTag && (
                <CardCover.Tag className={tagClass}>
                    {badge && <Badge type="newGame">nuevo</Badge>}
                    {showRibbon && (
                        <Icon>
                            <IconSprite name="ribbonColor" color />
                        </Icon>
                    )}
                </CardCover.Tag>
            )}
            <CardCover.Separator className="w-100 h-6 bg-blue-500" />
            <CardCover.Content>
                <CardCover.Image
                    alt={title}
                    src={resizedUrl}
                    className="ratio-1-1"
                    sources={sources}
                />
                <CardCover.Text>
                    {title && <CardCover.Title>{title}</CardCover.Title>}
                    {!isTag && descriptionData && (
                        <CardCover.Description className="text-neutral-dark-1">
                            {descriptionData}
                        </CardCover.Description>
                    )}
                    <CardCover.Button
                        title={title}
                        className={buttonClass}
                        variant="secondary"
                        size={32}
                    >
                        {buttonText || 'Reproducir'}
                    </CardCover.Button>
                </CardCover.Text>
            </CardCover.Content>
        </CardCover>
    );
}

Podcast.label = 'LN Podcast';

Podcast.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        imageId: PropTypes.string.tag({
            name: 'ID de imagen',
            description: 'Ingrese aquí el id de la imagen',
            defaultValue: ''
        }),
        sectionId: PropTypes.string.tag({
            name: 'sectionId',
            description: 'Ingrese aquí el id de la seccion',
            defaultValue: ''
        }),
        description: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí la descripción del podcast',
            defaultValue: ''
        }),
        podcastType: PropTypes.oneOf(['Interno', 'Externo']).tag({
            defaultValue: 'Interno',
            name: 'Interno/Externo'
        }).isRequired,
        subscriber: PropTypes.oneOf(['SI', 'NO']).tag({
            defaultValue: 'NO',
            name: 'Es cerrada?'
        }).isRequired,
        isNewPodcast: PropTypes.oneOf([
            'NUEVO EPISODIO',
            'NUEVO PODCAST',
            'NO'
        ]).tag({
            defaultValue: 'NO',
            name: 'Es nuevo?'
        }).isRequired,
        buttonText: PropTypes.string.tag({
            defaultValue: 'Reproducir',
            description: 'Ingrese aquí el texto del botón',
            name: 'Texto del botón'
        })
    }).isRequired
};

export default Podcast;
