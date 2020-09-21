import React from 'react';
import NotaApertura from '../../private/LN/acumulado/notaApertura';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import get from '../../private/common/utils/get';

const AperturaFeature = props => {
    const { acumuladoGeneral } = useGlobalProviderAcu();
    const idCollection = get(acumuladoGeneral, 'id_collection_promo_items');
    return <NotaApertura {...props} idCollection={idCollection} />;
};

AperturaFeature.label = 'LN-Acumulado-Apertura';

export default AperturaFeature;
