/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import { cx } from '@ln/ds-cva';
import Header from '../../features/LN-10-global/header/default';
import Footer from '../../private/LN10/footer';
import GlobalProvider from '../../private/common/context/globalContext';
import AnexoDefault from '../../features/LN-common/anexo/default';
import isAllowedSection from '../../private/LN/common/utils/isAllowedSection';
import { GlobalProviderAcu } from '../../private/LN/acumulado/context/globalContextAcu';
import get from '../../private/common/utils/get';
import getConfigForAnexo from '../../private/common/utils/getConfigForAnexo';
import AdsStrategySelector from '../../features/LN/common/adsManager/components/adsStrategySelector';
import PwaModal from '../../features/LN-10-global/pwaModal/default';
import { getIdCollectionFromGC } from '../../private/common/utils/preloadHelper';
import pageBuilderSections from '../config/LN-Acumulado-PageBuilder.config.json';
import InitControlGroup from '../helpers/initCtrlGrp';
import Toasts from '../../features/LN-10-global/common/toasts/default';
import { CLASS_ACU_REVISTA, revistas, getSectionClassName } from './helpers';
import '../../../resources/dist/css/ln/pages/acumulado.css';
import '../../../resources/dist/css/ln/pages/lotteries.css';
import '../../../resources/dist/css/ln/pages/wiki-tags.css';

const acumToSearchAperturaChain = ['tags'];

function LNAcumuladoLayout(props) {
    const {
        children: [
            bannerMegatop,
            stickyMobile,
            preApertura,
            breadcrumbTitulo,
            apertura,
            links,
            notas,
            aside,
            bottom
        ],
        globalContent,
        renderables,
        requestUri = '',
        layout
    } = props;

    const { style, node_type: nodeType } = globalContent || {};

    const sectionClass = getSectionClassName(requestUri);

    const sectionStyleName = get(style, 'section_style_name', '');

    const classRevista =
        revistas.indexOf(sectionStyleName || '') !== -1
            ? `${CLASS_ACU_REVISTA} ${sectionStyleName}`
            : '';

    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});

    const {
        anexosuperior: anexoSuperior = '',
        anexoinferior: anexoInferior = ''
    } = acumuladoGeneral;

    const anexoSuperiorConfig = getConfigForAnexo(anexoSuperior);

    const anexoInferiorConfig = getConfigForAnexo(anexoInferior);

    const acumuladoColor = get(globalContent, 'acumuladoColor', {});

    const {
        background_color: backgroundCategory,
        navigation_color_tags: colorTags
    } = acumuladoColor;

    const COLOR_CLASS = backgroundCategory || colorTags ? '--color' : '';

    const chainCollection =
        acumToSearchAperturaChain.includes(nodeType) &&
        renderables.find(
            ren =>
                ren.collection === 'chains' && ren.type === 'Ln_Caja_Collection'
        );

    const chainCollectionId = get(
        chainCollection,
        'props.customFields.idCollection'
    );

    const idCollectionApertura = getIdCollectionFromGC({
        globalContent,
        defaultValue: chainCollectionId
    });

    const idCollectionsInPage = get(
        globalContent,
        'acumuladoGeneral.colecciones',
        []
    );

    const OPENING_CLASS = get(
        globalContent,
        'acumuladoGeneral.id_collection_promo_items',
        false
    )
        ? '--opening'
        : '';

    const classNameWrapper = cx(
        'wrapper',
        '--top-fixed',
        'acumulado',
        COLOR_CLASS,
        classRevista,
        sectionClass,
        OPENING_CLASS
    );

    const listOfAllowedSection = [
        { section: '/revista-hola', pageLayout: 'LN-acumulado' },
        { section: '/revista-lugares', pageLayout: 'LN-acumulado' },
        { section: '/videos', pageLayout: 'LN-acumulado' }
    ];
    const classNameMain = cx({
        '--header-fixed-margin': !isAllowedSection({
            globalContent,
            listOfAllowedSection,
            layout
        })
    });

    return (
        <GlobalProvider>
            <GlobalProviderAcu
                acumuladoGeneral={acumuladoGeneral}
                acumuladoColor={acumuladoColor}
                idCollectionsInPage={idCollectionsInPage}
                idCollectionApertura={idCollectionApertura}
            >
                {bannerMegatop}
                <div id="wrapper" className={classNameWrapper}>
                    <Header />
                    <main id="content" className={classNameMain}>
                        {stickyMobile}
                        <div
                            className="row --top"
                            style={{ backgroundColor: backgroundCategory }}
                        >
                            <div className="lay">
                                {/* BANNER y ANEXO */}
                                {preApertura}
                                {/* TITULO/LOGO Y CATEGORIAS */}
                                {breadcrumbTitulo}
                                {/* ANEXO SUPERIOR */}
                                {anexoSuperiorConfig.anexoUrl !== '' ? (
                                    <AnexoDefault
                                        id="superior"
                                        customFields={{
                                            heightDesktop:
                                                anexoSuperiorConfig.anexoHeight,
                                            heightTablet:
                                                anexoSuperiorConfig.anexoHeight,
                                            heightMobile:
                                                anexoSuperiorConfig.anexoHeight,
                                            url: anexoSuperiorConfig.anexoUrl,
                                            hideTitle: true
                                        }}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div
                            className={cx('lay', {
                                'mt--118': OPENING_CLASS
                            })}
                        >
                            {/* APERTURA: CAJA DE DOS COLUMNAS */}
                            {apertura}
                            {/* LISTA DE TAGS */}
                            {links}
                        </div>
                        <div id="content-main" className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                {/* ANEXO INFERIOR */}
                                {anexoInferiorConfig.anexoUrl !== '' ? (
                                    <AnexoDefault
                                        id="inferior"
                                        customFields={{
                                            heightDesktop:
                                                anexoInferiorConfig.anexoHeight,
                                            heightTablet:
                                                anexoInferiorConfig.anexoHeight,
                                            heightMobile:
                                                anexoInferiorConfig.anexoHeight,
                                            url: anexoInferiorConfig.anexoUrl,
                                            hideTitle: true
                                        }}
                                    />
                                ) : null}
                                {/* NOTAS */}
                                {notas}
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* BANNERS, RANKING DE NOTAS */}
                                {aside}
                            </div>
                        </div>
                        <div className="lay-sidebar">
                            <div className="sidebar__main">
                                {/* Bottom */}
                                {bottom}
                            </div>
                        </div>
                    </main>
                    <div className="footer-container --no-app">
                        <Footer />
                    </div>
                </div>
                <Toasts />
                <AdsStrategySelector />
                <PwaModal />
                <InitControlGroup />
            </GlobalProviderAcu>
        </GlobalProvider>
    );
}

LNAcumuladoLayout.sections = pageBuilderSections;

export default Consumer(LNAcumuladoLayout);
