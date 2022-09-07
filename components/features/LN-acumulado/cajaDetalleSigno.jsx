import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import DailyHoroscope from '../../private/common/dailyHoroscope';
import StaticValidation from '../../private/common/staticValidation';

const CajaDetalleSigno = ({ id: featureId }) => {
    const { globalContent, deployment, contextPath, arcSite } = useAppContext();
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    const Component = (
        <>
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
                ) : null;
            })()}
        </>
    );
    const { props = {} } = Component;
    const { children } = props;

    return (
        children && (
            <StaticValidation id={featureId} htmlOnly persistent>
                {Component}
            </StaticValidation>
        )
    );
};

CajaDetalleSigno.label = 'LN Acumulado Caja Detalle Signo';

CajaDetalleSigno.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDetalleSigno;
