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
import '../../resources/dist/css/ln/components/opinion-author.css';
import '../../resources/dist/css/ln/components/carta-lectores.css';

const lnNotaNoticia = ({ children }) => {
    return (
        <div id="wrapper" className="nota noticia">
            {/* TODO: sacar */}
            <script src="https://d328y0m0mtvzqc.cloudfront.net/prod/powaBoot.js" />
            <Header />
            <main>
                {children[0]}
                <div className="lay">
                    <header className="row titulo">
                        <div className="col-12">
                            {/* Titulo (breadcrumb, logo+titulo) */}
                            {children[1]}
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

                                <div className="opinion-autor row">
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
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1 hlp-marginBottom-40 hlp-tablet-none hlp-mobile-show">
                                {/* hlp-mobile-show */}
                                {/* Left-Cuerpo Shared*/}
                                {children[3]}
                            </div>

                            <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                <div className="row">
                                    {/* Pos-Apertura */}
                                    {children[4]}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tercera */}
                    <div className="sidebar__aside hlp-tablet-none">
                        {children[5]}
                    </div>
                </div>
            </main>
            <Footer />
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
