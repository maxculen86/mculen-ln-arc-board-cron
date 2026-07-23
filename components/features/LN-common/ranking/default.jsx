/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent as getContent } from 'fusion:content';
import Static from 'fusion:static';
import { Text } from '@ln/contenidos-ui-text';
import { getRankingProps, getSectionParentId, hasArticles } from './_helper';
import { articleBoxesTracker } from '../../../private/common/utils/noteTracker/articleBoxesTracker';
import CardRanking from '../../LN-10-global/common/cardRanking/default';
import get from '../../../private/common/utils/get';
import { replaceUrlsByEnvironment } from '../../../private/common/utils/replaceProductiveImgDomain';

const getDataContent = (
    sectionId,
    sectionParentId,
    website,
    isStatic = false
) => {
    const getRankingData = section =>
        getContent({
            source: 'rankingArticlesSource',
            query: {
                sectionId: section,
                imageConfig: 'boxArticles',
                website,
                section: 'commonRanking'
            },
            staticMode: isStatic
        });

    const data = getRankingData(sectionId);

    if (!sectionId || !sectionParentId) return data || {};

    return (hasArticles(data) && data) || getRankingData(sectionParentId);
};

function RankingFeature({ id: featureId }) {
    const { website, arcSite, layout, globalContent = {} } = useAppContext();

    const { type } = globalContent;

    const { sectionId } = getRankingProps(layout, featureId, globalContent);

    const sectionParentId = getSectionParentId(sectionId);
    const { name, articles } =
        getDataContent(sectionId, sectionParentId, website || arcSite, true) ||
        {};

    const customTitle = name ? `Más leídas de ${name}` : 'Más leídas';
    const isNote = type === 'story';

    useEffect(() => {
        if (isNote) {
            articleBoxesTracker({
                boxType: 'ranking'
            });
        }
    }, [type]);

    return (
        <Static id={`common-ranking-${featureId}`} htmlOnly>
            <div
                className="bg-light-0 py-32 overflow-hidden"
                data-mrf-recirculation={isNote ? 'n_ranking' : undefined}
            >
                {articles?.length > 0 && (
                    <div className="flex ai-center gap-12 pt-12 mb-8 border border-top border-thin border-light-100">
                        <Text className="--prumo --font-l --font-medium">
                            {customTitle}
                        </Text>
                    </div>
                )}
                <ol>
                    {replaceUrlsByEnvironment(articles)?.map(
                        (
                            {
                                _id,
                                headlines,
                                website_url: websiteUrl,
                                promo_items: promoItems
                            },
                            i
                        ) => (
                            <li
                                key={headlines?.basic}
                                className="pb-8 mb-8 border border-bottom border-thin border-neutral-light-100"
                                data-article-box="Ranking"
                                data-id={_id}
                                data-notaid={_id}
                            >
                                <CardRanking
                                    href={websiteUrl}
                                    title={headlines?.basic}
                                    mediaData={{
                                        alt: headlines?.mobile,
                                        src: get(
                                            promoItems,
                                            'basic.resized_urls[0].resizedUrl',
                                            promoItems?.basic?.url
                                        )
                                    }}
                                    i={i}
                                />
                            </li>
                        )
                    )}
                </ol>
            </div>
        </Static>
    );
}

RankingFeature.label = 'LN-Common-Ranking';

export default RankingFeature;
