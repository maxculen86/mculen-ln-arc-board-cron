import React, { Component } from 'react';
import ArticleMain from '../../common/articleTypes/articleMain';
import ArticleDate from '../../common/dateArticle';
import BtnMasNotas from '../botonVerMasNotas';
import Banner from '../../common/banner';
import LoadingIcon from '../../common/loadingIcon';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import config from './bannerPositionsConfig.json';

const CLASS_W_100 = 'w-100-mobile';
//TODO: Este data section hay que cambiarlo por uno generico para cuerpo de acumulado.
const DATA_SECTION = 'CuerpoAcuRecetas';
const CLASS_TRANSPARENCY = 'transparency';
class GrillaNotas extends Component {
    componentDidMount() {
        const { hayMasNotas } = this.props;
        const divGrilla = document.querySelector('.hlp-degrade');
        if (divGrilla && hayMasNotas) {
            const transparencyDiv = document.createElement('div');
            transparencyDiv.classList.add(CLASS_TRANSPARENCY);
            divGrilla.appendChild(transparencyDiv);
            this.setAlturaTransparency();
            window.addEventListener('resize', () => {
                this.setAlturaTransparency();
            });
        }
    }

    componentDidUpdate() {
        const { hayMasNotas } = this.props;
        const transparencyDiv = document.querySelector('.transparency');
        if (!hayMasNotas && transparencyDiv) {
            transparencyDiv.parentElement.removeChild(transparencyDiv);
        } else {
            this.setAlturaTransparency();
        }
    }

    setAlturaTransparency = () => {
        const articlesGrid = document.querySelectorAll(
            '.hlp-degrade article.mod-caja-nota'
        );
        const articleGrid = articlesGrid[articlesGrid.length - 1];
        const alturaArticle =
            articleGrid.offsetHeight || articleGrid.clientHeight;
        const transparecyDiv = document.querySelector('.transparency');
        if (transparecyDiv) transparecyDiv.style.height = `${alturaArticle}px`;
    };

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

    onClickHandler = () => {
        this.props.obtenerMasNotas();
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
                return (
                    <>
                        <ArticleMain
                            dataSection={DATA_SECTION}
                            key={i}
                            articleData={a}
                            extraClasses={CLASS_W_100}
                        >
                            {dateComponent}
                        </ArticleMain>
                        {mobileBanner}
                        {tabletBanner}
                    </>
                );
            });
        }
        return (
            <>
                <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
                    {articlesComponents}
                </section>
                {hayMasNotas && (
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

export default WithAcuArticlesData(GrillaNotas, filter, 'notaM');
