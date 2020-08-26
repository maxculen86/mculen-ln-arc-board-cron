import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

import ModArticle from '../private/common/mod-article';

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
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
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

import { GlobalProvider } from '../private/common/context/globalContext';

const getBannerMegatop = (element, outputType, tree, isAdmin) => {
    const { children } = tree;
    // children[0] => Section BannerMegatop
    const { children: childrenSectionBannerMegatop } = children[0];
    const isValid =
        outputType !== 'amp' && childrenSectionBannerMegatop.length <= 1;
    const component = isValid ? (
        element
    ) : (
        <PageBuilderMessage
            id="LN-nota-foto-al-100-error"
            type="warning"
            message="La sección BannerMegatop solo permite un banner y no se mostrará en salida AMP"
        />
    );
    if (isAdmin) return component;
};

const lnNotaFotoAl100 = ({ children, outputType, tree, isAdmin }) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);

    //probando configuraciones
    const revista = '';
    const divStyle = {
        backgroundColor: '#ccc000'
    };

    return (
        <GlobalProvider>
            {/* Banner MEGATOP */}
            {bannerMegatop}
            {/* Banner MEGATOP */}
            <div id="wrapper" className={`acumulado --color ${revista} ${amp}`}>
                <Header />
                <main>
                    <div className="row --top" style={divStyle}>
                        {children[1]}
                        <div className="lay">
                            <div className="mod-categories">
                                {revista ? (
                                    <i
                                        className={`com-logo logo-${revista} --large`}
                                    ></i>
                                ) : (
                                    <h1 className="com-title --xl ">
                                        Categoría
                                    </h1>
                                )}

                                <button
                                    type="button"
                                    className="com-button hlp-none"
                                >
                                    <i className="icon-left"></i>
                                </button>
                                <ol className="com-ordered">
                                    <li>
                                        <a
                                            href="/recetas/platos-de-comida-principal/"
                                            className="com-link"
                                            title="Principales"
                                        >
                                            Principales
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/carnes/"
                                            className="com-link"
                                            title="Carnes"
                                        >
                                            Carnes
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/celiacos-sin-gluten/"
                                            className="com-link"
                                            title="Celíacos"
                                        >
                                            Celíacos
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/vegetarianas/"
                                            className="com-link"
                                            title="Vegetarianas"
                                        >
                                            Vegetarianas
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/faciles-y-rapidas/"
                                            className="com-link"
                                            title="Rápidas"
                                        >
                                            Rápidas
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/pollo/"
                                            className="com-link"
                                            title="Pollo"
                                        >
                                            Pollo
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/dulces/"
                                            className="com-link"
                                            title="Dulces"
                                        >
                                            Dulces
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/guarniciones/"
                                            className="com-link"
                                            title="Guarniciones"
                                        >
                                            Guarniciones
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/entradas/"
                                            className="com-link"
                                            title="Entradas"
                                        >
                                            Entradas
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/tortas/"
                                            className="com-link"
                                            title="Tortas"
                                        >
                                            Tortas
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/postres/"
                                            className="com-link"
                                            title="Postres"
                                        >
                                            Postres
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/veganas/"
                                            className="com-link"
                                            title="Veganas"
                                        >
                                            Veganas
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/recetas/ensaladas/"
                                            className="com-link"
                                            title="Ensaladas"
                                        >
                                            Ensaladas
                                        </a>
                                    </li>
                                </ol>
                                <button type="button" className="com-button">
                                    <i className="icon-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lay --apertura">
                        <div className="row">
                            <div className="row-gap-tablet-2 row-gap-desksm-2">
                                {/* Titulo (breadcrumb, logo+titulo) */}
                                {/* {children[2]} */}

                                <ModArticle
                                    withMedia
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authorText="Por Gabriel Di Nicola"
                                    dateText="20 de abril de 2020"
                                />

                                {/* Titulo (breadcrumb, logo+titulo) */}
                                {/* {children[2]} */}
                                <ModArticle
                                    withMedia
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authorText="Por Gabriel Di Nicola"
                                    dateText="20 de abril de 2020"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="lay">
                        <div className="mod-tags">
                            <ol className="com-ordered">
                                <li>
                                    <a
                                        href="/tema/huevo-tid47236/"
                                        className="com-link"
                                        title="huevo"
                                    >
                                        huevo
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/manteca-tid47257/"
                                        className="com-link"
                                        title="manteca"
                                    >
                                        manteca
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/ajo-tid47126/"
                                        className="com-link"
                                        title="ajo"
                                    >
                                        ajo
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/harina-0000-tid48184/"
                                        className="com-link"
                                        title="harina 0000"
                                    >
                                        harina 0000
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/aceite-de-oliva-tid47117/"
                                        className="com-link"
                                        title="aceite de oliva"
                                    >
                                        aceite de oliva
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/leche-tid47244/"
                                        className="com-link"
                                        title="leche"
                                    >
                                        leche
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/parmesano-tid47290/"
                                        className="com-link"
                                        title="parmesano"
                                    >
                                        parmesano
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/crema-de-leche-tid47204/"
                                        className="com-link"
                                        title="crema de leche"
                                    >
                                        crema de leche
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/cebolla-tid47174/"
                                        className="com-link"
                                        title="cebolla"
                                    >
                                        cebolla
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/tema/azucar-tid47141/"
                                        className="com-link"
                                        title="azúcar"
                                    >
                                        azúcar
                                    </a>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="lay-sidebar">
                        {/* Cuerpo */}
                        <div className="sidebar__main">
                            <div className="row hlp-degrade">
                                <div className="com-anexo">ANEXO 70%</div>
                                <div className="row-gap-tablet-3 row-gap-desksm-3">
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authorText="Por Gabriel Di Nicola"
                                        dateText="20 de abril de 2020"
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authorText="Por Gabriel Di Nicola"
                                        dateText="20 de abril de 2020"
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authorText="Por Gabriel Di Nicola"
                                        dateText="20 de abril de 2020"
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authorText="Por Gabriel Di Nicola"
                                        dateText="20 de abril de 2020"
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authorText="Por Gabriel Di Nicola"
                                        dateText="20 de abril de 2020"
                                    />
                                    <ModArticle
                                        withMedia
                                        link="#"
                                        titleSize="--twoxs"
                                        titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                        authorText="Por Gabriel Di Nicola"
                                        dateText="20 de abril de 2020"
                                    />
                                </div>
                                {/* <div className="col-12"> */}
                                <ModArticle
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authorText="Por Gabriel Di Nicola"
                                    dateText="20 de abril de 2020"
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                <ModArticle
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authorText="Por Gabriel Di Nicola"
                                    dateText="20 de abril de 2020"
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                <ModArticle
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authorText="Por Gabriel Di Nicola"
                                    dateText="20 de abril de 2020"
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                <ModArticle
                                    withMedia
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authorText="Por Gabriel Di Nicola"
                                    dateText="20 de abril de 2020"
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                <ModArticle
                                    withMedia
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authorText="Por Gabriel Di Nicola"
                                    dateText="20 de abril de 2020"
                                />
                                <ModArticle
                                    withMedia
                                    link="#"
                                    titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                                    authorText="Por Gabriel Di Nicola"
                                    dateText="20 de abril de 2020"
                                    subheadText="La ocupación de camas de cuidados intensivos, más allá de la dolencia que explique la internación, promedia el 58,3% a nivel nacional; en el AMBA llega al 68,4%"
                                />
                                {/* </div> */}
                            </div>
                        </div>
                        {/* Tercera */}
                        <div className="sidebar__aside hlp-desklm-none">
                            {children[6]}
                            <ModArticle
                                withMedia
                                link="#"
                                titleSize="--twoxs"
                                titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                            />
                            <ModArticle
                                withMedia
                                link="#"
                                titleSize="--twoxs"
                                titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                            />
                            <ModArticle
                                withMedia
                                link="#"
                                titleSize="--twoxs"
                                titleText="Manifestación contra los despidos en el aeroparque metropolitano"
                            />
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
