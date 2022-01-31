import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer';
import GlobalProvider from '../../private/common/context/globalContext';
import PwaModals from '../../private/LN/common/pwaModals';
import '../../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../../private/LN/acumulado/context/globalContextAcu';
import get from '../../private/common/utils/get';
import getBannerMegatop from '../../private/common/utils/getBannerMegatop';
import LoadBanners from '../../private/common/banners/LoadBanners';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';

const pageBuilderSections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Apertura',
    'Links',
    'Notas',
    'Aside'
];

const formatText = str => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

const CLASS_ACU_REVISTA = 'acu-revista';
const revistas = ['ohlala'];
const sections = ['economia'];

const LNHome = props => {
    const {
        children: [
            bannerMegatop,
            stickyMobile,
            preApertura,
            breadcrumbTitulo,
            apertura,
            links,
            notas,
            aside
        ],
        globalContent,
        outputType,
        tree,
        isAdmin
    } = props;
    const { style, name = '' } = globalContent;
    const sectionStyleName =
        style && style.section_style_name ? style.section_style_name : '';
    const classRevista =
        revistas.indexOf(sectionStyleName || '') !== -1
            ? `${CLASS_ACU_REVISTA} ${sectionStyleName}`
            : '';
    const sectionClass = sections.find(sec => sec === formatText(name)) || '';
    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});
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
    const idCollectionApertura = get(
        globalContent,
        'acumuladoGeneral.id_collection_promo_items'
    );
    const idCollectionsInPage = get(
        globalContent,
        'acumuladoGeneral.colecciones',
        []
    );
    const OPENING_CLASS = idCollectionApertura ? '--opening' : '';

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
                                {/* NOTAS */}
                                {notas}
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* BANNERS, RANKING DE NOTAS */}
                                {aside}
                            </div>
                        </div>
                    </main>
                    <StaticValidation id="StaticFooter">
                        <Footer />
                    </StaticValidation>
                </div>
                <LoadBanners />
                <PwaModals />
            </GlobalProviderAcu>
        </GlobalProvider>
    );
};

LNHome.propTypes = {
    outputType: PropTypes.string.isRequired,
    // eslint-disable-next-line react/require-default-props
    tree: PropTypes.shape(PropTypes.arrayOf(PropTypes.node)),
    // eslint-disable-next-line react/require-default-props
    isAdmin: PropTypes.bool,
    ...homeLayoutsPropTypes
};

LNHome.sections = pageBuilderSections;

export default Consumer(LNHome);
