import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import ModDolar from '../../private/common/mod-dolar';

const CajaDolar = ({ id: featureId }) => {
    const { contextPath, deployment } = useAppContext() || {};
    console.log(
        '🚀 ~ file: cajaDolar.jsx ~ line 10 ~ CajaDolar ~ useAppContext()',
        useAppContext()
    );

    const response =
        useContent({
            source: 'dolarSource'
        }) || {};

    const { data, imageUrl } = response;

    return (
        (data && (
            <Static id={featureId}>
                <ModDolar
                    imageUrl={imageUrl}
                    data={data}
                    contextPath={contextPath}
                    deployment={deployment}
                />
            </Static>
        )) ||
        null
    );
};

CajaDolar.label = 'LN Acumulado Caja Dolar';

CajaDolar.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDolar;
