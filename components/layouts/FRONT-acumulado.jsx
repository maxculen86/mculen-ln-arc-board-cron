import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

import ModCategory from '../private/common/mod-category';
import ModArticle from '../private/common/mod-article';
import ModRowGap from '../private/common/mod-rowgap';

import '../../resources/dist/css/ln/base.css'; // chequear para sacar base porque se repite estilo
import '../../resources/dist/css/ln/base/reset.css';
import '../../resources/dist/css/ln/base/types.css';
import '../../resources/dist/css/ln/pages/recipe.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/modules/header-desktop.css';
import '../../resources/dist/css/ln/modules/header-mobile.css';

// TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
// EL COMPONENTE Y EN OTROS NO
import '../../resources/dist/css/ln/components/button.css';
import '../../resources/dist/css/ln/components/date.css';
import '../../resources/dist/css/ln/components/tag.css';
import '../../resources/dist/css/ln/components/author.css';
import '../../resources/dist/css/ln/components/lead.css';
import '../../resources/dist/css/ln/components/com-ordered.css';
import '../../resources/dist/css/ln/components/com-unordered.css';
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';
import '../../resources/dist/css/ln/components/blockquote.css';
import '../../resources/dist/css/ln/components/text.css';
import '../../resources/dist/css/ln/components/link.css';
import '../../resources/dist/css/ln/components/subtitle.css';
import '../../resources/dist/css/ln/components/slider.css';
import '../../resources/dist/css/ln/components/epigraph.css';
import '../../resources/dist/css/ln/components/appointment.css';
import '../../resources/dist/css/ln/components/opinion-author.css';

import '../../resources/dist/css/ln/modules/mod-banner.css';
import '../../resources/dist/css/ln/components/com-banner.css';
import '../../resources/dist/css/ln/components/com-button.css';
import '../../resources/dist/css/ln/modules/mod-article.css';
// import '../../resources/dist/css/ln/components/colecciones.css';
// import '../../resources/dist/css/ln/components/carta-lectores.css';
import '../../resources/dist/css/ln/pages/acumulado.css';

/* Se debe importar para AMP */
// import '../../resources/dist/css/ln/components/nav-amp.css';

/* Se debe importar por layouts */
import '../../resources/dist/css/ln/components/banners.css';

/* Se debe dejar último los helpers */
import '../../resources/dist/css/ln/base/helpers.css';

import GlobalProvider from '../private/common/context/globalContext';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';

