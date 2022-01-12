import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import DailyHoroscope from '../../private/common/dailyHoroscope';

const CajaDetalleSigno = ({ id: featureId }) => {
    const { globalContent, deployment, contextPath, arcSite } = useAppContext();
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    const { data } =
        useContent({
            source: 'horoscopeSource',
            query: {
                arcSite,
                horoscope: path.length ? path[0] : '',
                sign: path.length > 1 ? path[1] : ''
            }
        }) || {};

    return data ? (
        <Static id={featureId}>
            <DailyHoroscope
                data={data}
                deployment={deployment}
                contextPath={contextPath}
            />
        </Static>
    ) : null;
};

CajaDetalleSigno.label = 'LN Acumulado Caja Detalle Signo';
CajaDetalleSigno.lazy = true;

CajaDetalleSigno.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDetalleSigno;
