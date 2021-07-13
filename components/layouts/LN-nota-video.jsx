import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import LoginProvider from '../private/LN/common/context/loginContext';

import '../../resources/dist/css/ln/pages/video.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import LoadBanners from '../private/common/banners/LoadBanners';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';

const lnNotaNoticia = ({
    children,
    outputType,
    tree,
    isAdmin,
    globalContent: {
        taxonomy: { sections },
        distributor: { name }
    },
    layout
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);
    const logo = getSectionLogo(sections, layout, name);
    //const magazine = logo ? logo.logoName : '';
    return (
        <GlobalProvider>
            <LoginProvider>
                <CommentsProvider>
                    {/* Banner MEGATOP */}
                    {bannerMegatop}
                    {/* Banner MEGATOP */}
                    <div
                        id="wrapper"
                        className={`nota video --transparent ${amp}`}
                    >
                        <Header />
                        <main>
                            <div className="--apertura">
                                {children[1]}
                                <div className="lay">
                                    {/* Titulo (breadcrumb, logo+titulo)
                                            {children[2]} */}
                                    <div className="row">
                                        <div className="col-tablet-4">
                                            <h1 className="com-title --xl">
                                                Este es un título especial de
                                                noticia con unos 110 caracteres
                                                máximo y unas cuantas líneas que
                                                ocupar
                                            </h1>
                                            <h3 className=" com-subhead --m">
                                                Subhead, bajada. Lana soñaba con
                                                volar a la luna. Todas las
                                                tardes se tumbaba en su cama y
                                                se imaginaba cómo sería su viaje
                                                a bordo de su propia nave
                                                espacial. Leno, su hermano
                                                mayor.
                                            </h3>
                                            <span class="mod-date">
                                                <time
                                                    class="com-date --twoxs"
                                                    datetime="12 de mayo de 2020"
                                                >
                                                    12 de mayo de 2020
                                                </time>
                                            </span>
                                            <div class="container-firma">
                                                <a
                                                    href="/autor/melisa-reinhold-12925/"
                                                    title="Ir a notas de Melisa Reinhold"
                                                    class="com-link --autor"
                                                >
                                                    Melisa Reinhold
                                                </a>
                                                ,{' '}
                                                <a
                                                    href="/autor/melisa-reinhold-12925/"
                                                    title="Ir a notas de Melisa Reinhold"
                                                    class="com-link --autor"
                                                >
                                                    Melisa Reinhold
                                                </a>{' '}
                                                y{' '}
                                                <a
                                                    href="/autor/melisa-reinhold-12925/"
                                                    title="Ir a notas de Melisa Reinhold"
                                                    class="com-link --autor"
                                                >
                                                    Melisa Reinhold
                                                </a>
                                            </div>
                                            <div
                                                id="v-share"
                                                className="mod-share"
                                            >
                                                <div className="container --left">
                                                    <button
                                                        id=""
                                                        type="button"
                                                        data-event=""
                                                        data-section=""
                                                        className="com-button --icon"
                                                        title="Compartir la nota en Facebook"
                                                        on=""
                                                    >
                                                        <i className="com-icon icon-facebook-filled"></i>
                                                    </button>
                                                    <button
                                                        id=""
                                                        type="button"
                                                        data-event=""
                                                        data-section=""
                                                        className="com-button   --icon "
                                                        title="Compartir la nota en Twitter"
                                                        on=""
                                                    >
                                                        <i className="com-icon icon-twitter-filled   "></i>
                                                    </button>
                                                    <button
                                                        id="whatsAppShareDesktop"
                                                        type="button"
                                                        data-event=""
                                                        data-section=""
                                                        className="com-button   --icon "
                                                        title="Compartir la nota en WhatsApp"
                                                        on=""
                                                    >
                                                        <i className="com-icon icon-whatsapp-filled"></i>
                                                    </button>
                                                </div>
                                                <div className="com-line"></div>
                                                <div className="container --right">
                                                    <button
                                                        id=""
                                                        type="button"
                                                        data-event=""
                                                        data-section=""
                                                        className="com-button --icon "
                                                        title="Compartir la nota por E-mail"
                                                        on=""
                                                    >
                                                        <i className="com-icon icon-email"></i>
                                                    </button>
                                                    <button
                                                        id=""
                                                        data-event=""
                                                        data-section=""
                                                        type="button"
                                                        className="com-button   --icon comment "
                                                        title="Ir a los comentarios de la nota"
                                                        on=""
                                                    >
                                                        <i className="com-icon icon-comment   "></i>
                                                        <span className="com-text --fourxs ">
                                                            <label
                                                                id="livefyre-commentcount"
                                                                className="livefyre-commentcount"
                                                                data-lf-site-id="356483"
                                                                data-lf-article-id="HSK5UHA2SZFB7NIASNYRKZZJEQ"
                                                            >
                                                                0
                                                            </label>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-tablet-8">
                                            <section className="mod-media">
                                                <figure className="mod-figure">
                                                    <div className="mod-video">
                                                        <div className="powa-shadow"></div>
                                                    </div>
                                                    <figcaption className="mod-figcaption">
                                                        <span className="com-text --caption --twoxs">
                                                            Esto es el epígrafe
                                                            de la foto que se
                                                            esta visualizando.
                                                            Puede tener varias
                                                            lineas.
                                                        </span>
                                                        <span class="com-text  --credit --twoxs">
                                                            LA NACION - Daro
                                                            Aguilar
                                                        </span>
                                                    </figcaption>
                                                </figure>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
                                    {/* <div className="row">
                                        <div className="col-12 "> */}
                                    {/* Bajada y autor fecha más apertura */}
                                    {/* {children[3]} */}
                                    {/* </div>
                                    </div> */}
                                    <section className="cuerpo__nota">
                                        <div className="row">
                                            {/* <div className="col-12 col-desksm-1"> */}
                                            {/* hlp-mobile-show */}
                                            {/* Left-Cuerpo Shared */}
                                            {/* {children[4]} */}
                                            {/* </div> */}
                                            <div className="col-12">
                                                {/* Pos-Apertura */}
                                                {children[5]}
                                                {/* Logo al pie */}
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Tercera */}
                                <div className="sidebar__aside hlp-tabletlm-none">
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
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {/* Bottom-Tercera */}
                                    {children[10]}
                                </div>
                            </div>
                        </main>
                        <Static id="StaticFooter">
                            <Footer />
                        </Static>
                    </div>
                    <LoadBanners />
                </CommentsProvider>
            </LoginProvider>
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
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaNoticia.sections = pageBuilderSections;

lnNotaNoticia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.shape({
                _id: PropTypes.string
            })
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(lnNotaNoticia);