const lnNotaFotoAl100 = ({ children, outputType, tree, isAdmin }) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);

    //probando configuraciones
    const revista = 'ohlala';
    const backgroundCategory = {
        //backgroundColor: '#ccc000'
        backgroundColor: ''
    };
    const colorCategory = {
        //color: 'blue'
        color: ''
    };
    const colorTags = {
        //color: 'red'
        color: ''
    };

    return (
        <GlobalProvider>
            {/* Banner MEGATOP */}
            {bannerMegatop}
            {/* Banner MEGATOP */}
            <div
                id="wrapper"
                className={`acumulado --color ${revista} ${amp} maqueta`}
            >
                <Header />
                <main>
                    <div className="row --top" style={backgroundCategory}>
                        <div className="lay">
                            {children[1]}
                            {/* BANNER y ANEXO */}
                            <div className="com-banner">BANNER</div>
                            <div className="com-anexo">ANEXO 100%</div>

                            {/* TITULO/LOGO Y CATEGORIAS */}
                            <ModCategory
                                revista={revista}
                                category="Título de la categoría"
                                color={colorCategory}
                            />
                        </div>
                    </div>
                    <div className="lay">
                        {children[2]}

                        {/* APERTURA: CAJA DE DOS COLUMNAS */}
                        <ModRowGap column="2" classCondition="--opening">
                            <ModArticle
                                withMedia
                                link="#"
                                titleTag="h1"
                                titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                authors="Por Gabriel Di Nicola, Fer Caino y Daro Aguilar"
                                dateText
                            />
                            <ModArticle
                                withMedia
                                link="#"
                                //titleTag="h1"
                                titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                authors="Por Gabriel Di Nicola"
                                dateText
                            />
                        </ModRowGap>

                        {/* LISTA DE TAGS */}
                        {/* <ModListOrderedOrUnordered /> */}
                        <ul className="com-unordered --tags">
                            <li>
                                <a
                                    href="/tema/huevo-tid47236/"
                                    className="com-link"
                                    title="huevo"
                                    style={colorTags}
                                >
                                    huevo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/manteca-tid47257/"
                                    className="com-link"
                                    title="manteca"
                                    style={colorTags}
                                >
                                    manteca
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/ajo-tid47126/"
                                    className="com-link"
                                    title="ajo"
                                    style={colorTags}
                                >
                                    ajo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/harina-0000-tid48184/"
                                    className="com-link"
                                    title="harina 0000"
                                    style={colorTags}
                                >
                                    harina 0000
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/aceite-de-oliva-tid47117/"
                                    className="com-link"
                                    title="aceite de oliva"
                                    style={colorTags}
                                >
                                    aceite de oliva
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/leche-tid47244/"
                                    className="com-link"
                                    title="leche"
                                    style={colorTags}
                                >
                                    leche
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/parmesano-tid47290/"
                                    className="com-link"
                                    title="parmesano"
                                    style={colorTags}
                                >
                                    parmesano
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/crema-de-leche-tid47204/"
                                    className="com-link"
                                    title="crema de leche"
                                    style={colorTags}
                                >
                                    crema de leche
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/cebolla-tid47174/"
                                    className="com-link"
                                    title="cebolla"
                                    style={colorTags}
                                >
                                    cebolla
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/azucar-tid47141/"
                                    className="com-link"
                                    title="azúcar"
                                    style={colorTags}
                                >
                                    azúcar
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/ajo-tid47126/"
                                    className="com-link"
                                    title="ajo"
                                    style={colorTags}
                                >
                                    ajo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/harina-0000-tid48184/"
                                    className="com-link"
                                    title="harina 0000"
                                    style={colorTags}
                                >
                                    harina 0000
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tema/aceite-de-oliva-tid47117/"
                                    className="com-link"
                                    title="aceite de oliva"
                                    style={colorTags}
                                >
                                    aceite de oliva
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div id="content-main" className="lay-sidebar">
                        {/* Cuerpo */}
                        <div className="sidebar__main">
                            <div className="row hlp-degrade">
                                {/* LUGAR PARA ANEXO */}
                                <div className="com-anexo">ANEXO 70%</div>

                                {/* CAJA DE TRES COLUMNAS */}
                                <ModRowGap column="3" classCondition="">
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        //authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        //dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <div className="mod-banner --caja1_tab">
                                        <div className="com-banner">BANNER</div>
                                    </div>
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <div className="mod-banner --caja2_tab">
                                        <div className="com-banner">BANNER</div>
                                    </div>
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authors="Por Gabriel Di Nicola"
                                        dateText
                                    />
                                </ModRowGap>

                                {/* LISTADO DE NOTAS */}
                                <ModArticle
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authors="Por Gabriel Di Nicola"
                                    dateText
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                <ModArticle
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authors="Por Gabriel Di Nicola"
                                    dateText
                                    //subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                <ModArticle
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authors="Por Gabriel Di Nicola"
                                    dateText
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%, ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                <ModArticle
                                    withMedia
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authors="Por Gabriel Di Nicola"
                                    dateText
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                <ModArticle
                                    withMedia
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authors="Por Gabriel Di Nicola"
                                    dateText
                                />
                                <ModArticle
                                    withMedia
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authors="Por Gabriel Di Nicola"
                                    dateText
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                            </div>
                        </div>
                        {/* Tercera */}
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {children[6]}

                            {/* RANKING DE NOTAS */}
                            <ol className="com-ordered --ranking">
                                <li>
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    />
                                </li>
                                <li>
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    />
                                </li>
                                <li>
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    />
                                </li>
                            </ol>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </GlobalProvider>
    );
};

const pageBuilderSections = [
    'Banner-Megatop',
    'Pre-Titulo',
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera'
];

lnNotaFotoAl100.sections = pageBuilderSections;

lnNotaFotoAl100.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(lnNotaFotoAl100);
