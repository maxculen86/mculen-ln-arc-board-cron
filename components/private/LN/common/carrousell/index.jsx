import React from 'react';
import PropTypes from 'prop-types';
import Carrousell from './default';
import CarrousellAmp from './amp';

const index = props => {
    const { outputType, data, withZoom = { withZoom } } = props;

    if (outputType === 'amp') return <CarrousellAmp data={data} />;
    return (
        <Carrousell data={data} withZoom={withZoom} outputType={outputType} />
    );
};

index.arcType = 'gallery';

index.propTypes = {
    outputType: PropTypes.string.isRequired
};

export default index;
