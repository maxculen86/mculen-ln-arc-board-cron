import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
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
// import '../../resources/dist/css/ln/components/colecciones.css';
// import '../../resources/dist/css/ln/components/carta-lectores.css';

/* Se debe importar para AMP */
// import '../../resources/dist/css/ln/components/nav-amp.css';

/* Se debe importar por layouts */
import '../../resources/dist/css/ln/components/banners.css';

/* Se debe dejar último los helpers */
import '../../resources/dist/css/ln/base/helpers.css';

import { GlobalProvider } from '../private/common/context/globalContext';
import ComParagraph from '../private/common/com-paragraph';
import ComLink from '../private/common/com-link';
import ModParagraph from '../private/common/mod-paragraph';

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
            id="LN-nota-noticia-error"
            type="warning"
            message="La sección BannerMegatop solo permite un banner y no se mostrará en salida AMP"
        />
    );
    if (isAdmin) return component;
    return isValid ? component : null;
};

const lnNotaNoticia = ({ children, outputType, tree, isAdmin }) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);
    return (
        <GlobalProvider>
            {/* Banner MEGATOP */}
            {bannerMegatop}
            {/* Banner MEGATOP */}
            <div id="wrapper" className={`nota noticia ${amp}`}>
                {/* TODO: sacar */}
                {/* <script src="https://d328y0m0mtvzqc.cloudfront.net/prod/powaBoot.js" /> */}
                <Header />
                <main>
                    {children[1]}
                    <div className="lay">
                        <div className="row">
                            <div className="col-12">
                                {/* Titulo (breadcrumb, logo+titulo) */}
                                {children[2]}
                            </div>
                        </div>
                    </div>
                    <div className="lay-sidebar">
                        {/* Cuerpo */}
                        <div className="sidebar__main">
                            <div className="row">
                                <div className="col-12 ">
                                    {/* Bajada y autor fecha más apertura */}
                                    {children[3]}

                                    {/* <div className="opinion-autor row">
                                    <section id="" className="cont-figure">
                                        <div className="figure">
                                            <picture className="content-pic picture">
                                                <img
                                                    src="https://bucket1.glanacion.com/anexos/fotos/12/2089212w82.png"
                                                    alt=""
                                                    className="content-img"
                                                />
                                            </picture>
                                        </div>
                                    </section>
                                    <div className="opinion-calc">
                                        <h1 className="link hlp-bold">
                                            <a href="">Bruno Pittón</a>
                                        </h1>
                                        <label>PARA LA NACION</label>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                            <section className="cuerpo__nota">
                                <div className="row">
                                    <div className="col-12">
                                        {/* PARAGRAPH */}
                                        <div className="row">
                                            <div className="col-12">
                                                <ComParagraph capital>
                                                    Esto es un texto simulado y
                                                    no tiene ninguna
                                                    validez,Esto es un texto
                                                    simulado y no tiene ninguna
                                                    validez,Esto es un texto
                                                    simulado y no tiene ninguna
                                                    validez, esto es un texto
                                                    simulado.Esto es un texto
                                                    simulado y no tiene ninguna
                                                    validez, esto es un{' '}
                                                    <ComLink>
                                                        texto simulado
                                                    </ComLink>
                                                    y no tiene ninguna validez
                                                </ComParagraph>
                                                <ComParagraph
                                                    classCondition="--bajada"
                                                    size="--threexs"
                                                >
                                                    Esto es un texto de BAJADA
                                                    simulado y no tiene ninguna
                                                    validez, esto es un texto
                                                    simulado. Esto es un texto
                                                    de BAJADA simulado y no
                                                    tiene ninguna validez, esto
                                                    es un texto simulado.Esto es
                                                    un texto simulado y no tiene
                                                    ninguna validez, esto es un{' '}
                                                    <a
                                                        href="#"
                                                        class="com-link"
                                                    >
                                                        texto simulado
                                                    </a>{' '}
                                                    y no tiene ninguna validez
                                                </ComParagraph>
                                                <ComParagraph>
                                                    Esto es un texto simulado y
                                                    no tiene ninguna validez,
                                                    esto es un texto
                                                    simulado.Esto es un texto
                                                    simulado y no tiene ninguna
                                                    validez, esto es un{' '}
                                                    <a
                                                        href="#"
                                                        class="com-link"
                                                    >
                                                        texto simulado
                                                    </a>{' '}
                                                    y no tiene ninguna validez
                                                </ComParagraph>
                                                <ModParagraph>
                                                    Esto es un texto simulado y
                                                    no tiene ninguna validez,
                                                    esto es un{' '}
                                                    <a
                                                        href="#"
                                                        class="com-link"
                                                    >
                                                        texto simulado
                                                    </a>{' '}
                                                    y no tiene ninguna validez
                                                </ModParagraph>
                                                <ModParagraph>
                                                    Esto es un{' '}
                                                    <a
                                                        href="#"
                                                        class="com-link"
                                                    >
                                                        texto simulado
                                                    </a>{' '}
                                                    y no tiene validez.
                                                </ModParagraph>
                                            </div>
                                        </div>
                                        {/* PARAGRAPH */}
                                    </div>
                                    <div className="col-1 hlp-marginBottom-40 hlp-mobile-show">
                                        {/* hlp-mobile-show */}
                                        {/* Left-Cuerpo Shared */}
                                        {children[4]}
                                    </div>
                                    <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                        <div className="row">
                                            <div className="col-12">
                                                {/* Pos-Apertura */}
                                                {children[5]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/* Tercera */}
                        <div className="sidebar__aside hlp-desklm-none">
                            {children[6]}
                        </div>
                    </div>

                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            {/* Bottom */}
                            {children[9]}
                        </div>
                        <div className="sidebar__aside">
                            {/* Bottom-Tercera */}
                            {children[10]}
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
    'Tercera',
    'Pos-Cuerpo',
    'Full-Break',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaNoticia.sections = pageBuilderSections;

lnNotaNoticia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(lnNotaNoticia);
