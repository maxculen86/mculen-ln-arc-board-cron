import React, { useState, useEffect } from 'react';
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

const pageBuilderSections = [
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Apertura',
    'Links',
    'Notas',
    'Aside'
];

const CLASS_ACU_REVISTA = 'acu-revista';
const revistas = ['ohlala'];
console.log('** LN-ACUMULADO');

const LNAcumuladoLayout = props => {
    console.log('****LNAcumuladoLayout');
    const {
        children: [
            preApertura,
            breadcrumbTitulo,
            apertura,
            links,
            notas,
            aside
        ],
        globalContent,
        outputType
    } = props;
    const [classRevista, setClassRevista] = useState('');
    const [headerDark, setHeaderDark] = useState('');
    const amp = outputType === 'amp' ? 'amp' : '';

    useEffect(() => {
        const { style } = globalContent;
        const sectionStyleName =
            style && style.section_style_name ? style.section_style_name : '';

        revistas.indexOf(sectionStyleName || '') !== -1 &&
            setClassRevista(`${CLASS_ACU_REVISTA} ${sectionStyleName}`);

        setHeaderDark(
            style && style.headerdark && style.headerdark === 'true'
                ? ' --dark'
                : ''
        );
    }, [globalContent]);

    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});
    const acumuladoColor = get(globalContent, 'acumuladoColor', {});
    const backgroundCategory = get(
        globalContent,
        'acumuladoColor.background_color',
        null
    );
    const colorTags = get(
        globalContent,
        'acumuladoColor.navigation_color_tags',
        null
    );

    // TODO: agregar todas las validaciones de acu color
    const COLOR_CLASS = backgroundCategory || colorTags ? ' --color' : '';

    return (
        <GlobalProviderAcu
            acumuladoGeneral={acumuladoGeneral}
            acumuladoColor={acumuladoColor}
        >
            <div
                id="wrapper"
                className={`acumulado${COLOR_CLASS} ${classRevista} ${amp}`}
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
