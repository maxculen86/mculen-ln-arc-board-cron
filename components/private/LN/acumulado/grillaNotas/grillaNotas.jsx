import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import TransparencyDiv from './transparencyDiv';
import ArticlesAcum from '../articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/bannerRefactor';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import withScreenUtils from '../../../common/hocs/withScreenUtils';
import WithNavigation from '../../common/hocs/WithNavigation';
// import useGlobalProviderAcu from '../../acumulado/hooks/useGlobalProviderAcu';

const classNamesArticle = {
    ArticleMain: 'row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade',
    ArticleTimeLine: 'breaking-news hlp-degrade'
};

class GrillaNotas extends Component {
    constructor(props) {
        super(props);

        this.state = { alturaArticle: 0 };

        this.sectionGrillasNotasRef = React.createRef();

        this.setAlturaArticle = this.setAlturaArticle.bind(this);
    }

    componentDidMount() {
        this.setAlturaArticle();
        window.addEventListener('resize', this.setAlturaArticle);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setAlturaArticle);
    }

    setAlturaArticle() {
        const { childNodes } = this.sectionGrillasNotasRef.current;
        const articlesGrid =
            childNodes &&
            Object.values(childNodes).filter(el => el.localName === 'article');

        if (articlesGrid && articlesGrid.length > 0) {
            const articleGrid = articlesGrid[articlesGrid.length - 1];
            const alturaArticle =
                articleGrid.offsetHeight || articleGrid.clientHeight;
            this.setState({ ...alturaArticle });
        }
    }

    getBanner = index => {
        const position = index + 1;
        const { bannerConfig, globalContent } = this.props;
        const {
            acumuladoGeneral: { hide_banner: hideBanners }
        } = globalContent;
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
            articlesInCollection = []
        } = this.props;
        // const { alturaArticle } = this.state;
        // const _typeArticle = !typeArticle ? 'ArticleMain' : typeArticle;
        const articlesInNoCollection = articles.filter(art => {
            return !articlesInCollection.includes(art._id);
        });

        return (
            <>
                {/*
                <section
                    className={classNamesArticle[_typeArticle]}
                    ref={this.sectionGrillasNotasRef}
                >
                */}
                <ArticlesAcum
                    getBanner={this.getBanner}
                    articles={articlesInNoCollection}
                    typeArticle={typeArticle}
                    classCondition={hayMasNotas > 0 && 'hlp-degrade'}
                />
                {/*
                hayMasNotas > 0 && (
                    <TransparencyDiv size={alturaArticle} />
                )
                */}
                {/*
                } </section>
                */}

                {hayMasNotas > 0 && (
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
    articlesInCollection: PropTypes.arrayOf(PropTypes.string),
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
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

// GrillaNotas.defaultProps = {
//     articles: [],
//     hayMasNotas: 0,
//     obtenerMasNotas: () => {},
//     loading: false,
//     isAdmin: false
// };

export default WithNavigation(
    withScreenUtils(WithAcuArticlesData(GrillaNotas, filter, 'notaM'))
);
