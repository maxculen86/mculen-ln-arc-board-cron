import React from 'react';
import { useContent } from 'fusion:content';
import AnexoRugbyComponent from '../../../private/anexoRugby/index';

const AnexoRugbyWorldCup = () => {
    const { data = [] } =
        useContent({
            source: 'rugbySource'
        }) || {};

    return data.length > 0 ? <AnexoRugbyComponent matchesData={data} /> : <></>;
};

AnexoRugbyWorldCup.label = 'Anexo Mundial Rugby';

export default AnexoRugbyWorldCup;
