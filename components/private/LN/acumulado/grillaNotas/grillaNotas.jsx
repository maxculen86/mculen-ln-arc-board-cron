import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import ArticlesAcum from '../articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/banner';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import config from './bannerPositionsConfig.json';

class GrillaNotas extends Component {
    constructor(props) {
        super(props);

        this.sectionGrillasNotasRef = React.createRef();
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
            typeArticle,
            outputType,
            articlesInCollection = []
        } = this.props;

        const articlesInNoCollection = articles.filter(art => {
            return !articlesInCollection.includes(art._id);
        });

        return (
            <>
                <ArticlesAcum
                    getBanner={this.getBanner}
                    articles={articlesInNoCollection}
                    typeArticle={typeArticle}
                    classCondition={hayMasNotas > 0 && 'hlp-degrade'}
                    outputType={outputType}
                />

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
    outputType: PropTypes.string.isRequired,
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
