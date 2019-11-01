import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import TransparencyDiv from './transparencyDiv';
import ArticlesAcum from './articlesAcum';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/banner';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import config from './bannerPositionsConfig.json';

// const CLASS_W_100 = 'w-100-mobile';
class GrillaNotas extends Component {
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

    // TODO: Esta función no esta siendo usada por nadie considerar eliminar
    /* getArticleClasses = article => {
        let extraClasses = `${CLASS_W_100} `;
        const {
            taxonomy: {
                primary_section: {
                    additional_properties: {
                        original: { style }
                    }
                }
            }
        } = article;
        if (style && style.section_style_name)
            extraClasses += style.section_style_name;
        return extraClasses;
    }; */

    render() {
        const {
            articles,
            hayMasNotas,
            obtenerMasNotas,
            globalContent,
            loading
        } = this.props;

        return (
            <>
                <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
                    <ArticlesAcum
                        getBanner={this.getBanner}
                        articles={articles}
                    />
                    {hayMasNotas > 0 && <TransparencyDiv />}
                </section>
                {hayMasNotas > 0 && (
                    <section className="row">
                        <BtnMasNotas
                            onClickHandler={obtenerMasNotas}
                            name={globalContent.name}
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
