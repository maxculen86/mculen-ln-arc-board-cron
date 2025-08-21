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
    getTitleAndLeadForHome
} from './_helper';

import {
    getDataAttributesForViewability,
    showSection,
    shouldHighlightCustomVoice
} from '../../../../../features/LN-10/article/_helper';
import { targetUrlRedirect } from '../../../../../chains/utils/targetUrlRedirect';
import MarqueeHighlight from '../../../../../features/LN-10-global/common/marqueeHighlight/default';

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
    children = null
}) {
    const { linkButton, titleLink, buttonText } = roofData;
    const hrefButtonFoodit = isFoodit && linkButton;
    const targetButton = targetUrlRedirect(linkButton);
    return (
        <>
            <BuildRoof {...roofData} isAFondo={layout === 'bnFondo'} />
            <ContainerCards
                gridType={gridType}
                gridStyle={roofData.chainStyle}
                hrefButton={hrefButtonFoodit}
                hrefLink={titleLink}
                targetButton={targetButton}
                textButtonFooditCard={buttonText}
                timeline={children}
            >
                {articles.map((article, index) => {
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
                    } = getCardConfig(rules[index], article);

                    const extraOpts = getDataAttributesForViewability(
                        article._id,
                        position,
                        index
                    );

                    const { title, lead } = getTitleAndLeadForHome(article);

                    const { badgeText, badgeStyle } = getBadge({
                        article,
                        isExclusiveSub,
                        isFoodit
                    });
                    const targetFoodit = isFoodit && `_blank`;

                    const hasCustomVoice = shouldHighlightCustomVoice(
                        article,
                        rules[index]
                    );

                    const sectionText = hasCustomVoice ? (
                        <MarqueeHighlight />
                    ) : (
                        showSection({
                            withSection,
                            article,
                            authorPhoto: marqueeImg
                        })
                    );

                    return (
                        <Card
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
                            badgeText={badgeText}
                            badgeType={badgeStyle}
                            {...extraOpts}
                            target={targetFoodit}
                        />
                    );
                })}
            </ContainerCards>
        </>
    );
}
