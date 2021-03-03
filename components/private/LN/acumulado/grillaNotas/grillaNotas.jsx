import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import ArticlesAcum from '../articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/bannerRefactor';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import withScreenUtils from '../../../common/hocs/withScreenUtils';
import WithNavigation from '../../common/hocs/WithNavigation';
import WithRelatedImages from '../../common/hocs/WithRelatedImages';
import get from '../../../common/utils/get';
import ConfigBuilder from '../../common/bannerRefactor/builder';
import {
    getSlotForDevice,
    isPrimarySectionInBannerSegments
} from '../../common/bannerRefactor/utils';
import { slotsConfig } from '../../common/bannerRefactor/config';
import { GlobalContext } from '../../../common/context/globalContext';

class GrillaNotas extends React.Component {
    getBanner = index => {
        const position = index + 1;
        const {
            bannerConfig,
            hideBanners,
            globalContentConfig,
            arcSite,
            termicas,
            screenUtils: { device }
        } = this.props;

        const gc = useContext(GlobalContext);
        const siteService = get(gc, 'state.siteService', {});

        const bannersSiteConfig = get(siteService, 'banners');
        const adserver = get(siteService, 'adserver', []);
        const segments = adserver.map(segment => segment.value);
        const primarySection = get(globalContentConfig, 'query.id');
        const site = arcSite || 'la-nacion-ar';
        /**
         * ! extraer siguiente linea desde el contexto global
         */
        const dfpId = get(getProperties(site), 'bannerConfig.dfp_id');

        return bannerConfig
            .filter(banner => banner.position === position)
            .map(value => {
                const slots = [
                    { name: 'desktop', slot: value.desktop },
                    { name: 'mobile', slot: value.mobile },
                    { name: 'tablet', slot: value.tablet }
                ];
                const slotId = getSlotForDevice(device)(slots);

                if (!slotId) return <></>;

                const config = slotsConfig.acumulado[slotId];
                if (!config) return <></>;

                // TODO: Mover esta lógica a un utilitario ?)
                const configBuilder = new ConfigBuilder();
                configBuilder.init({
                    ...config,
                    slotId,
                    dfpId,
                    slotGroup: 'acumulado',
                    show: {
                        termicas,
                        collection: !(hideBanners === 'true')
                    }
                });

                const [present, section] = isPrimarySectionInBannerSegments(
                    primarySection
                )(segments);
                if (present) {
                    configBuilder.segmentAdUnit(section, device);
                }

                if (bannersSiteConfig)
                    configBuilder.setDimensionsFromSiteService(
                        bannersSiteConfig,
                        'acumulado',
                        slotId
                    );

                return <Banner key={slotId} config={configBuilder.get()} />;
            });
    };

    render() {
        const {
            articles = [],
            hayMasNotas,
            obtenerMasNotas,
            globalContent,
            loading,
            typeArticle,
            outputType,
            idsArticlesToExclude
        } = this.props;

        const articlesInNoCollection = articles.filter(
            art => !idsArticlesToExclude.some(idArt => idArt === art._id)
        );

        return (
            <>
                <ArticlesAcum
                    getBanner={this.getBanner}
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
    }
}

GrillaNotas.propTypes = {
    typeArticle: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    hideBanners: PropTypes.string.isRequired,
    termicas: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
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
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }).isRequired,
    bannerConfig: PropTypes.shape({
        background: PropTypes.bool,
        position: PropTypes.number,
        sticky: PropTypes.bool,
        tablet: PropTypes.string
    }).isRequired
};

export default WithNavigation(
    withScreenUtils(
        WithAcuArticlesData(
            WithRelatedImages(Consumer(GrillaNotas)),
            filter,
            'm'
        )
    )
);
