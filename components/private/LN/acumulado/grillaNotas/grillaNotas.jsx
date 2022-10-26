/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import BtnMasNotas from '../botonVerMasNotas';
import LoadingIcon from '../../common/loadingIcon';
import StaticContent from '../../../common/staticContent';

const GrillaNotas = props => {
    const {
        InitialGrid,
        NextResults,
        hasMoreArticles,
        loading = false,
        goToNextPage,
        name = '',
        outputType = 'default',
        hasHydrateOnly = false
    } = props;

    return (
        <>
            <div className={hasMoreArticles ? 'hlp-degrade' : ''}>
                {hasHydrateOnly ? (
                    <StaticContent>{InitialGrid}</StaticContent>
                ) : (
                    InitialGrid
                )}
                {NextResults}
            </div>
            {outputType !== 'amp' && hasMoreArticles && (
                <section className="row">
                    <BtnMasNotas
                        onClickHandler={goToNextPage}
                        name={name}
                        loadingIcon={<LoadingIcon />}
                        loading={loading}
                    />
                </section>
            )}
        </>
    );
};

GrillaNotas.propTypes = {
    InitialGrid: PropTypes.node,
    NextResults: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
    hasMoreArticles: PropTypes.bool,
    loading: PropTypes.bool,
    goToNextPage: PropTypes.func,
    name: PropTypes.string,
    outputType: PropTypes.string,
    hasHydrateOnly: PropTypes.bool
};

export default GrillaNotas;
