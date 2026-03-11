import React from 'react';
import Consumer from 'fusion:consumer';
import StaticContentV2 from '../../../chains/LN10-global/staticContentV2';
import useArticlesInCollection from './hooks/useArticlesInCollection';
import NotaApertura from './components/NotaApertura';

function AperturaFeatureV2(props) {
    const { id: featureId } = props;
    const articles = useArticlesInCollection();

    return (
        <StaticContentV2 id={featureId}>
            <NotaApertura articles={articles} />
        </StaticContentV2>
    );
}

AperturaFeatureV2.label = 'LN-Acumulado-AperturaV2';

export default Consumer(AperturaFeatureV2);
