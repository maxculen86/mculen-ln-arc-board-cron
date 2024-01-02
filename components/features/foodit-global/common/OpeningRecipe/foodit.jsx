import React from 'react';
import PropTypes from 'prop-types';

import getAuthorsAsString from '../../../../private/common/utils/getAuthorsAsString';
import get from '../../../../private/common/utils/get';

import { Text } from '@ln/common-ui-text';
import { Recipe } from '@ln/foodit-ui-recipe';
import { Image } from '@ln/foodit-ui-image';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';
import { Badge } from '@ln/foodit-ui-badge';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Bookmark } from '@ln/foodit-ui-assets';
import ActionsButtons from '../ActionsButtons/foodit';
import StaticContent from '../../../../private/common/staticContent';
import VideoPlayer from '../../../private-global/common/videoPlayer/foodit';

export const OpeningRecipe = ({ article = {} }) => {
    const { promo_items = {}, headlines = {}, subheadlines = {} } = article;

    const {
        cookTime = 0,
        prepTime = 0,
        counterTime = 0,
        regions = [],
        cookingTypes = [],
        occasions = []
    } = get(promo_items, 'receta.embed.config', {});

    const author = getAuthorsAsString(article);

    // TODO: Get badge dinamically
    const badge = 'FACIL';
    const videoJW = get(promo_items, 'video_jw', null);

    // TODO: Make a new filter for foodit, the actual filter doesnt have some embed properties
    // TODO: Icons still pending design definitions
    // TODO: Add functions to buttons
    return (
        <Recipe>
            <Recipe.Media>
                <StaticContent>
                    {videoJW ? (
                        <VideoPlayer
                            data={videoJW}
                            tituloNota={get(headlines, 'basic', '')}
                            className="w-100 ratio-16-9"
                        />
                    ) : (
                        <Image
                            alt={get(promo_items, 'basic.caption', '')}
                            src={get(promo_items, 'basic.url', '')}
                            className="w-100 ratio-3-2"
                            fetchPriority="high"
                            loading="eager"
                            sources={getImagesToLoadWithPicture(
                                get(promo_items, 'basic.resized_urls', [])
                            )}
                        />
                    )}
                    {badge && (
                        <Badge className="lg-none absolute bottom-0 left-0 m-8">
                            {badge}
                        </Badge>
                    )}
                </StaticContent>
            </Recipe.Media>
            <Recipe.Body>
                <StaticContent>
                    <div className="flex flex-column ai-start gap-12">
                        {badge && <Badge className="lg-only">{badge}</Badge>}
                        <div className="flex flex-column ai-start gap-16">
                            <Text
                                className="prumo prumo-black text-28 text-40_md text-48_lg"
                                text={get(headlines, 'basic', '')}
                                as="h1"
                            />
                            <Text className="text-14" text={author} as="h3" />
                        </div>
                    </div>
                </StaticContent>
                <div className="flex ai-center gap-24">
                    <Button title="Guardar" size={{ sm: 32, lg: 40 }}>
                        <Icon size={16} className="sm-none">
                            <Bookmark />
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
