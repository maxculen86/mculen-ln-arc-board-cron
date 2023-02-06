/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { Roof } from '@ln/contenidos-ui-roof';
import { Card } from '@ln/contenidos-ui-card';
import { Bngrid } from '@ln/contenidos-ui-bngrid';

import get from '../../../../common/utils/get';
import { setMediaData } from './_helper';

import '../../../../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-card/index.css';
import '../../../../../../resources/packages/css/@ln/common-ui-grid/index.css';
import '../../../../../../resources/packages/css/@ln/contenidos-ui-bngrid/index.css';

const ExclusiveSubscriptor = ({
    articles,
    roof,
    rules = [],
    layout = 'bn_2_1_2_grid'
}) => {
    return (
        <>
            <Roof roofType="exc-sub">
                <Roof.Left text="EXCLUSIVO SUSCRIPTORES" />
                <Roof.Right
                    textButton={roof.textButton}
                    hrefButton={roof.hrefButton}
                    navData={roof.links}
                />
            </Roof>
            <Bngrid gridType={layout} gridStyle="subExclusive">
                {articles.map((article, index) => {
                    const promoItemsBasic = get(
                        article,
                        'promo_items.basic',
                        {}
                    );

                    return (
                        <Card
                            title={get(article, 'headlines.basic', '')}
                            lead={get(article, 'label.volanta.text', '')}
                            marquee={get(article, 'marquesina', '')}
                            href={get(article, 'website_url', '')}
                            mediaData={setMediaData(promoItemsBasic)}
                            cardSize="l"
                            imagePosition={
                                rules[index] && rules[index].imagePosition
                            }
                        />
                    );
                })}
            </Bngrid>
        </>
    );
};

export default ExclusiveSubscriptor;
