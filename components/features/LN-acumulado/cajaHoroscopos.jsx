import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import HoroscopeBox from '../../private/common/horoscopeBox';

const CajaHoroscopos = ({ id: featureId, customFields }) => {
    const { globalContent, deployment, contextPath, arcSite } = useAppContext();
    const { title } = customFields;
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    const { data } =
        useContent({
            source: 'horoscopeSource',
            query: { arcSite, horoscope: path.length ? path[0] : '' }
        }) || {};

    return data ? (
        <Static id={featureId}>
            <HoroscopeBox
                signos={data.signos}
                title={title}
                deployment={deployment}
                contextPath={contextPath}
            />
        </Static>
    ) : null;
};

CajaHoroscopos.label = 'LN Acumulado Caja Horoscopos';
CajaHoroscopos.lazy = true;

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
