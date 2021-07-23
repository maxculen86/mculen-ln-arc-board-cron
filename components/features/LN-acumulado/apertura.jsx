import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import withStatic from '../../private/common/hocs/withStatic';
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

AperturaFeature.label = 'LN-Acumulado-Apertura';
AperturaFeature.lazy = ['default', 'amp'];

export default withStatic(Consumer(AperturaFeature));
