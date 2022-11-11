/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';

import Banner from '../../../private/LN/acumulado/grillaNotas/Banner';
import buildCustomFieldsForBanners from './_helpers';

import useGlobalProviderAcu from '../../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import useGridPagination from '../../../private/LN/common/hooks/useGridPagination';
import GrillaNotas from '../../../private/LN/acumulado/grillaNotas/grillaNotas';

import checkHydrateOnly from '../../../private/LN/common/utils/checkHydrateOnly';

const GrillaNotasFeature = props => {
    const { customFields, globalContentConfig, globalContent } = props;
    const globalProviderAcu = useGlobalProviderAcu();

    const {
        globalContent: {
            _id,
            Payload: payload,
            distributorId,
            node_type: nodeType,
            type
        } = {},
        outputType = 'default',
        renderables = []
    } = useAppContext();

    const hasHydrateOnly = checkHydrateOnly({ nodeType });

    const appContextProps = {
        _id,
        payload,
        distributorId,
        nodeType,
        type,
        outputType,
        renderables
    };

    const getBanner = Banner({
        customFields,
        globalContentConfig,
        outputType,
        globalContent
    });

    const {
        goToNextPage,
        loading,
        hasMoreArticles,
        InitialGrid,
        NextResults
    } = useGridPagination({
        getBanner,
        ...globalProviderAcu,
        ...appContextProps
    });

    return (
        <GrillaNotas
            goToNextPage={goToNextPage}
            loading={loading}
            hasMoreArticles={hasMoreArticles}
            InitialGrid={InitialGrid}
            NextResults={NextResults}
            name={globalContent.name}
            hasHydrateOnly={hasHydrateOnly}
        />
    );
};

GrillaNotasFeature.label = 'LN-Acumulado-Grilla-Notas';

GrillaNotasFeature.propTypes = {
    customFields: PropTypes.shape({
        ...buildCustomFieldsForBanners()
    }).isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired,
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
};

export default Consumer(GrillaNotasFeature);
