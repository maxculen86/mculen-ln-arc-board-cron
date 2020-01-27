import React from 'react';
import PropTypes from 'fusion:prop-types';
import Carrousell from './default';
import CarrousellAmp from './amp';

const index = props => {
    const { outputType, data } = props;

    if (outputType === 'amp') return <CarrousellAmp data={data} />;
    return <Carrousell data={data} />;
};

index.arcType = 'gallery';

index.propTypes = {
    outputType: PropTypes.string.isRequired
};

export default index;
