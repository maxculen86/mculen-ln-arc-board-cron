import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import DailyHoroscope from '../../private/common/dailyHoroscope';
import StaticContent from '../../private/common/staticContent';

const CajaDetalleSigno = () => {
    const { globalContent, deployment, contextPath, arcSite } = useAppContext();
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    return (
        <StaticContent>
            {(() => {
                const { data } =
                    useContent({
                        source: 'horoscopeSource',
                        query: {
                            arcSite,
                            horoscope: path.length ? path[0] : '',
                            sign: path.length > 1 ? path[1] : ''
                        },
                        staticMode: true
                    }) || {};
                return data ? (
                    <DailyHoroscope
                        data={data}
                        deployment={deployment}
                        contextPath={contextPath}
                    />
                ) : (
                    <></>
                );
            })()}
        </StaticContent>
    );
};

CajaDetalleSigno.label = 'LN Acumulado Caja Detalle Signo';

CajaDetalleSigno.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDetalleSigno;
