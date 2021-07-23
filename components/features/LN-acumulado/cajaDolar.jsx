import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import ModDolar from '../../private/common/mod-dolar';

const CajaDolar = ({ id: featureId }) => {
    const response =
        useContent({
            source: 'dolarSource'
        }) || {};

    const { data, imageUrl } = response;

    return (
        (data && (
            <Static id={featureId}>
                <ModDolar imageUrl={imageUrl} data={data} />
            </Static>
        )) ||
        null
    );
};

CajaDolar.label = 'LN Acumulado Caja Dolar';

CajaDolar.propTypes = {
    id: PropTypes.string.isRequired
};

CajaDolar.lazy = ['default', 'amp'];

export default CajaDolar;
