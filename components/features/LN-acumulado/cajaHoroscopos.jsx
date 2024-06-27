import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import HoroscopeBox from '../../private/common/horoscopeBox';
import Static from 'fusion:static';

const CajaHoroscopos = ({ customFields, id: featureId }) => {
    const { deployment, contextPath, arcSite } = useAppContext();
    const { title } = customFields;

    return (
        <Static id={featureId}>
            {(() => {
                const { dataService = {} } =
                    useContent({
                        source: 'servicesSource',
                        query: {
                            arcSite,
                            service: 'horoscopo'
                        }
                    }) || {};
                return Object.keys(dataService).length > 0 ? (
                    <HoroscopeBox
                        signos={dataService.signos}
                        title={title}
                        deployment={deployment}
                        contextPath={contextPath}
                        chineseYear={dataService.anoHoroscopoChino}
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
