/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import useTermica from '../../../private/common/hooks/useTermica';
import config from '../../../../properties/sites/la-nacion-ar';
import CajaTema from '../../../private/LN/common/cajaTema';
import useSetLocalStorage from './_hooks/useSetLocalStorage';
import useBuildMayInterest from './_hooks/useBuildMayInterest';

const TePuedeInteresar = props => {
    const showLiftigniter = useTermica('liftigniter');
    if (!showLiftigniter) return <></>;
    const {
        customFields: { cantidadNotas = 6 } = {},
        outputType,
        siteProperties
    } = props;

    const { requestUri, globalContent = {}, arcSite, layout } = useAppContext();
    const { host = 'https://www.lanacion.com.ar' } = siteProperties;
    const { layoutsName = {} } = config;
    const url = `${host}${requestUri}`;
    const { _id } = globalContent;
    const { userId, sessionId, excludeItems } = useSetLocalStorage(url);

    const { sectionReference, articles, isReady } = useBuildMayInterest({
        cantidadNotas,
        userId,
        sessionId,
        excludeItems,
        arcSite,
        url,
        idArticle: _id
    });

    return (
        <>
            {isReady && articles && articles.length > 0 && (
                <div
                    className="row interest"
                    ref={sectionReference}
                    data-module="tema_tePuedeInteresar"
                >
                    <CajaTema
                        title="Te puede interesar"
                        sectionName={
                            layout === layoutsName.Home
                                ? 'TePuedeInteresarHome'
                                : 'TePuedeInteresar'
                        }
                        articles={articles}
                        position="toi"
                        outputType={outputType}
                        withVolanta
                    />
                </div>
            )}
        </>
    );
};

TePuedeInteresar.label = 'LN-Nota-tePuedeInteresar';

TePuedeInteresar.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({
            defaultValue: 6,
            min: 3,
            label: 'Cantidad de Notas'
        })
    }).isRequired,
    outputType: PropTypes.string,
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    })
};

TePuedeInteresar.defaultProps = {
    outputType: 'default',
    siteProperties: {}
};

export default TePuedeInteresar;
