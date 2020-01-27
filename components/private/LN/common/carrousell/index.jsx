import React from 'react';
import PropTypes from 'fusion:prop-types';
import Carrousell from './default';
import CarrousellAmp from './amp';

const index = props => {
    const { outputType, data } = props;
    console.log('GALERIA INDEX');

    if (outputType === 'amp') return <CarrousellAmp data={data} />;
    return <Carrousell data={data} />;
    //return <>ACA TOY</>;
};

index.arcType = 'gallery';

index.propTypes = {
    outputType: PropTypes.string.isRequired
};

export default index;
