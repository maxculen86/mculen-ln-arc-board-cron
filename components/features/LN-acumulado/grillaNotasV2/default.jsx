import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { GrillaNotasServer } from './components/GrillaNotasServer';
import { GrillaNotasClient } from './components/GrillaNotasClient';
import buildCustomFieldsForBanners from '../grillaNotas/_helpers';
import Banner from '../../../private/LN/acumulado/grillaNotas/Banner';
import StaticContentV2 from '../../../chains/LN10-global/staticContentV2';

function GrillaNotasFeatureV2(props) {
    const {
        layout,
        globalContent,
        customFields,
        globalContentConfig,
        outputType
    } = props;

    const { _id: id, name } = globalContent;
    const isUltimasNoticias = id === '/ultimas-noticias';
    const getBanner = Banner({
        customFields,
        globalContentConfig,
        outputType,
        globalContent
    });

    return (
        <>
            <StaticContentV2 id="grillaAcuServer">
                <GrillaNotasServer
                    id={id}
                    layout={layout}
                    isUltimasNoticias={isUltimasNoticias}
                    getBanner={getBanner}
                    globalContent={globalContent}
                />
            </StaticContentV2>
            <GrillaNotasClient
                id={id}
                layout={layout}
                name={name}
                isUltimasNoticias={isUltimasNoticias}
                globalContent={globalContent}
            />
        </>
    );
}

GrillaNotasFeatureV2.label = 'LN-Acumulado-Grilla-NotasV2';

GrillaNotasFeatureV2.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
    }).isRequired,
    layout: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...buildCustomFieldsForBanners()
    }).isRequired,
    outputType: PropTypes.string.isRequired,
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
};

export default Consumer(GrillaNotasFeatureV2);
