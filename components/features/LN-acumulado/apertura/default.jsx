import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import NotaApertura from '../../../private/LN/acumulado/notaApertura';
import useGlobalProviderAcu from '../../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import StaticContent from '../../../private/common/staticContent';

const AperturaFeature = props => {
    const { outputType = 'default' } = props;
    const { articlesInCollection = [] } = useGlobalProviderAcu();

    const Component = (
        <NotaApertura
            {...props}
            articlesInCollection={articlesInCollection}
            outputType={outputType}
        />
    );

    return <StaticContent>{Component}</StaticContent>;
};

AperturaFeature.propTypes = {
    outputType: PropTypes.func.isRequired
};

AperturaFeature.label = 'LN-Acumulado-Apertura';

export default Consumer(AperturaFeature);
