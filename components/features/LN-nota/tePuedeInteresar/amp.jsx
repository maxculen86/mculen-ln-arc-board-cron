/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import useTermica from '../../../private/common/hooks/useTermica';
import config from '../../../../properties/sites/la-nacion-ar';
import CajaTema from '../../../private/LN/common/cajaTema';

const TePuedeInteresar = props => {
    const showLiftigniter = useTermica('liftigniter');
    if (!showLiftigniter) return <></>;

    const {
        customFields: { cantidadNotas = 6 } = {},
        outputType,
        siteProperties
    } = props;

    const { requestUri, globalContent, layout, arcSite } = useAppContext();
    const { host = 'https://www.lanacion.com.ar' } = siteProperties || {};
    const { layoutsName = {} } = config || {};
    const url = `${host}${requestUri}`;
    const { _id } = globalContent || {};

    const articles = useContent({
        source: 'liftigniterSource',
        query: {
            cantidadNotas,
            referrer: url,
            imageConfig: 'boxArticles',
            idArticle: _id,
            excludeItems: [url],
            arcSite,
            action: 'model'
        }
    });

    return (
        <>
            {articles && articles.length > 0 && (
                <div className="row interest">
                    <CajaTema
                        title="Te puede interesar"
                        sectionName={
                            layout === layoutsName.Home
                                ? 'h_sugerencias'
                                : 'n_te_puede_interesar'
                        }
                        articles={articles}
                        position="toi"
                        outputType={outputType}
                        handleClick={null}
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
        }).isRequired
    }).isRequired,
    outputType: PropTypes.string,
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    })
};

TePuedeInteresar.defaultProps = {
    outputType: 'amp',
    siteProperties: {}
};

export default TePuedeInteresar;
