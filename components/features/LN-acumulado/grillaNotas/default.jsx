import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';

import Banner from '../../../private/LN/acumulado/grillaNotas/Banner';
import buildCustomFieldsForBanners from './_helpers';

import useGlobalProviderAcu from '../../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import useGridPagination from '../../../private/LN/common/hooks/useGridPagination';
import GrillaNotas from '../../../private/LN/acumulado/grillaNotas/grillaNotas';

import { verifyChainsBeforeGrid } from '../../../private/common/utils/preloadHelper';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import get from '../../../private/common/utils/get';

function GrillaNotasFeature(props) {
    const { customFields, globalContentConfig, globalContent, id, template } =
        props;

    const isPage = template?.includes('page');

    const globalProviderAcu = useGlobalProviderAcu();

    const {
        globalContent: {
            _id,
            Payload: payload,
            distributorId,
            node_type: nodeType,
            type,
            isWiki,
            serviceItem = '',
            serviceType = ''
        } = {},
        outputType = 'default',
        requestUri = '',
        renderables = []
    } = useAppContext();

    const { filterNotes, ...customFieldsForBanner } = customFields;

    const hasChainBeforeGrid = verifyChainsBeforeGrid(renderables);

    const name = get(globalContent, 'name', '');

    const appContextProps = {
        _id: serviceType === 'feriados-mes' ? `/feriados/${serviceItem}` : _id,
        payload,
        distributorId,
        nodeType,
        type,
        outputType,
        renderables,
        isWiki
    };

    const getBanner = Banner({
        customFields: customFieldsForBanner,
        globalContentConfig,
        outputType,
        globalContent
    });

    const { goToNextPage, loading, hasMoreArticles, InitialGrid, NextResults } =
        useGridPagination({
            getBanner,
            ...globalProviderAcu,
            ...appContextProps,
            hasChainBeforeGrid,
            requestUri,
            filterNotes,
            isPage,
            name
        });

    return (
        <GrillaNotas
            goToNextPage={goToNextPage}
            loading={loading}
            hasMoreArticles={hasMoreArticles}
            InitialGrid={InitialGrid}
            NextResults={NextResults}
            name={name}
            featureId={id}
        />
    );
}

GrillaNotasFeature.label = 'LN-Acumulado-Grilla-Notas';

GrillaNotasFeature.propTypes = {
    customFields: PropTypes.shape({
        filterNotes: PropTypes.boolean.tag({
            name: 'Filtrar Nota por K&L',
            defaultValue: false,
            group: groupCustomFields
        }),
        ...buildCustomFieldsForBanners()
    }).isRequired,
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired,
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired,
    template: PropTypes.string.isRequired
};

export default Consumer(GrillaNotasFeature);
