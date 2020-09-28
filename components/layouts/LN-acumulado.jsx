import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

// import '../../resources/dist/css/ln/base.css';
// import '../../resources/dist/css/ln/layouts/layout.css';
// import '../../resources/dist/css/ln/layouts/grid.css';
// import '../../resources/dist/css/ln/pages/acu.css';
// import '../../resources/dist/css/ln/components/com-ordered.css';
// import '../../resources/dist/css/ln/components/com-unordered.css';
// import '../../resources/dist/css/ln/components/hour.css';
import '../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../private/LN/acumulado/context/globalContextAcu';
import get from '../private/common/utils/get';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';

const pageBuilderSections = [
    'Banner-Megatop',
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Apertura',
    'Links',
    'Notas',
    'Aside'
];

const CLASS_ACU_REVISTA = 'acu-revista';
const revistas = ['ohlala'];

const LNAcumuladoLayout = props => {
    const {
        children: [
            bannerMegatop,
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
    const { style } = globalContent;
    const sectionStyleName =
        style && style.section_style_name ? style.section_style_name : '';
    const classRevista =
        revistas.indexOf(sectionStyleName || '') !== -1
            ? `${CLASS_ACU_REVISTA} ${sectionStyleName}`
            : '';
    const headerDark =
        style && style.headerdark && style.headerdark === 'true'
            ? ' --dark'
            : '';
    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});
    const acumuladoColor = get(globalContent, 'acumuladoColor', {});
    const { id_collection_promo_items: idCollection } = acumuladoGeneral;
    const {
        background_color: backgroundCategory,
        navigation_color_tags: colorTags
    } = acumuladoColor;
    const amp = outputType === 'amp' ? 'amp' : '';
    const megatop = getBannerMegatop(bannerMegatop, outputType, tree, isAdmin);

    // TODO: agregar todas las validaciones de acu color
    const COLOR_CLASS = backgroundCategory || colorTags ? ' --transparent' : '';
    const OPENING_CLASS = idCollection ? '--opening' : '';

    return (
        <GlobalProviderAcu
            acumuladoGeneral={acumuladoGeneral}
            acumuladoColor={acumuladoColor}
        >
            {megatop}
            <div
                id="wrapper"
                className={`acumulado${COLOR_CLASS} ${classRevista} ${OPENING_CLASS} ${amp}`}
            >
                <Header headerDark={headerDark} />
                <main>
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
                        <div className="sidebar__aside hlp-tablet-none">
                            {/* BANNERS, RANKING DE NOTAS */}
                            {aside}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </GlobalProviderAcu>
    );
};

LNAcumuladoLayout.propTypes = {
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string,
            headerdark: PropTypes.string
        }),
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
        })
    }).isRequired
};

LNAcumuladoLayout.sections = pageBuilderSections;

export default Consumer(LNAcumuladoLayout);
