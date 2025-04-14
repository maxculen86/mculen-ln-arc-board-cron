import React from 'react';
import Static from 'fusion:static';
import { useContent } from 'fusion:content';
import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import CommonCardFoodit from '../../foodit-global/common/CommonCardFoodit/foodit';
import { RoofFoodit } from '../../foodit-global/common/RoofFoodit/foodit';
import getImageAltText from '../../foodit-global/common/utils/getImageAltText';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';

function RelatedContent({ globalContent }) {
    const id = get(globalContent, '_id', '');
    const relatedContent = useContent({
        source: id ? 'relatedContentSource' : null,
        query: {
            id,
            website: 'foodit'
        },
        isStatic: true
    });

    if (!relatedContent || relatedContent?.length === 0) return null;

    return (
        <Static id="related-content-static">
            <RoofFoodit
                title={{ text: 'Versiones de esta receta', as: 'h3' }}
            />
            <div
                className="flex flex-column flex-row_md gap-24_md gap-32 gap-32_lg"
                role="list"
            >
                {relatedContent?.map(item => {
                    const itemId = get(item, '_id', '');
                    const itemHeadline = get(item, 'headlines.basic', '');
                    const itemAuthor = get(item, 'credits.by[0].name', '');
                    const itemLinkUrl = get(item, 'canonical_url', '');
                    const itemPreparationTime = get(
                        item,
                        'promo_items.receta.embed.config.counterTime',
                        1
                    );
                    const itemAltText = getImageAltText(
                        get(item, 'promo_items.basic', {})
                    );
                    const { resizedUrl } = getShortestImage(
                        get(item, 'promo_items.basic.resized_urls', [])
                    );
                    const itemImage = get(item, 'promo_items.basic.url', '');
                    const itemHasVideo = get(
                        item,
                        'promo_items.video_jw',
                        null
                    );

                    return (
                        <div className="w-100" key={itemId}>
                            <CommonCardFoodit
                                articleId={itemId}
                                linksProps={{
                                    href: itemLinkUrl,
                                    title: itemHeadline
                                }}
                                title={itemHeadline}
                                variant="recipe"
                                container="related-content"
                                size="small"
                                tag="Facil"
                                src={resizedUrl || itemImage}
                                alt={itemAltText}
                                author={itemAuthor}
                                showTime={Boolean(itemPreparationTime)}
                                time={String(itemPreparationTime)}
                                contentCode="receta"
                                mediaVariant="image"
                                isOpening={false}
                                loading="lazy"
                                fetchPriority="low"
                                hasVideo={Boolean(itemHasVideo)}
                            />
                        </div>
                    );
                })}
            </div>
        </Static>
    );
}

RelatedContent.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string
    }).isRequired
};

export default RelatedContent;
