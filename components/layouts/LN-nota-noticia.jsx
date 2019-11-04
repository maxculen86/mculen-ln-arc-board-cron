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
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';
import '../../resources/dist/css/ln/components/blockquote.css';
import '../../resources/dist/css/ln/components/text.css';
import '../../resources/dist/css/ln/components/link.css';
import '../../resources/dist/css/ln/components/subtitle.css';
import '../../resources/dist/css/ln/components/slider.css';

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
                                    <picture className="content-pic picture zoom">
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

                                <section className="com-epigrafe">
                                    <p className="text">Epigrafe de foto</p>
                                    <p className="small">
                                        Fuente: LA NACION - Crédito: Enrique
                                        García Medina
                                    </p>
                                </section>
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
                            <section className="com-cita autor">
                                <section className="cont-figure">
                                    <a
                                        href="/deportes/probando-breaking-news-nid/"
                                        className="figure"
                                    >
                                        <picture className="content-pic picture zoom">
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
                                </section>
                                <section className="cont-cita">
                                    <h2 className="title-cita">
                                        ¨He fallado una y otra vez en mi vida,
                                        por eso he conseguido el éxito”
                                    </h2>
                                    <div className="cont-firma-autor">
                                        {' '}
                                        <h3 className="nombre-firma">
                                            Michael Jordan |{' '}
                                        </h3>{' '}
                                        <h3 className="especialidad-firma">
                                            {' '}
                                            Basquet
                                        </h3>{' '}
                                    </div>
                                    <div className="cont-data-firma">
                                        {' '}
                                        <h3 className="fecha-firma">
                                            Enero 2018 -
                                        </h3>{' '}
                                        <h3 className="lugar-firma">
                                            {' '}
                                            Entrevista para LN+
                                        </h3>{' '}
                                    </div>
                                </section>
                            </section>
                            <p className="text">
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                            </p>
                            <div className="externo">
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/zIY87vU33aA"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>

                            <section className="slider">
                                <button className="previous">Prev</button>
                                <article className="article">
                                    <a
                                        className="figure"
                                        href="/programas/mesa-chica"
                                        alt="Ir a Mesa chica"
                                        data-event="LinkClick"
                                        data-section="LinksOTT"
                                    >
                                        <picture className="content-picture">
                                            <source srcset="https://arc-anglerfish-arc2-prod-lanacionar.s3.amazonaws.com/public/XGGDACRVPFAYRBA2A5R4OA43KE.jpg" />
                                            <img
                                                className="lazy loaded"
                                                alt="imagen-destacada"
                                                data-src=""
                                                data-was-processed="true"
                                            />
                                        </picture>
                                    </a>
                                    <h2 className="title">
                                        <a
                                            href="/programas/mesa-chica"
                                            alt="Ir a Mesa chica"
                                            data-event="LinkClick"
                                            data-section="LinksOTT"
                                        >
                                            Mesa chica
                                        </a>
                                    </h2>
                                </article>
                                <article className="article">
                                    <a
                                        className="figure"
                                        href="/programas/mesa-chica"
                                        alt="Ir a Mesa chica"
                                        data-event="LinkClick"
                                        data-section="LinksOTT"
                                    >
                                        <picture className="content-picture">
                                            <source srcset="https://arc-anglerfish-arc2-prod-lanacionar.s3.amazonaws.com/public/XGGDACRVPFAYRBA2A5R4OA43KE.jpg" />
                                            <img
                                                className="lazy loaded"
                                                alt="imagen-destacada"
                                                data-src=""
                                                data-was-processed="true"
                                            />
                                        </picture>
                                    </a>
                                    <h2 className="title">
                                        <a
                                            href="/programas/mesa-chica"
                                            alt="Ir a Mesa chica"
                                            data-event="LinkClick"
                                            data-section="LinksOTT"
                                        >
                                            Mesa chica
                                        </a>
                                    </h2>
                                </article>
                                <button className="next">Next</button>
                            </section>
                            <p className="text">
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                            </p>
                            <div className="externo"></div>
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
                            <div className="externo">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13147.032931451173!2d-58.47448225000001!3d-34.53435279999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6a61cfe4d7f%3A0xc1ef0efa1c3ed2b1!2sKansas%20Grill!5e0!3m2!1sen!2sar!4v1572631280897!5m2!1sen!2sar"
                                    width="600"
                                    height="450"
                                    frameborder="0"
                                    allowfullscreen=""
                                ></iframe>
                            </div>
                            <h2 className="com-subtitle-nota-1">Subtitulo 1</h2>
                            <h2 className="com-subtitle-nota-2">Subtitulo 2</h2>
                            <h2 className="com-subtitle-nota-3">Subtitulo 3</h2>
                            <blockquote className="blockquote">
                                Para la nueva campaña, según el USDA quedarían
                                como remanente final unas 21,63 millones de
                                toneladas versus 22,10 millones de toneladas
                                esperadas en el mercado.toneladas.
                            </blockquote>

                            <div className="keep-reading">
                                <h2 className="com-subtitle-nota-3">
                                    Seguir leyendo
                                </h2>
                                <a className="link">
                                    <strong>Villa La Angostura.</strong> Un
                                    choque en la ruta de los 7 Lagos complica
                                    más la situación
                                </a>
                                <a className="link">
                                    <strong>Villa La Angostura.</strong> Un
                                    choque en la ruta de los 7 Lagos complica
                                    más la situación
                                </a>
                                <a className="link">
                                    <strong>Villa La Angostura.</strong> Un
                                    choque en la ruta de los 7 Lagos complica
                                    más la situación
                                </a>
                            </div>
                            <div className="com-tag cont_tags">
                                <h2 className="com-subtitle-nota-3">Temas</h2>
                                <a
                                    className="com-item"
                                    href="/recetas/platos-principales"
                                >
                                    Platos de comida principal
                                </a>
                                <a className="com-item" href="/recetas/carnes">
                                    Carnes
                                </a>
                                <a
                                    className="com-item"
                                    href="/recetas/faciles-y-rapidas"
                                >
                                    Fáciles y rápidas
                                </a>
                            </div>
                        </div>
                        <div className="sidebar__aside"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
