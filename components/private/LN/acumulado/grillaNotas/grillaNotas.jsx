import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import TransparencyDiv from './transparencyDiv';
import ArticleMain from '../../common/articleTypes/articleMain';
import ArticleDate from '../../common/dateArticle';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/banner';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import config from './bannerPositionsConfig.json';

const CLASS_W_100 = 'w-100-mobile';
const DATA_SECTION = 'CuerpoAcu';
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

    getArticleClasses = article => {
        let extraClasses = `${CLASS_W_100} `;
        if (
            article.taxonomy.primary_section.additional_properties.original &&
            article.taxonomy.primary_section.additional_properties.original
                .style &&
            article.taxonomy.primary_section.additional_properties.original
                .style.section_style_name
        )
            extraClasses +=
                article.taxonomy.primary_section.additional_properties.original
                    .style.section_style_name;
        return extraClasses;
    };

    render() {
        let articlesComponents = [];
        const {
            articles,
            hayMasNotas,
            obtenerMasNotas,
            globalContent,
            loading
        } = this.props;
        if (articles && articles.length) {
            articlesComponents = articles.map((a, i) => {
                const mobileBanner = this.getBanner('mobile', i);
                const tabletBanner = this.getBanner('tablet', i);
                const dateComponent = (
                    <ArticleDate display_date={a.display_date} />
                );
                const extraClasses = this.getArticleClasses(a);
                return (
                    <>
                        <ArticleMain
                            dataSection={DATA_SECTION}
                            key={a._id}
                            articleData={a}
                            extraClasses={extraClasses}
                        >
                            {dateComponent}
                        </ArticleMain>
                        {mobileBanner}
                        {tabletBanner}
                    </>
                );
            });
        }
        const hayMasNotasBool = hayMasNotas > 0;
        return (
            <>
                <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
                    {articlesComponents}
                    {hayMasNotasBool && <TransparencyDiv />}
                </section>
                {hayMasNotasBool && (
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
    articles: PropTypes.arrayOf(PropTypes.object),
    hayMasNotas: PropTypes.number,
    obtenerMasNotas: PropTypes.func,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    loading: PropTypes.bool,
    isAdmin: PropTypes.bool,
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
