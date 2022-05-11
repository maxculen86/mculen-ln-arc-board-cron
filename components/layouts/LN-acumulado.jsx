/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../private/common/staticValidation';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import GlobalProvider from '../private/common/context/globalContext';
import AnexoDefault from '../features/LN-common/anexo/default';

import '../../resources/dist/css/ln/pages/acumulado.css';
import '../../resources/dist/css/ln/pages/lotteries.css';
import '../../resources/dist/css/ln/pages/wiki-tags.css';

import { GlobalProviderAcu } from '../private/LN/acumulado/context/globalContextAcu';
import get from '../private/common/utils/get';
import getConfigForAnexo from '../private/common/utils/getConfigForAnexo';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import { formatText } from '../private/common/utils/sectionUtils';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import PwaModals from '../private/LN/common/pwaModals';

const pageBuilderSections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Apertura',
    'Links',
    'Notas',
    'Aside',
    'Bottom'
];

const CLASS_ACU_REVISTA = '';
const revistas = [
    'ohlala',
    'lugares',
    'hola',
    'living',
    'brando',
    'jardin',
    'rolling-stone'
];
const sections = ['economia', 'deportes', 'opinion'];

const acumToSearchAperturaChain = ['tags'];

const LNAcumuladoLayout = props => {
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
        outputType,
        tree,
        isAdmin,
        renderables
    } = props;

    const { style, name = '', node_type: nodeType } = globalContent || {};

    const sectionStyleName =
        style && style.section_style_name ? style.section_style_name : '';

    const classRevista =
        revistas.indexOf(sectionStyleName || '') !== -1
            ? `${CLASS_ACU_REVISTA} ${sectionStyleName}`
            : '';

    const sectionClass = sections.find(sec => sec === formatText(name)) || '';
    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});

    const {
        anexosuperior: anexoSuperior = '',
        anexoinferior: anexoInferior = '',
        collectionForTag = ''
    } = acumuladoGeneral;

    const anexoSuperiorConfig = getConfigForAnexo(anexoSuperior);

    const anexoInferiorConfig = getConfigForAnexo(anexoInferior);

    const acumuladoColor = get(globalContent, 'acumuladoColor', {});

    const {
        background_color: backgroundCategory,
        navigation_color_tags: colorTags,
        header_class_name: headerDark
    } = acumuladoColor;

    const amp = outputType === 'amp' ? 'amp' : '';
    const megatop = getBannerMegatop(bannerMegatop, outputType, tree, isAdmin);
    // TODO: agregar todas las validaciones de acu color
    const COLOR_CLASS = backgroundCategory || colorTags ? '--color' : '';
    const HEADER_BACKGROUND = headerDark === 'true' ? ' --transparent' : '';

    const chainCollection =
        acumToSearchAperturaChain.includes(nodeType) &&
        renderables.find(
            ren =>
                ren.collection === 'chains' && ren.type === 'Ln_Caja_Collection'
        );

    const idCollectionApertura =
        nodeType === 'tags'
            ? collectionForTag
            : get(
                  globalContent,
                  'acumuladoGeneral.id_collection_promo_items',
                  get(chainCollection, 'props.customFields.idCollection')
              );

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
    return (
        <GlobalProvider>
            <GlobalProviderAcu
                acumuladoGeneral={acumuladoGeneral}
                acumuladoColor={acumuladoColor}
                idCollectionsInPage={idCollectionsInPage}
                idCollectionApertura={idCollectionApertura}
            >
                {megatop}
                <div
                    id="wrapper"
                    className={`acumulado ${HEADER_BACKGROUND} ${COLOR_CLASS} ${classRevista} ${sectionClass} ${OPENING_CLASS} ${amp}`}
                >
                    <Header />
                    <main id="content">
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
                                            height:
                                                anexoSuperiorConfig.anexoHeight,
                                            url: anexoSuperiorConfig.anexoUrl
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className="lay">
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
                                            height:
                                                anexoInferiorConfig.anexoHeight,
                                            url: anexoInferiorConfig.anexoUrl
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
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
                    <StaticValidation id="StaticFooter" htmlOnly persistent>
                        <Footer />
                    </StaticValidation>
                </div>
                <LoadBannersSSR />
                <PwaModals />
            </GlobalProviderAcu>
        </GlobalProvider>
    );
};

LNAcumuladoLayout.propTypes = {
    children: PropTypes.node,
    outputType: PropTypes.string,
    tree: PropTypes.shape(PropTypes.arrayOf(PropTypes.node)),
    isAdmin: PropTypes.bool,
    renderables: PropTypes.arrayOf(PropTypes.node),
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string,
            headerdark: PropTypes.string
        }),
        name: PropTypes.string,
        node_type: PropTypes.string,
        acumuladoGeneral: PropTypes.shape({
            tipo_acumulado: PropTypes.string,
            hierarchy_navigation: PropTypes.string,
            hide_banner: PropTypes.string,
            cantidad_notas: PropTypes.string,
            id_collection_promo_items: PropTypes.string
        }),
        acumuladoColor: PropTypes.shape({
            header_class_name: PropTypes.string,
            background_color: PropTypes.string,
            navigation_color: PropTypes.string,
            navigation_color_tags: PropTypes.string,
            id_logo_image: PropTypes.string
        }),
        articlesInCollection: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string
            })
        )
    })
};

LNAcumuladoLayout.sections = pageBuilderSections;

export default Consumer(LNAcumuladoLayout);
