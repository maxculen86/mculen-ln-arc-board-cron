import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import TransparencyDiv from './transparencyDiv';
import ArticlesAcum from '../articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/bannerRefactor';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import config from './bannerPositionsConfig.json';
import withScreenUtils from '../../../common/hocs/withScreenUtils';

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

        console.log(
            '### PROPS BANNER GRILLA COMPONENT: ',
            this.props.bannerConfig
        );
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
        const { bannerConfig } = this.props;
        const { siteProperties, isAdmin } = this.props;

        return bannerConfig
            .filter(banner => banner.position === position)
            .map((value, index) => {
                const props = {
                    siteProperties,
                    isAdmin,
                    banner: {
                        slotGroup: 'acumulado',
                        selectedSlots: {
                            desktopSlot: value.desktop,
                            mobileSlot: value.mobile,
                            tabletSlot: value.tablet
                        }
                    }
                };
                return (
                    <>
                        <div>BANNER AQUIIII</div>
                        <Banner key={index} {...props} />
                    </>
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
            typeArticle
        } = this.props;
        const { alturaArticle } = this.state;
        const _typeArticle = !typeArticle ? 'ArticleMain' : typeArticle;

        return (
            <>
                <section
                    className={classNamesArticle[_typeArticle]}
                    ref={this.sectionGrillasNotasRef}
                >
                    <ArticlesAcum
                        getBanner={this.getBanner}
                        articles={articles}
                        typeArticle={_typeArticle}
                    />
                    {hayMasNotas > 0 && (
                        <TransparencyDiv size={alturaArticle} />
                    )}
                </section>
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

export default withScreenUtils(
    WithAcuArticlesData(GrillaNotas, filter, 'notaM')
);
