import Consumer from 'fusion:consumer';
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticlesAcum from '../articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/bannerRefactor';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import withScreenUtils from '../../../common/hocs/withScreenUtils';
import WithNavigation from '../../common/hocs/WithNavigation';

class GrillaNotas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articlesInBox: [] };
    }

    componentDidMount() {
        const msgHandler = message => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    articlesInBox: prevState.articlesInBox.concat(
                        message.articlesInBox
                    )
                };
            });
            // this.removeEventListener('articlesInBox', msgHandler);
        };
        this.addEventListener('articlesInBox', msgHandler);
    }

    getBanner = index => {
        const position = index + 1;
        const { bannerConfig, hideBanners } = this.props;
        const { banners: termicaShowBanner } = this.props.termicas || {
            banners: true
        };
        const { siteProperties, isAdmin } = this.props;

        return bannerConfig
            .filter(banner => banner.position === position)
            .map(value => {
                const props = {
                    siteProperties,
                    isAdmin,
                    banner: {
                        slotGroup: 'acumulado',
                        selectedSlots: {
                            desktopSlot: value.desktop,
                            mobileSlot: value.mobile,
                            tabletSlot: value.tablet
                        },
                        show: {
                            termicas: termicaShowBanner,
                            collection: !(hideBanners === 'true')
                        }
                    }
                };

                return (
                    <Banner key={Math.floor(Math.random() * 100)} {...props} />
                );
            });
    };

    render() {
        const {
            articles,
            hayMasNotas,
            obtenerMasNotas,
            globalContent,
            loading,
            typeArticle,
            outputType,
            articlesInGlobalProvider
        } = this.props;
        const { articlesInBox } = this.state;

        const articlesInNoCollection = articles.filter(
            art =>
                !articlesInBox.some(artInColl => artInColl._id === art._id) &&
                !articlesInGlobalProvider.some(
                    artInColl => artInColl._id === art._id
                ) &&
                art
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
    articlesInCollection: PropTypes.arrayOf(PropTypes.string),
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    articlesInGlobalProvider: PropTypes.arrayOf(PropTypes.object).isRequired,
    hayMasNotas: PropTypes.number.isRequired,
    obtenerMasNotas: PropTypes.func.isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
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

GrillaNotas.defaultProps = {
    articlesInCollection: []
};

export default WithNavigation(
    withScreenUtils(WithAcuArticlesData(Consumer(GrillaNotas), filter, 'm'))
);
