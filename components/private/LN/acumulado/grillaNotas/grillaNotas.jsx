import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import TransparencyDiv from './transparencyDiv';
import ArticlesAcum from '../articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/banner';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import config from './bannerPositionsConfig.json';

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

    getBanner = (device, index) => {
        const position = index + 1;
        let bannerPosition = {};
        let selectedSlots = {};
        if (device === 'mobile') {
            bannerPosition = config.mobile.find(el => el.position === position);
            selectedSlots = bannerPosition
                ? { mobileSlot: bannerPosition.banner }
                : {};
        } else {
            bannerPosition = config.tablet.find(el => el.position === position);
            selectedSlots = bannerPosition
                ? { tabletSlot: bannerPosition.banner }
                : {};
        }
        if (bannerPosition) {
            const { siteProperties, isAdmin } = this.props;
            return (
                <Banner
                    siteProperties={siteProperties}
                    slotGroup="acumulado"
                    selectedSlots={selectedSlots}
                    isAdmin={isAdmin}
                    sticky={false}
                />
            );
        }
        return undefined;
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
    }).isRequired
};

// GrillaNotas.defaultProps = {
//     articles: [],
//     hayMasNotas: 0,
//     obtenerMasNotas: () => {},
//     loading: false,
//     isAdmin: false
// };

export default WithAcuArticlesData(GrillaNotas, filter, 'notaM');
