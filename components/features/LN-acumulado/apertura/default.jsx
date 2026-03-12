import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import NotaApertura from '../../../private/LN/acumulado/notaApertura';
import useGlobalProviderAcu from '../../../private/LN/acumulado/hooks/useGlobalProviderAcu';

function AperturaFeature(props) {
    const { outputType = 'default', id: featureId } = props;
    const { articlesInCollection = [] } = useGlobalProviderAcu();

    const Component = (
        <NotaApertura
            {...props}
            articlesInCollection={articlesInCollection}
            outputType={outputType}
        />
    );

    return <Static id={featureId}>{Component}</Static>;
}

AperturaFeature.label = 'LN-Acumulado-Apertura';

export default Consumer(AperturaFeature);
