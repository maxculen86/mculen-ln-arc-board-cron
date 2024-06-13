import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import DailyHoroscope from '../../private/common/dailyHoroscope';
import Static from 'fusion:static';

const CajaDetalleSigno = ({ id: featureId }) => {
    const { globalContent, deployment, contextPath, arcSite } = useAppContext();
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    return (
        <Static id={featureId}>
            {(() => {
                const { dataService = {} } =
                    useContent({
                        source: 'servicesSource',
                        query: {
                            arcSite,
                            service: 'horoscopo',
                            serviceItem: path.length > 1 ? path[1] : ''
                        },
                        staticMode: true
                    }) || {};

                return Object.keys(dataService).length > 0 ? (
                    <DailyHoroscope
                        data={dataService}
                        deployment={deployment}
                        contextPath={contextPath}
                    />
                ) : (
                    <></>
                );
            })()}
        </Static>
    );
};

CajaDetalleSigno.label = 'LN Acumulado Caja Detalle Signo';

CajaDetalleSigno.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDetalleSigno;
