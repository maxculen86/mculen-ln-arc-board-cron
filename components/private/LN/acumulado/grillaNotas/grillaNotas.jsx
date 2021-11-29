import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import ArticlesAcum from '../articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import {
    getBannerConfiguration,
    suffixDevice
} from '../../common/utils/bannerHelper';
import DivBannerAMP from '../../../common/banners/DivBannerAMP';
import DivBannerSSR from '../../../common/banners/DivBannerSSR';

const GrillaNotas = props => {
    const {
        articles = [],
        hayMasNotas,
        obtenerMasNotas,
        globalContent,
        loading,
        typeArticle,
        outputType,
        idsArticlesToExclude = []
    } = props;

    const getBanner = index => {
        const position = index + 1;
        const { bannerConfig = [], globalContentConfig } = props;

        return bannerConfig
            .filter(banner => banner.position === position)
            .map(value => {
                const slotId =
                    value.desktop || value.mobile || value.tablet || '';

                const bannerConfiguration = getBannerConfiguration(
                    globalContent,
                    { group: 'acumulado' },
                    globalContentConfig,
                    {
                        device: Object.keys(suffixDevice).find(key =>
                            slotId.includes(suffixDevice[key])
                        ),
                        slotId
                    }
                );

                if (
                    !bannerConfiguration ||
                    (outputType === 'amp' && !slotId.includes('_amp')) ||
                    (outputType === 'default' && slotId.includes('_amp'))
                )
                    return <></>;

                return (
                    <Static id={slotId}>
                        {outputType === 'amp' && slotId.includes('_amp') ? (
                            <DivBannerAMP
                                bannerConfiguration={bannerConfiguration}
                            />
                        ) : (
                            <DivBannerSSR
                                bannerConfiguration={bannerConfiguration}
                            />
                        )}
                    </Static>
                );
            });
    };

    const articlesInNoCollection = articles.filter(
        art => !idsArticlesToExclude.some(idArt => idArt === art._id)
    );

    return (
        <>
            <ArticlesAcum
                getBanner={getBanner}
                articles={articlesInNoCollection}
                typeArticle={typeArticle}
                classCondition={hayMasNotas > 0 && 'hlp-degrade'}
                outputType={outputType}
            />

            {outputType !== 'amp' && hayMasNotas > 0 && (
                <section className="row">
                    <BtnMasNotas
                        onClickHandler={obtenerMasNotas}
                        name={globalContent.name || ''}
                        loadingIcon={<LoadingIcon />}
                        loading={loading}
                    />
                </section>
            )}
        </>
    );
};

GrillaNotas.propTypes = {
    typeArticle: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    idsArticlesToExclude: PropTypes.arrayOf(PropTypes.string).isRequired,
    hayMasNotas: PropTypes.number.isRequired,
    obtenerMasNotas: PropTypes.func.isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    bannerConfig: PropTypes.arrayOf(
        PropTypes.shape({
            background: PropTypes.bool,
            position: PropTypes.number,
            sticky: PropTypes.bool,
            tablet: PropTypes.string
        })
    ).isRequired
};

export default WithAcuArticlesData(Consumer(GrillaNotas), filter, 'm');
