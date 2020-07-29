import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

import '../../resources/dist/css/ln/base.css'; // chequear para sacar base porque se repite estilo
import '../../resources/dist/css/ln/base/reset.css';
import '../../resources/dist/css/ln/base/types.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';

import '../../resources/dist/css/ln/pages/photo100.css';

import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';

// TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
// EL COMPONENTE Y EN OTROS NO
import '../../resources/dist/css/ln/components/date.css';
import '../../resources/dist/css/ln/components/author.css';
import '../../resources/dist/css/ln/components/text.css';

import '../../resources/dist/css/ln/components/button.css';
import '../../resources/dist/css/ln/components/tag.css';
import '../../resources/dist/css/ln/components/lead.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';
import '../../resources/dist/css/ln/components/blockquote.css';
import '../../resources/dist/css/ln/components/link.css';
import '../../resources/dist/css/ln/components/subtitle.css';
import '../../resources/dist/css/ln/components/slider.css';
import '../../resources/dist/css/ln/components/epigraph.css';
import '../../resources/dist/css/ln/components/appointment.css';
import '../../resources/dist/css/ln/components/opinion-author.css';

import '../../resources/dist/css/ln/modules/mod-banner.css';
import '../../resources/dist/css/ln/components/com-banner.css';
import '../../resources/dist/css/ln/components/com-button.css';

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
    return (
        <GlobalProvider>
            {/* Banner MEGATOP */}
            {bannerMegatop}
            <div
                id="wrapper"
                className={`nota --photo100 --transparent ${amp}`}
            >
                <Header />
                <main>
                    <AperturaStorytelling />

                    {/* Cuerpo al 100% */}
                    <div className="row">
                        {/* Modulo SHARE */}
                        <div className="com-share">
                            <div className="share-left">
                                <button
                                    type="button"
                                    className="icon-facebook"
                                ></button>
                                <button
                                    type="button"
                                    className="icon-twitter"
                                ></button>
                                <button
                                    type="button"
                                    id="whatsAppShareDesktop"
                                    className="icon-whatsapp"
                                ></button>
                            </div>
                            <div className="share-right">
                                <button
                                    type="button"
                                    className="icon-mail"
                                ></button>
                                <button
                                    type="button"
                                    className="icon-comment"
                                ></button>
                                <label for="">145</label>
                            </div>
                        </div>

                        {/* Modulo DATE */}
                        <span className="mod-date">
                            <time
                                className="com-date --threexs"
                                datetime="7 de Febrero de 2020"
                            >
                                7 de Febrero de 2020
                            </time>
                            <time className="com-hour --threexs">09:09</time>
                        </span>

                        {/* Modulo AUTHOR */}
                        <div className="row FirmaAutor">
                            <div className="col-12">
                                <section className="mod-autor">
                                    <div className="container-text">
                                        <div className="container-firma">
                                            <a
                                                href="/autor/andres-prestileo-215/"
                                                className="com-link --autor"
                                            >
                                                Andrés Prestileo
                                            </a>
                                            <a
                                                href="/autor/manuel-torino-7386/"
                                                className="com-link --autor"
                                            >
                                                Manuel Torino
                                            </a>
                                            <a
                                                href="/autor/josefina-salomon-646/"
                                                className="com-link --autor"
                                            >
                                                Josefina Salomón
                                            </a>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Modulo PARAGRAPH */}
                        <p className="com-paragraph  --capital --twoxs">
                            S
                            <a
                                className="com-link"
                                href="https://www.lanacion.com.ar/el-mundo/primer-latinoamericano-pasajero-argentino-del-crucero-japon-nid2331517"
                                target="_blank"
                            >
                                e trata del primer caso
                            </a>{' '}
                            confirmado de un latinoamericano diagnosticado con
                            esta enfermedad que se haya anunciado hasta el
                            momento.{' '}
                            <a
                                className="com-link"
                                href="https://www.lanacion.com.ar/el-mundo/de-crucero-de-lujo-a-carcel-flotante-el-drama-de-una-cuarentena-a-bordo-nid2331408"
                            >
                                El crucero
                            </a>
                            , que llegó el lunes por la noche a las
                            inmediaciones del puerto de{' '}
                            <strong>Yokohama</strong>, al suroeste de Tokio,
                            tiene unos{' '}
                            <a
                                className="com-link"
                                href="https://www.lanacion.com.ar/el-mundo/primer-latinoamericano-pasajero-argentino-del-crucero-japon-nid2331517"
                                target="_blank"
                            >
                                <strong>3.700 pasajeros</strong>
                            </a>{' '}
                            y tripulantes, de los cuales 273 se sometieron a las
                            pruebas de detección. Permanecerían en cuarentena
                            hasta el 19 de febrero.
                        </p>

                        <p className="com-paragraph --twoxs">
                            <strong>El nombre de Squeff</strong>, muy cercana al
                            kirchnerismo, comenzó a sonar en los pasillos de la
                            Cancillería luego del traspié del Gobierno tras
                            <a
                                href="https://www.lanacion.com.ar/politica/antes-del-viaje-alberto-fernandez-se-cayo-nid2324570"
                                title="la caída sorpresiva de la postulación de Luis Bellando"
                                className="com-link "
                                data-reactroot=""
                            >
                                la caída sorpresiva de la postulación de Luis
                                Bellando
                            </a>
                            , otro diplomático de carrera, para representar al
                            país en la Santa Sede.
                        </p>

                        {/* Componente TITLE */}
                        <h2 className="com-title --l ">
                            Esto seria el subtitulo para desordenadas
                        </h2>

                        {/* Modulo UNORDERED LIST */}
                        <ul className="com-unordered">
                            <li className="com-item">
                                Inicialmente, las pruebas se limitaron a las
                                personas que presentaban
                            </li>
                            <li className="com-item">
                                Síntomas o que habían estado en contacto con un
                                pasajero que desembarcó en Hong Kong
                            </li>
                            <li className="com-item">
                                Al que se le diagnosticó la enfermedad.
                            </li>
                        </ul>

                        {/* Componente TITLE */}
                        <h3 className="com-title --m ">
                            Esto seria el otro subtitulo ordenadas
                        </h3>

                        {/* Modulo ORDERED LIST */}
                        <ol className="com-ordered">
                            <li className="com-item">
                                Sin embargo, ahora el ministro de Salud dijo que
                                se someterá.
                            </li>
                            <li className="com-item">
                                Tests adicionales a las personas vulnerables que
                                estén a bordo del crucero, como los ancianos.
                            </li>
                            <li className="com-item">
                                A aquellos que hayan estado en contacto con los
                                nuevos casos positivos.
                            </li>
                        </ol>

                        {/* Modulo PARAGRAPH */}
                        <p className="com-paragraph --twoxs">
                            En un lugar de la Mancha, de cuyo nombre no quiero
                            acordarme, no ha mucho tiempo que vivía un hidalgo
                            de los de lanza en astillero.
                            <br />
                            Quieren decir que tenía el sobrenombre de Quijada, o
                            Quesada, que en esto hay alguna diferencia en los
                            autores que deste caso escriben.
                        </p>

                        {/* Modulo IMAGE */}
                        <div>
                            <section
                                role="button"
                                className="mod-media --zoom  "
                            >
                                <figure
                                    role="button"
                                    className="mod-figure --horizontal"
                                >
                                    <picture className="mod-picture ">
                                        <source
                                            media="(min-width: 1280px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/ryxIacp2knJOtHcsepXnDiQS2BY=/1280x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/GBKYH73BZNFQZANSG5OECUYSDE.jpg"
                                        />
                                        <source
                                            media="(min-width: 1024px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/7IUe_kKdO_Xc8DCX6RvjFCj_1Hg=/690x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/GBKYH73BZNFQZANSG5OECUYSDE.jpg"
                                        />
                                        <source
                                            media="(min-width: 768px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/GF9q1Pd47Ql1Cy03N5T1o96q1FU=/768x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/GBKYH73BZNFQZANSG5OECUYSDE.jpg"
                                        />
                                        <source
                                            media="(min-width: 360px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/RhFeiZj5SkE0HOcMei06L9zNcMM=/350x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/GBKYH73BZNFQZANSG5OECUYSDE.jpg"
                                        />
                                        <source
                                            media="(min-width: 320px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/JWT6kCkRE3q55sHh3ycJer3wQCw=/310x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/GBKYH73BZNFQZANSG5OECUYSDE.jpg"
                                        />
                                        <img
                                            src="http://demo-prod.origin.arcpublishing.com/resizer/GF9q1Pd47Ql1Cy03N5T1o96q1FU=/768x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/GBKYH73BZNFQZANSG5OECUYSDE.jpg"
                                            loading="lazy"
                                            className="com-image "
                                            alt=""
                                        />
                                    </picture>
                                    <figcaption className="mod-figcaption">
                                        <span className="com-text --caption">
                                            Este texto es la bajada de la
                                            imagen, van con un par de lineas,
                                            puede tener al menos unas cuatro.
                                        </span>
                                        <span className="com-text --credit">
                                            LA NACION - Enrique Medina
                                        </span>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>

                        {/* Modulo PARAGRAPH */}
                        <p className="com-paragraph --twoxs">
                            <strong>El nombre de Squeff</strong>, muy cercana al
                            kirchnerismo, comenzó a sonar en los pasillos de la
                            Cancillería luego del traspié del Gobierno tras
                            <a
                                href="https://www.lanacion.com.ar/politica/antes-del-viaje-alberto-fernandez-se-cayo-nid2324570"
                                title="la caída sorpresiva de la postulación de Luis Bellando"
                                className="com-link "
                                data-reactroot=""
                            >
                                la caída sorpresiva de la postulación de Luis
                                Bellando
                            </a>
                            , otro diplomático de carrera, para representar al
                            país en la Santa Sede.
                        </p>

                        {/* Modulo UNORDERED LIST */}
                        <ul className="com-unordered">
                            <li className="com-item">
                                El Grand Hotel del Tucumán realiza hasta el
                                domingo próximo una feria de artesanías.
                            </li>
                            <li className="com-item">
                                Que permite apreciar las diversas
                                manifestaciones culturales de la comunidad
                                provincial.
                            </li>
                            <li className="com-item">
                                Se exponen, entre otros, trabajos en vidrio,
                                platería, madera, pocelanas, cueros y papel
                                maché.
                            </li>
                        </ul>

                        {/* Modulo IMAGE */}
                        <div>
                            <section
                                role="button"
                                className="mod-media --zoom  "
                            >
                                <figure
                                    role="button"
                                    className="mod-figure --horizontal"
                                >
                                    <picture className="mod-picture ">
                                        <source
                                            media="(min-width: 1280px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/RdPKpev1vn2EyRi60HhAMTuPxSs=/1280x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                        />
                                        <source
                                            media="(min-width: 1024px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/rK6d4KefYwZDESVtE4mlXom0K0w=/690x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                        />
                                        <source
                                            media="(min-width: 768px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/r-JvqZANSLMk42Z4TpYGOtv78eI=/768x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                        />
                                        <source
                                            media="(min-width: 360px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/6Ep7oaRvxxguKrcQEoEqnPVHSOE=/350x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                        />
                                        <source
                                            media="(min-width: 320px)"
                                            srcset="http://demo-prod.origin.arcpublishing.com/resizer/Dsi_3kQH6GVZ0BLFE8Fb3Cqh4U4=/310x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                        />
                                        <img
                                            src="http://demo-prod.origin.arcpublishing.com/resizer/r-JvqZANSLMk42Z4TpYGOtv78eI=/768x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                            loading="lazy"
                                            className="com-image "
                                            alt=""
                                        />
                                    </picture>
                                    <figcaption className="mod-figcaption">
                                        <span className="com-text --caption">
                                            Este texto es la bajada de la
                                            imagen, van con un par de lineas,
                                            puede tener al menos unas cuatro.
                                        </span>
                                        <span className="com-text --credit">
                                            LA NACION - Enrique Medina
                                        </span>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>

                        {/* Modulo BANNERS
                        <div className="mod-banner">
                            <div className="com-banner --desktop">
                                <iframe
                                    width="300"
                                    height="250"
                                    src="https://placehold.it/300x250"
                                ></iframe>
                            </div>
                            <div className="com-banner --desktop">
                                <iframe
                                    width="300"
                                    height="250"
                                    src="https://placehold.it/300x250"
                                ></iframe>
                            </div>
                        </div>
                        */}

                        {/* Modulo PARAGRAPH */}
                        <p className="com-paragraph --twoxs">
                            <strong>El nombre de Squeff</strong>, muy cercana al
                            kirchnerismo, comenzó a sonar en los pasillos de la
                            Cancillería luego del traspié del Gobierno tras
                            <a
                                href="https://www.lanacion.com.ar/politica/antes-del-viaje-alberto-fernandez-se-cayo-nid2324570"
                                title="la caída sorpresiva de la postulación de Luis Bellando"
                                className="com-link "
                                data-reactroot=""
                            >
                                la caída sorpresiva de la postulación de Luis
                                Bellando
                            </a>
                            , otro diplomático de carrera, para representar al
                            país en la Santa Sede.
                        </p>
                    </div>

                    <div className="lay-sidebar">
                        {/* Cuerpo */}
                        <div className="sidebar__main">
                            <div className="row">
                                <div className="col-12 ">
                                    {/* Bajada y autor fecha más apertura */}
                                    {children[3]}
                                </div>
                            </div>
                            <section className="cuerpo__nota">
                                <div className="row">
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
                    {/* Newsletter */}
                    <div className="lay">{children[8]}</div>
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
    'Apertura',
    'Pre-Titulo',
    'Titulo',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Pos-Cuerpo',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaFotoAl100.sections = pageBuilderSections;

lnNotaFotoAl100.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(lnNotaFotoAl100);
