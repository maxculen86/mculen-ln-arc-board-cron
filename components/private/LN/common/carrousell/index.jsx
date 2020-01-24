import React from 'react';
import PropTypes from 'fusion:prop-types';
import Carrousell from './default';
import CarrousellAmp from './amp';

const index = props => {
    const { outputType, data } = props;
    console.log('PASA POR GALERIA INDEX');

    if (outputType === 'amp') return <CarrousellAmp />;
    return <Carrousell />;
    //return <></>;
};

index.propTypes = {
    outputType: PropTypes.string.isRequired
};

export default index;
