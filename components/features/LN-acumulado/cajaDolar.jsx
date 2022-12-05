import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import ModDolar from '../../private/common/mod-dolar';
import filter from '../../../content/filters/LN/services/dolar';

const CajaDolar = ({ id: featureId }) => {
    const response =
        useContent({
            source: 'dolarSource',
            staticMode: true,
            filter
        }) || {};

    const { data, imageUrl } = response;

    return (
        <Static id={featureId}>
            {(() => {
                return data ? (
                    <ModDolar imageUrl={imageUrl} data={data} />
                ) : (
                    <></>
                );
            })()}
        </Static>
    );
};

CajaDolar.label = 'LN Acumulado Caja Dolar';

CajaDolar.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDolar;
