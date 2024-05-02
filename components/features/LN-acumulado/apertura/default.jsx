import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import NotaApertura from '../../../private/LN/acumulado/notaApertura';
import useGlobalProviderAcu from '../../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import Static from 'fusion:static';

const AperturaFeature = props => {
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
};

AperturaFeature.propTypes = {
    outputType: PropTypes.func.isRequired
};

AperturaFeature.label = 'LN-Acumulado-Apertura';

export default Consumer(AperturaFeature);
