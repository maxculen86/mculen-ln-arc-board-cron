/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import TePuedeInteresar from '../../../private/LN/nota/tePuedeInteresar';
import findTermica from '../../../private/common/utils/findTermica';
import config from '../../../../properties/sites/la-nacion-ar';

const tePuedeInteresar = props => {
    const showLiftigniter = findTermica('liftigniter');
    if (!showLiftigniter) return <></>;

    const {
        customFields: { cantidadNotas = 6 },
        outputType,
        siteProperties,
        id
    } = props;

    const { requestUri, globalContent, layout } = useAppContext();
    const { host = 'https://www.lanacion.com.ar' } = siteProperties || {};
    const { layoutsName = {} } = config || {};
    const url = `${host}${requestUri}`;
    const { _id } = globalContent || {};

    return (
        <Static id={id}>
            <TePuedeInteresar
                cantidadNotas={cantidadNotas}
                excludeItems={[url]}
                outputType={outputType}
                url={url}
                idArticle={_id}
                dataLayerSection={
                    layout === layoutsName.Home
                        ? 'h_sugerencias'
                        : 'n_te_puede_interesar'
                }
            />
        </Static>
    );
};

tePuedeInteresar.label = 'LN-Nota-tePuedeInteresar';

tePuedeInteresar.propTypes = {
    id: PropTypes.string.isRequired,
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

tePuedeInteresar.defaultProps = {
    outputType: 'amp',
    siteProperties: {}
};

export default tePuedeInteresar;
