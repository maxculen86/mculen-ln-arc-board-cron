import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { Recipe } from '@ln/foodit-ui-recipe';
import { Image } from '@ln/foodit-ui-image';
import { Badge } from '@ln/foodit-ui-badge';
import { Button } from '@ln/foodit-ui-button';

import ButtonsGroup from '../ActionsButtons/foodit';
import VideoPlayer from '../../../private-global/common/videoPlayer/foodit';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

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
import getImageAltText from '../utils/getImageAltText';
import AudioRecipe from './audioRecipe';

export function OpeningRecipe({ article = {}, isPrivate = false }) {
    const {
        promo_items: promoItems = {},
        headlines = {},
        taxonomy,
        _id = ''
    } = article;
    const sections = get(taxonomy, 'sections', []);
    const badge = getHighestPriorityTag(sections);
    const title = get(headlines, 'basic', '');

    const videoJW = get(promoItems, 'video_jw', null);
    const imageData = get(promoItems, 'basic', {});
    const { resized_urls: resizedUrls = [], url = '' } =
        replaceBaseUrl(imageData);

    const { resizedUrl = '' } = getShortestImage(resizedUrls);

    return (
        <Recipe>
            <Recipe.Media className="z-1">
                {!isPrivate && videoJW ? (
                    <Static id="opening-media-recipe">
                        <VideoPlayer
                            data={videoJW}
                            tituloNota={title}
                            className="w-100 ratio-16-9"
                        />
                    </Static>
                ) : (
                    <Image
                        alt={getImageAltText({ ...imageData, title })}
                        src={resizedUrl || url}
                        className="w-100 ratio-3-2"
                        fetchPriority="high"
                        loading="eager"
                        sources={getImagesToLoadWithPicture(resizedUrls)}
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
                <div className="flex flex-column gap-24">
                    <Static id={`btn-saved-${_id}`}>
                        <Button
                            title="Guardar"
                            size={{ sm: 32, lg: 40 }}
                            data-modal="open-modal"
                            data-id={_id}
                        >
                            <Icon size={16} className="sm-none">
                                <IconSprite name="bookmark" critical />
                            </Icon>
                            Guardar
                        </Button>
                    </Static>
                    <div className="flex flex-column flex-column_lg gap-24 jc-between_md">
                        <AudioRecipe
                            title={title}
                            resizedUrl={resizedUrl}
                            url={url}
                            article={article}
                        />
                        <div className="flex ai-center gap-16 gap-24_md">
                            {article && (
                                <ButtonsGroup
                                    article={article}
                                    isPrivate={isPrivate}
                                    printButtonType="printButton"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Recipe.Body>
        </Recipe>
    );
}

OpeningRecipe.propTypes = {
    article: PropTypes.shape({
        promo_items: PropTypes.shape({
            video_jw: PropTypes.object,
            basic: PropTypes.shape({
                resized_urls: PropTypes.arrayOf(PropTypes.string),
                url: PropTypes.string
            })
        }),
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.object)
        }),
        _id: PropTypes.string
    }),
    isPrivate: PropTypes.bool
};

OpeningRecipe.defaultProps = {
    article: {
        promo_items: {
            video_jw: null,
            basic: {
                resized_urls: [],
                url: ''
            }
        },
        headlines: {
            basic: ''
        },
        taxonomy: {
            sections: []
        },
        _id: ''
    },
    isPrivate: false
};

export default OpeningRecipe;
