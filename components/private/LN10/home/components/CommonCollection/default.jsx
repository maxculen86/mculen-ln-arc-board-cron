/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { Card } from '@ln/contenidos-ui-card';
import { Bngrid } from '@ln/contenidos-ui-bngrid';
import BuildRoof from '../../../../../chains/utils/_BuildRoof/default';
import getCardConfig from './_helper';
import get from '../../../../common/utils/get';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-card/index.css';
import '../../../../../../resources/packages/css/@ln/common-ui-grid/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-bngrid/index.css';

export default function CommonCollection({
    roofData = {},
    rules,
    gridType,
    articles = []
}) {
    return (
        <>
            <BuildRoof {...roofData} />
            <Bngrid gridType={gridType} gridStyle={roofData.chainStyle}>
                {articles.map((article, index) => {
                    const {
                        withImage,
                        subhead,
                        marquee,
                        marqueeImg,
                        cardSize,
                        mediaData,
                        imagePosition
                    } = getCardConfig(rules[index], article);

                    return (
                        <Card
                            withMedia={withImage}
                            title={get(article, 'headlines.basic', '')}
                            lead={get(article, 'label.volanta.text', '')}
                            marquee={marquee}
                            marqueeImg={marqueeImg}
                            subhead={subhead}
                            href={get(article, 'website_url', '')}
                            mediaData={mediaData}
                            cardSize={cardSize}
                            imagePosition={imagePosition}
                        />
                    );
                })}
            </Bngrid>
        </>
    );
}
