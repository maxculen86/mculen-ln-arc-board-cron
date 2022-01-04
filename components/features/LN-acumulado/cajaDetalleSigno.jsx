import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import DailyHoroscope from '../../private/common/dailyHoroscope';

const CajaDetalleSigno = ({ id: featureId }) => {
    const { globalContent } = useAppContext();
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    const response =
        useContent({
            source: 'horoscopeSource',
            query: {
                horoscope: path.length ? path[0] : '',
                sign: path.length > 1 ? path[1] : ''
            }
        }) || {};

    return response && response.data ? (
        <Static id={featureId}>
            <DailyHoroscope data={response.data} />
        </Static>
    ) : (
        <></>
    );
};

CajaDetalleSigno.label = 'LN Acumulado Caja Detalle Signo';

CajaDetalleSigno.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDetalleSigno;
