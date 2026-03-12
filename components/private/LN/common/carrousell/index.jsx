import React from 'react';
import Carrousell from './default';

const index = props => {
    // eslint-disable-next-line no-use-before-define
    const { outputType, data, withZoom = { withZoom } } = props;

    return (
        <Carrousell data={data} withZoom={withZoom} outputType={outputType} />
    );
};

index.arcType = 'gallery';

export default index;
