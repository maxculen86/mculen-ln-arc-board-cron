import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'prop-types';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { Recipe } from '@ln/foodit-ui-recipe';
import { Image } from '@ln/foodit-ui-image';
import { Badge } from '@ln/foodit-ui-badge';
import { Button } from '@ln/foodit-ui-button';
import ActionsButtons from '../ActionsButtons/foodit';
import VideoPlayer from '../../../private-global/common/videoPlayer/foodit';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

import {
    getFooditAuthor,
    getHighestPriorityTag
} from '../utils/notaFooditHelper';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import get from '../../../../private/common/utils/get';
import replaceBaseUrl from '../utils/replaceBaseUrl';

export const OpeningRecipe = ({ article = {} }) => {
    const { promo_items = {}, headlines = {}, taxonomy, _id = '' } = article;
    const sections = get(taxonomy, 'sections', []);
    const badge = getHighestPriorityTag(sections);
    const title = get(headlines, 'basic', '');

    const videoJW = get(promo_items, 'video_jw', null);
    const { caption = '', resized_urls = [], url = '' } = replaceBaseUrl(
        get(promo_items, 'basic', {})
    );

    const { resizedUrl = '' } = getShortestImage(resized_urls);

    // TODO: Icons still pending design definitions
    return (
        <Recipe>
            <Recipe.Media className="z-1">
                {videoJW ? (
                    <Static id="opening-media-recipe">
                        <VideoPlayer
                            data={videoJW}
                            tituloNota={title}
                            className="w-100 ratio-16-9"
                        />
                    </Static>
                ) : (
                    <Image
                        alt={caption}
                        src={resizedUrl || url}
                        className="w-100 ratio-3-2"
                        fetchPriority="high"
                        loading="eager"
                        sources={getImagesToLoadWithPicture(resized_urls)}
                    />
                )}
                {badge && (
                    <Badge className="lg-none absolute bottom-0 left-0 m-8">
                        {badge}
                    </Badge>
                )}
            </Recipe.Media>
            <Recipe.Body>
                <div className="flex flex-column ai-start gap-12">
                    {badge && <Badge className="lg-only">{badge}</Badge>}
                    <div className="flex flex-column ai-start gap-16">
                        <Text
                            className="prumo prumo-black text-28 text-40_md text-48_lg"
                            text={get(headlines, 'basic', '')}
                            as="h1"
                        />
                        <Text
                            className="text-14"
                            text={getFooditAuthor(article)}
                            as="h3"
                        />
                    </div>
                </div>
                <div className="flex ai-center gap-24">
                    <Button
                        title="Guardar"
                        size={{ sm: 32, lg: 40 }}
                        data-modal={'open-modal'}
                        data-id={_id}
                        data-interaction="dataLayerInteraction"
                        data-event-data-layer="e_linkclick"
                        data-dynamic-category="interaction"
                        data-dynamic-label="receta"
                        data-dynamic-action="guardar"
                        data-title={title}
                    >
                        <Icon size={16} className="sm-none">
                            <IconSprite name="bookmark" critical />
                        </Icon>
                        Guardar
                    </Button>
                    <hr className="h-100 lg-only" />
                    <div className="flex ai-center gap-16 gap-24_md">
                        <ActionsButtons article={article} />
                    </div>
                </div>
            </Recipe.Body>
        </Recipe>
    );
};

OpeningRecipe.propTypes = {
    article: PropTypes.object
};

export default OpeningRecipe;
