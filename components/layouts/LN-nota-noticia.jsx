import React from 'react';
import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/pages/recipe.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';

//TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
//EL COMPONENTE Y EN OTROS NO
import '../../resources/dist/css/ln/components/button.css';
import '../../resources/dist/css/ln/components/date.css';
import '../../resources/dist/css/ln/components/tag.css';
import '../../resources/dist/css/ln/components/author.css';
import '../../resources/dist/css/ln/components/lead.css';
import '../../resources/dist/css/ln/components/subtitle.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';
import '../../resources/dist/css/ln/components/blockquote.css';
import '../../resources/dist/css/ln/components/text.css';

export default function lnNotaNoticia() {
    return (
        <div id="wrapper" className="nota noticia">
            <main>
                <div className="row">
                    <div className="lay-sidebar">
                        <div className="sidebar-main">
                            <section className="cont-figure">
                                <a
                                    href="/deportes/probando-breaking-news-nid/"
                                    className="figure"
                                >
                                    <picture className="content-pic picture ">
                                        <source
                                            media="(min-width: 64em)"
                                            srcset="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/fPfH8mFZiDzpKFkxeE7HELbvSlE=/600x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                                            alt=""
                                        />
                                        <source
                                            media="(min-width: 48em)"
                                            srcset="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/-Aolf8vHyfnyih9BvkqlmgCYBc8=/520x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                                            alt=""
                                        />
                                        <source
                                            media="(min-width: 20em)"
                                            srcset="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/PCnznfpymUaBD6bUQuSEB8d6KQY=/375x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                                            alt=""
                                        />
                                        <img
                                            src="https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                                            className="content-img"
                                            alt=""
                                        />
                                    </picture>
                                </a>
                                <p className="text">Epigrafe de foto</p>
                                <p className="small">
                                    Fuente: LA NACION - Crédito: Enrique García
                                    Medina
                                </p>
                            </section>

                            <p className="text capital">
                                H soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo H
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo H
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo H
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo H
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                            </p>
                            <p className="text">
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                            </p>
                            <p className="text">
                                soy un texto mas largo soy un texto
                                <b>mas largo soy un</b> texto mas largo soy un
                                <a href="" className="link">
                                    xto mas largo soy un
                                </a>
                                texto mas largo soy un texto mas largo soy un
                                texto mas largo soy un texto mas largo soy un
                                texto mas largo soy un texto mas largo soy un
                                texto mas largo soy un texto mas largo
                            </p>
                            <h2 className="com-subtitle-nota-1">Subtitulo 1</h2>
                            <h2 className="com-subtitle-nota-2">Subtitulo 2</h2>
                            <h2 className="com-subtitle-nota-3">Subtitulo 3</h2>
                            <blockquote className="blockquote">
                                Para la nueva campaña, según el USDA quedarían
                                como remanente final unas 21,63 millones de
                                toneladas versus 22,10 millones de toneladas
                                esperadas en el mercado.toneladas.
                            </blockquote>
                        </div>
                        <div className="sidebar__aside"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
