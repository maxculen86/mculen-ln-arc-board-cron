import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import NotaApertura from '../../private/LN/acumulado/notaApertura';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';

const AperturaFeature = props => {
    const { outputType } = props;
    const { articlesInCollection = [] } = useGlobalProviderAcu();

    return (
        <NotaApertura
            {...props}
            articlesInCollection={articlesInCollection}
            outputType={outputType}
        />
    );
};

AperturaFeature.propTypes = {
    outputType: PropTypes.func.isRequired
};
AperturaFeature.static = true;
AperturaFeature.label = 'LN-Acumulado-Apertura';

export default Consumer(AperturaFeature);
