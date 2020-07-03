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

//import '../../resources/dist/css/ln/pages/recipe.css';

//import '../../resources/dist/css/ln/modules/header-desktop.css';
//import '../../resources/dist/css/ln/modules/header-mobile.css';

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

// import '../../resources/dist/css/ln/components/colecciones.css';
// import '../../resources/dist/css/ln/components/carta-lectores.css';

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
                    <div className="--body">
                        <div className="lay">
                            <p className="text element-paragraph">
                                <strong>El nombre de Squeff</strong>, muy
                                cercana al kirchnerismo, comenzó a sonar en los
                                pasillos de la Cancillería luego del traspié del
                                Gobierno tras
                                <a
                                    href="https://www.lanacion.com.ar/politica/antes-del-viaje-alberto-fernandez-se-cayo-nid2324570"
                                    title="la caída sorpresiva de la postulación de Luis Bellando"
                                    className="com-link "
                                    data-reactroot=""
                                >
                                    la caída sorpresiva de la postulación de
                                    Luis Bellando
                                </a>
                                , otro diplomático de carrera, para representar
                                al país en la Santa Sede.
                            </p>
                        </div>
                        <div className="lay">
                            <p className="text element-paragraph">
                                En un lugar de la Mancha, de cuyo nombre no
                                quiero acordarme, no ha mucho tiempo que vivía
                                un hidalgo de los de lanza en astillero.
                                <br />
                                Quieren decir que tenía el sobrenombre de
                                Quijada, o Quesada, que en esto hay alguna
                                diferencia en los autores que deste caso
                                escriben.
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-12 ">
                                <section className="cuerpo__nota">
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
                                                <div className="lay">
                                                    <figcaption className="mod-figcaption">
                                                        <span className="com-text --caption">
                                                            Este texto es la
                                                            bajada de la imagen,
                                                            van con un par de
                                                            lineas, puede tener
                                                            al menos unas
                                                            cuatro.
                                                        </span>
                                                        <span className="com-text --credit">
                                                            LA NACION - Enrique
                                                            Medina
                                                        </span>
                                                    </figcaption>
                                                </div>
                                            </figure>
                                        </section>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div className="lay">
                            <p className="text element-paragraph">
                                <strong>El nombre de Squeff</strong>, muy
                                cercana al kirchnerismo, comenzó a sonar en los
                                pasillos de la Cancillería luego del traspié del
                                Gobierno tras
                                <a
                                    href="https://www.lanacion.com.ar/politica/antes-del-viaje-alberto-fernandez-se-cayo-nid2324570"
                                    title="la caída sorpresiva de la postulación de Luis Bellando"
                                    className="com-link "
                                    data-reactroot=""
                                >
                                    la caída sorpresiva de la postulación de
                                    Luis Bellando
                                </a>
                                , otro diplomático de carrera, para representar
                                al país en la Santa Sede.
                            </p>
                        </div>
                        <div className="lay">
                            <ul class="com-unordered">
                                <li class="com-item">
                                    El Grand Hotel del Tucumán realiza hasta el
                                    domingo próximo una feria de artesanías.
                                </li>
                                <li class="com-item">
                                    Que permite apreciar las diversas
                                    manifestaciones culturales de la comunidad
                                    provincial.
                                </li>
                                <li class="com-item">
                                    Se exponen, entre otros, trabajos en vidrio,
                                    platería, madera, pocelanas, cueros y papel
                                    maché.
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-12 ">
                                <section className="cuerpo__nota">
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
                                                <div className="lay">
                                                    <figcaption className="mod-figcaption">
                                                        <span className="com-text --caption">
                                                            Este texto es la
                                                            bajada de la imagen,
                                                            van con un par de
                                                            lineas, puede tener
                                                            al menos unas
                                                            cuatro.
                                                        </span>
                                                        <span className="com-text --credit">
                                                            LA NACION - Enrique
                                                            Medina
                                                        </span>
                                                    </figcaption>
                                                </div>
                                            </figure>
                                        </section>
                                    </div>
                                </section>
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
