/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';

import BtnMasNotas from '../../../private/LN/acumulado/botonVerMasNotas';
import Banner from '../../../private/LN/acumulado/grillaNotas/banner';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import { buildCustomFieldsForBanners, getBannerConfig } from './_helpers';
import StaticContent from '../../../private/common/staticContent';

import useGlobalProviderAcu from '../../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import useGridPagination from '../../../private/LN/common/hooks/useGridPagination';

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
        },
        outputType,
        renderables
    } = useAppContext();

    const appContextProps = {
        _id,
        payload,
        distributorId,
        nodeType,
        type,
        outputType,
        renderables
    };

    const bannerConfig = getBannerConfig(customFields);

    const bannerProps = {
        bannerConfig,
        globalContentConfig,
        outputType,
        globalContent
    };

    const getBanner = Banner(bannerProps);

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
        <>
            <div className={hasMoreArticles ? 'hlp-degrade' : ''}>
                <StaticContent>{InitialGrid}</StaticContent>
                {NextResults}
            </div>
            {outputType !== 'amp' && hasMoreArticles && (
                <section className="row">
                    <BtnMasNotas
                        onClickHandler={goToNextPage}
                        name={globalContent.name || ''}
                        loadingIcon={<LoadingIcon />}
                        loading={loading}
                    />
                </section>
            )}
        </>
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
