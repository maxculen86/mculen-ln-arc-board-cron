/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { Card } from '@ln/contenidos-ui-card';
import { Bngrid } from '@ln/contenidos-ui-bngrid';
import BuildRoof from '../../../../../chains/utils/_BuildRoof/default';
import getCardConfig, {
    getArticleHref,
    getBadge,
    getItemProps,
    getTitleAndLeadForHome,
    createArticlesWithCustomMarker
} from './_helper';
import getCustomBadge from '../../../../../features/LN/common/utils/getCustomBadge';
import getNumericRatingValue from '../../../../common/utils/getNumericRatingValue';

import {
    getDataAttributesForViewability,
    showSection,
    shouldHighlightCustomVoice
} from '../../../../../features/LN-10/article/_helper';
import { targetUrlRedirect } from '../../../../../chains/utils/targetUrlRedirect';
import MarqueeHighlight from '../../../../../features/LN-10-global/common/marqueeHighlight/default';
import { RenderCustomArticle } from './renderCustomArticle';

export default function CommonCollection({
    roofData = {},
    rules,
    gridType,
    position,
    articles = [],
    ContainerCards = Bngrid,
    layout,
    isContentLab100,
    isExclusiveSub,
    isFoodit,
    isSegmentedBox,
    children = null
}) {
    const { linkButton, titleLink, buttonText, chainStyle, buttonLogo } =
        roofData;
    const hrefButtonFoodit = isFoodit && linkButton;
    const targetButton = targetUrlRedirect(linkButton);

    const hasCustomCard = isFoodit || isSegmentedBox;

    const articlesWithCustomNode = createArticlesWithCustomMarker({
        articles,
        shouldInclude: hasCustomCard
    });

    return (
        <>
            <BuildRoof {...roofData} isAFondo={layout === 'bnFondo'} />
            <ContainerCards
                gridType={gridType}
                gridStyle={chainStyle}
                itemProps={getItemProps({ isSegmentedBox, isFoodit })}
                timeline={children}
            >
                {articlesWithCustomNode.map((article, index) => {
                    if (article.__isCustomArticle) {
                        return (
                            <RenderCustomArticle
                                key="custom-article"
                                layout={layout}
                                isFoodit={isFoodit}
                                isSegmentedBox={isSegmentedBox}
                                articleData={{
                                    targetButton,
                                    titleLink,
                                    buttonText,
                                    hrefButtonFoodit,
                                    buttonLogo
                                }}
                            />
                        );
                    }

                    const rulesIndex = hasCustomCard
                        ? rules[index - 1]
                        : rules[index];

                    const {
                        withImage,
                        subhead,
                        marquee,
                        marqueeImg,
                        cardSize,
                        mediaData,
                        imagePosition,
                        className = '',
                        withSection,
                        href
                    } = getCardConfig(rulesIndex, article, true);

                    const extraOpts = getDataAttributesForViewability(
                        article._id,
                        position,
                        hasCustomCard ? index - 1 : index
                    );

                    const { title, lead } = getTitleAndLeadForHome(article);

                    const { badgeText, badgeStyle } = getBadge({
                        article,
                        isExclusiveSub,
                        isFoodit
                    });
                    const isSubscriber = badgeStyle === 'subscriber';
                    const rating = getNumericRatingValue(
                        article.content_elements
                    );
                    const targetFoodit = isFoodit ? `_blank` : undefined;

                    const hasCustomVoice = shouldHighlightCustomVoice(
                        article,
                        rulesIndex
                    );

                    const sectionText = hasCustomVoice ? (
                        <MarqueeHighlight />
                    ) : (
                        showSection({
                            withSection,
                            article,
                            authors: marquee,
                            authorPhoto: marqueeImg
                        })
                    );

                    return (
                        <Card
                            key={article._id}
                            withMedia={withImage}
                            title={title}
                            lead={lead}
                            marquee={marquee}
                            marqueeImg={marqueeImg}
                            marqueeAIHighlight={hasCustomVoice}
                            subhead={subhead}
                            href={getArticleHref(article, href, isFoodit)}
                            mediaData={mediaData}
                            cardSize={isContentLab100 ? '4xl' : cardSize}
                            imagePosition={imagePosition}
                            className={className}
                            section={sectionText}
                            badgeText={isSubscriber ? null : badgeText}
                            badgeType={isSubscriber ? null : badgeStyle}
                            customBadge={getCustomBadge({
                                rating,
                                isSubscriber
                            })}
                            {...extraOpts}
                            target={targetFoodit}
                        />
                    );
                })}
            </ContainerCards>
        </>
    );
}
