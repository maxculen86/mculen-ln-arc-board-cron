import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import HoroscopeBox from '../../private/common/horoscopeBox';

const CajaHoroscopos = ({ id: featureId, customFields }) => {
    const { globalContent, deployment, contextPath } = useAppContext();
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    const response =
        useContent({
            source: 'horoscopeSource',
            query: { horoscope: path.length ? path[0] : '' }
        }) || {};

    const { title } = customFields;

    return response && response.data ? (
        <Static id={featureId}>
            <HoroscopeBox
                signos={response.data.signos}
                title={title}
                deployment={deployment}
                contextPath={contextPath}
            />
        </Static>
    ) : (
        <></>
    );
};

CajaHoroscopos.label = 'LN Acumulado Caja Horoscopos';

CajaHoroscopos.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            label: 'Título',
            defaultValue: ''
        })
    }).isRequired
};

export default CajaHoroscopos;
