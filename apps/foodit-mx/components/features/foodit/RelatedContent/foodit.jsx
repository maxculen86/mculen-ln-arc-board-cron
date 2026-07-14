import React from 'react';
import Static from 'fusion:static';
import { useContent } from 'fusion:content';
import get from '../../../private/common/utils/get';
import CommonCardFoodit from '../../foodit-global/common/CommonCardFoodit/foodit';
import { RoofFoodit } from '../../foodit-global/common/RoofFoodit/foodit';
import getImageAltText from '../../foodit-global/common/utils/getImageAltText';
import { getShortestImage } from '../../../private/LN/common/utils/mediaHelper';
import {
    getFooditAuthor,
    getHighestPriorityTag
} from '../../foodit-global/common/utils/notaFooditHelper';

function RelatedContent({ globalContent }) {
    const id = get(globalContent, '_id', '');
    let relatedContent;
    try {
        relatedContent = useContent({
            source: id ? 'relatedContentSource' : null,
            query: {
                id,
                website: 'foodit',
                limit: 2
            },
            isStatic: true
        });
    } catch (error) {
        relatedContent = null;
    }

    if (!relatedContent || relatedContent?.length === 0) return null;

    const renderRelatedContent = () =>
        relatedContent?.map(item => {
            const itemId = get(item, '_id', '');
            const itemHeadline = get(item, 'headlines.basic', '');
            const itemAuthorText = getFooditAuthor(item);
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
            const itemHasVideo = get(item, 'promo_items.video_jw', null);
            const sections = get(item, 'taxonomy.sections', []);

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
                        tag={getHighestPriorityTag(sections)}
                        src={resizedUrl || itemImage}
                        alt={itemAltText}
                        author={itemAuthorText}
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
        });

    return (
        <Static id="related-content-static">
            <div>
                <RoofFoodit
                    title={{ text: 'Versiones de esta receta', as: 'h3' }}
                />
                <div
                    className="flex flex-column flex-row_md gap-24_md gap-32 gap-32_lg"
                    role="list"
                >
                    {renderRelatedContent()}
                </div>
            </div>
        </Static>
    );
}

export default RelatedContent;
