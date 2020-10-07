import React from 'react';
import { useAppContext } from 'fusion:context';
import NotaApertura from '../../private/LN/acumulado/notaApertura';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import get from '../../private/common/utils/get';
import withStatic from '../../private/common/hocs/withStatic';

const AperturaFeature = props => {
    const { acumuladoGeneral } = useGlobalProviderAcu();
    const idCollection = get(acumuladoGeneral, 'id_collection_promo_items');
    const { outputType } = useAppContext();
    return (
        <NotaApertura
            {...props}
            idCollection={idCollection}
            outputType={outputType}
        />
    );
};

AperturaFeature.label = 'LN-Acumulado-Apertura';

export default withStatic(AperturaFeature);
