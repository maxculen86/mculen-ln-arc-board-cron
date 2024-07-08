/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import BtnMasNotas from '../botonVerMasNotas';
import LoadingIcon from '../../common/loadingIcon';
import Static from 'fusion:static';

const GrillaNotas = props => {
    const {
        InitialGrid,
        NextResults,
        hasMoreArticles,
        loading = false,
        goToNextPage,
        name = '',
        featureId
    } = props;

    return (
        <>
            <div className={hasMoreArticles ? 'hlp-degrade' : ''}>
                <Static id={featureId}>{InitialGrid}</Static>
                {NextResults}
            </div>
            {hasMoreArticles && (
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
    outputType: PropTypes.string
};

export default GrillaNotas;
