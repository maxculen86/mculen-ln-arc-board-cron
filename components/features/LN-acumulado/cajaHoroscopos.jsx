import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import HoroscopeBox from '../../private/common/horoscopeBox';
import StaticValidation from '../../private/common/staticValidation';

const CajaHoroscopos = ({ id: featureId, customFields }) => {
    const { globalContent, deployment, contextPath, arcSite } = useAppContext();
    const { title } = customFields;
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            {(() => {
                const { data } =
                    useContent({
                        source: 'horoscopeSource',
                        query: {
                            arcSite,
                            horoscope: path.length ? path[0] : ''
                        },
                        staticMode: true
                    }) || {};
                return data ? (
                    <HoroscopeBox
                        signos={data.signos}
                        title={title}
                        deployment={deployment}
                        contextPath={contextPath}
                    />
                ) : (
                    <></>
                );
            })()}
        </StaticValidation>
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
