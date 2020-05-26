import React from 'react';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/pages/recipe.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';

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
import '../../resources/dist/css/ln/components/colecciones.css';
import '../../resources/dist/css/ln/components/carta-lectores.css';
import '../../resources/dist/css/ln/components/opinion-author.css';
import '../../resources/dist/css/ln/components/storytelling.css';

import ComText from '../private/common/com-text';
import ComLogo from '../private/common/com-logo';
import ComFigure from '../private/common/com-figure';
import ModPicture from '../private/common/mod-picture';
import ModFigcaption from '../private/common/mod-figcaption';

const lnNotaNoticia = ({ children }) => {
    return (
        <div
            id="wrapper"
            className="nota noticia noticia-storytelling --hlp-transparent"
        >
            {/* TODO: sacar */}
            <script src="https://d328y0m0mtvzqc.cloudfront.net/prod/powaBoot.js" />
            <Header />
            <main>
                <section className="apertura --storytelling">
                    <ComFigure>
                        <ModPicture
                            classCondition=""
                            srcset="//bucket1.glanacion.com/anexos/fotos/80/2760980w1920.jpg"
                            src="//bucket1.glanacion.com/anexos/fotos/80/2760980w1920.jpg"
                            alt="Alt de la imagen"
                            video="https://dl.dropboxusercontent.com/s/931244iox7i0fpk/working-with-espresso.mp4"
                        ></ModPicture>
                        <div className="mod-title">
                            <div className="lay">
                                <ComLogo logoName="lugares" />
                                <ComText tag="h1" size="xl" classCondition="">
                                    Escapadas. 10 rutas argentinas
                                    espectaculares que no conocías
                                </ComText>
                            </div>
                        </div>
                    </ComFigure>
                    {/* <section id="" className="cont-figure">
                        <div className="figure">
                            <picture className="content-pic picture">
                                <source
                                    media="(min-width: 767px)"
                                    srcset="//bucket1.glanacion.com/anexos/fotos/80/2760980w1920.jpg"
                                ></source>
                                <source
                                    media="(min-width: 480px)"
                                    srcset="//bucket1.glanacion.com/anexos/fotos/80/2760980w768.jpg"
                                ></source>
                                <img
                                    className="content-img"
                                    src="//bucket3.glanacion.com/anexos/fotos/66/2760966w480.jpg"
                                    alt="srcset"
                                />
                            </picture>
                        </div>
                    </section> */}
                    <section className="wrap root">
                        <div className="lay">
                            <ModFigcaption
                                title="Las próximas definiciones en cinco causas de peso."
                                credit="Fuente: LA NACION - Crédito: Enrique García Medina"
                            />
                        </div>
                    </section>
                    {/* <div className="lay-sidebar">
                        <div className="sidebar__main">
                            <div className="row">
                                <div className="col-1 hlp-marginBottom-40 hlp-tablet-none"></div>
                                <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                    <div className="storytelling-title">
                                        <ComLogo logoName="lugares" />
                                        <ComText
                                            tag="h1"
                                            size="xl"
                                            classCondition=""
                                        >
                                            Escapadas. 10 rutas argentinas
                                            espectaculares que no conocías
                                        </ComText>
                                    </div>
                                    <section className="com-epigrafe">
                                        <p className="text">Epigrafe de foto</p>
                                        <p className="small">
                                            Fuente: LA NACION - Crédito: Enrique
                                            García Medina
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__aside hlp-tablet-none"></div>
                    </div> */}
                </section>
                {children[0]}
                <section className="wrap">
                    <div className="lay">
                        <header className="row titulo">
                            <div className="col-12">
                                {/* Titulo (breadcrumb, logo+titulo) */}
                                {/* {children[1]} */}
                            </div>
                        </header>
                    </div>

                    <div className="lay-sidebar">
                        {/* Cuerpo */}
                        <div className="sidebar__main">
                            <div className="row">
                                <div className="col-12 ">
                                    {/*Bajada y autor fecha más apertura*/}
                                    {children[2]}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-1 hlp-marginBottom-40 hlp-tablet-none">
                                    {/* hlp-mobile-show */}
                                    {/* Left-Cuerpo Shared*/}
                                    {children[3]}
                                </div>

                                <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                    <div className="row">
                                        {/* Pos-Apertura */}
                                        {children[4]}
                                        <div className="opinion-autor row">
                                            <div className="col-12">
                                                <section
                                                    id=""
                                                    className="cont-figure"
                                                >
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
                                                        <a href="">
                                                            Bruno Pittón
                                                        </a>
                                                    </h1>
                                                    <label>
                                                        PARA LA NACION
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tercera */}
                        <div className="sidebar__aside hlp-tablet-none">
                            {children[5]}
                        </div>
                    </div>
                </section>
            </main>
            <section className="wrap root">
                <Footer />
            </section>
        </div>
    );
};

const pageBuilderSections = [
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

export default lnNotaNoticia;
