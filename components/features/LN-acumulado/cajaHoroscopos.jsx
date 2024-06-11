import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import HoroscopeBox from '../../private/common/horoscopeBox';
import Static from 'fusion:static';

const CajaHoroscopos = ({ customFields, id: featureId }) => {
    const { globalContent, deployment, contextPath, arcSite } = useAppContext();
    const { title } = customFields;
    const { _id = '' } = globalContent || {};
    const path = _id.split('/').slice(1);

    return (
        <Static id={featureId}>
            {(() => {
                const { data } =
                    useContent({
                        source: 'horoscopeSource',
                        query: {
                            arcSite,
                            horoscope: path.length ? path[0] : ''
                        }
                    }) || {};
                return data ? (
                    <HoroscopeBox
                        signos={data.signos}
                        title={title}
                        deployment={deployment}
                        contextPath={contextPath}
                        chineseYear={data.anoHoroscopoChino}
                    />
                ) : (
                    <></>
                );
            })()}
        </Static>
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
