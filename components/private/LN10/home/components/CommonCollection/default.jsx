/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { Card } from '@ln/contenidos-ui-card';
import { Bngrid } from '@ln/contenidos-ui-bngrid';

import BuildRoof from '../../../../../chains/utils/_BuildRoof/default';
import getCardConfig, { getTitleAndLeadForHome } from './_helper';
import get from '../../../../common/utils/get';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-card/index.css';
import '../../../../../../resources/packages/css/@ln/common-ui-grid/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-bngrid/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-cajahashtag/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-contentlab/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-cajaranking/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-cajaafondo/index.css';

import { getDataAttributesForViewability } from '../../../../../features/LN-10/article/_helper';

export default function CommonCollection({
    roofData = {},
    rules,
    gridType,
    position,
    articles = [],
    ContainerCards = Bngrid
}) {
    return (
        <>
            <BuildRoof {...roofData} />
            <ContainerCards gridType={gridType} gridStyle={roofData.chainStyle}>
                {articles.map((article, index) => {
                    const {
                        withImage,
                        subhead,
                        marquee,
                        marqueeImg,
                        cardSize,
                        mediaData,
                        imagePosition,
                        className
                    } = getCardConfig(rules[index], article);
                    const extraOpts = getDataAttributesForViewability(
                        article._id,
                        position,
                        index
                    );

                    const { title, lead } = getTitleAndLeadForHome(article);

                    return (
                        <Card
                            withMedia={withImage}
                            title={title}
                            lead={lead}
                            marquee={marquee}
                            marqueeImg={marqueeImg}
                            subhead={subhead}
                            href={get(article, 'website_url', '')}
                            mediaData={mediaData}
                            cardSize={cardSize}
                            imagePosition={imagePosition}
                            className={className}
                            {...extraOpts}
                        />
                    );
                })}
            </ContainerCards>
        </>
    );
}
