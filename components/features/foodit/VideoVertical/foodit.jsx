import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import { validateVideoVertical, getChainParentOfFeature } from './_helper';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { checkForId } from '../../LN-10/article/common/_helper-WebApi';
import CardCarouselVideo from '../../foodit-global/common/CarrouselVideoFoodit/components/CardVideoCarousel';
import get from '../../../private/common/utils/get';

function VideoVertical({
    isAdmin,
    id: featureId,
    customFields: { video: videoId, title, hideTitle, chapita, author }
}) {
    const { renderables } = useAppContext();
    const parent = getChainParentOfFeature(featureId, renderables);

    const cardPosition = get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );

    const sanitizedVideoId = checkForId(videoId) || '';

    const videoData =
        useContent({
            source: sanitizedVideoId ? 'videosJwCarruselSource' : null,
            query: {
                id: sanitizedVideoId,
                website: 'foodit',
                isAdmin
            }
        }) || null;

    const error = validateVideoVertical({
        video: videoData,
        videoId: sanitizedVideoId
    });

    if (isAdmin && !!error) {
        return (
            <article data-feature-id={featureId}>
                <WarningMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            </article>
        );
    }

    if (error || !videoData) return null;

    const cardData = {
        image: { src: videoData?.poster, alt: videoData?.title },
        video: { src: videoData?.posterVideo }
    };

    const displayTitle = hideTitle ? '' : title || videoData?.title;

    return (
        <div className="w-full ratio-9-16">
            <CardCarouselVideo
                textTitle={displayTitle}
                textAuthor={author}
                duration={videoData.duration}
                cardData={cardData}
                badge={chapita}
                cardPosition={cardPosition}
            />
        </div>
    );
}

VideoVertical.label = 'Foodit Video Vertical';

VideoVertical.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título *',
            description:
                'Ingrese el texto del título. Máx: 100 caracteres incluyendo volanta.',
            default: ''
        }).isRequired,
        hideTitle: PropTypes.bool.tag({
            name: 'Ocultar título',
            description: 'Marque para ocultar el título del video',
            default: false
        }),
        video: PropTypes.string.tag({
            name: 'Video',
            description: 'Ingrese aquí el ID del video de JW',
            default: ''
        }),
        chapita: PropTypes.string.tag({
            name: 'Chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: ''
        }),
        author: PropTypes.string.tag({
            name: 'Autor',
            description: 'Ingrese el nombre del autor del video',
            default: ''
        })
    }).isRequired
};

export default Consumer(VideoVertical);
