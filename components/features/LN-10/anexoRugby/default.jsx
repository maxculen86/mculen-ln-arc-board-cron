import React from 'react';
import { useContent } from 'fusion:content';
import AnexoRugbyComponent from '../../../private/anexoRugby/index';

const AnexoRugbyWorldCup = () => {
    const { data } = useContent({
        source: 'rugbySource'
    });
    console.log('🚀 ~ file: default.jsx:9 ~ AnexoRugbyWorldCup ~ data:', data);

    return data ? <AnexoRugbyComponent matchesData={data} /> : <></>;
};

AnexoRugbyWorldCup.label = 'Anexo Mundial Rugby';

export default AnexoRugbyWorldCup;
