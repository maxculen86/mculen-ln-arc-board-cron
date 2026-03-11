import React from 'react';
import Static from 'fusion:static';
import BtnMasNotas from '../botonVerMasNotas';
import LoadingIcon from '../../common/loadingIcon';

function GrillaNotas(props) {
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
}

export default GrillaNotas;
