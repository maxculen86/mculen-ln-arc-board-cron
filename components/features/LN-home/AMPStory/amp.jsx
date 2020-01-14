import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';

import '../../../../resources/dist/css/ln/amp/amp-story.css';

// TODO: Armar la siguiente lista en archivos de constantes AMP

const AmpImg = 'amp-img';
const AmpVideo = 'amp-video';

const _getAssetsPath = contextPath => deployment => assets => {
    const path = `${contextPath}/resources/amp/assets`;
    return `${deployment(`${path}/${assets}`)}`;
};

const amp = props => {
    const { contextPath, deployment } = props;
    const getAssets = _getAssetsPath(contextPath)(deployment);

    return (
        <div id="wrapper" className="nota noticia">
            <header id="header" className="header">
                <div className="lay">
                    <div className="row">
                        <div className="col-4 header__left">
                            <div className="com-hamburger">
                                <span className="com-hamburger__bar"></span>
                                <span className="com-hamburger__bar"></span>
                                <span className="com-hamburger__bar"></span>
                            </div>
                        </div>
                        <div className="col-4 header__middle">
                            <a
                                href="https://www.lanacion.com.ar"
                                className="header__middle__logo"
                            >
                                <i className="logo-la-nacion"></i>
                            </a>
                        </div>
                        <div className="col-4 header__right">
                            <div id="user-menu" className="com-usuario">
                                <a
                                    className="--btn --highlight hlp-marginRight-35"
                                    href="https://ingresar.lanacion.com.ar/suscribirme"
                                >
                                    Suscribite
                                </a>
                                <button
                                    type="button"
                                    className="--btn --secondary"
                                >
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="wrap-dropdown" role="button" tabindex="0">
                <div
                    aria-label="overrlay"
                    className="overlay"
                    role="button"
                    tabindex="0"
                ></div>
                <div className="com-dropdown">
                    <section className="header__dropdown row">
                        <div className="logo__dropdown col-10">
                            <i className="logo-la-nacion"></i>
                        </div>
                        <div
                            className="close__dropdown col-2"
                            role="button"
                            tabindex="0"
                        >
                            <i className="icon-close"></i>
                        </div>
                        <div className="search__dropdown row">
                            <div className="col-12 content-input">
                                <input
                                    type="search"
                                    name="busqueda"
                                    id="txtBusqueda"
                                    data-id="buscador"
                                    className="input-buscador"
                                    placeholder="Buscar"
                                ></input>
                                <i className="icon-search"></i>
                            </div>
                        </div>
                    </section>
                    <section className="menu__dropdown">
                        <nav className="nav__dropdown">
                            <ul className="list__nav  first--nav">
                                <li className="item__nav has--children item--economía item--disabled">
                                    <a href="/economia" className="link__item">
                                        Economía
                                    </a>
                                    <button
                                        type="button"
                                        className="button__item"
                                        disabled=""
                                    >
                                        <i className="icon-down"></i>
                                    </button>
                                    <ul className="sublist__nav">
                                        <li className="item__nav ">
                                            <a
                                                href="/economia/campo"
                                                className="link__item"
                                            >
                                                Campo
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="item__nav has--children item--sociedad item--disabled">
                                    <a href="/sociedad" className="link__item">
                                        Sociedad
                                    </a>
                                    <button
                                        type="button"
                                        className="button__item"
                                        disabled=""
                                    >
                                        <i className="icon-down"></i>
                                    </button>
                                    <ul className="sublist__nav">
                                        <li className="item__nav ">
                                            <a
                                                href="/sociedad/seguridad"
                                                className="link__item"
                                            >
                                                Seguridad
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/sociedad/educacion"
                                                className="link__item"
                                            >
                                                Educacion
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/sociedad/buenos-aires"
                                                className="link__item"
                                            >
                                                Buenos Aires
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/sociedad/comunidad"
                                                className="link__item"
                                            >
                                                Comunidad
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/sociedad/salud"
                                                className="link__item"
                                            >
                                                Salud
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/sociedad/cultura"
                                                className="link__item"
                                            >
                                                Cultura
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/sociedad/ciencia"
                                                className="link__item"
                                            >
                                                Ciencia
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="item__nav has--children item--recetas item--disabled">
                                    <a href="/recetas" className="link__item">
                                        Recetas
                                    </a>
                                    <button
                                        type="button"
                                        className="button__item"
                                        disabled=""
                                    >
                                        <i className="icon-down"></i>
                                    </button>
                                    <ul className="sublist__nav">
                                        <li className="item__nav ">
                                            <a
                                                href="/recetas/celiacos-sin-gluten"
                                                className="link__item"
                                            >
                                                Celíacos sin gluten
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/recetas/carnes"
                                                className="link__item"
                                            >
                                                Carnes
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/recetas/postres"
                                                className="link__item"
                                            >
                                                Postres
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/recetas/ensaladas"
                                                className="link__item"
                                            >
                                                Ensaladas
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/recetas/veganas"
                                                className="link__item"
                                            >
                                                Veganas
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="list__nav  secondary--nav">
                                <li className="item__nav item--brando item--disabled">
                                    <a
                                        href="/revistas/brando"
                                        className="link__item"
                                    >
                                        Brando
                                    </a>
                                    <ul className="sublist__nav"></ul>
                                </li>
                                <li className="item__nav item--algo item--disabled">
                                    <a
                                        href="https://www.lanacion.com.ar/"
                                        className="link__item"
                                    >
                                        Algo
                                    </a>
                                    <ul className="sublist__nav"></ul>
                                </li>
                                <li className="item__nav has--children item--revistas item--disabled">
                                    <a href="/revistas" className="link__item">
                                        Revistas
                                    </a>
                                    <button
                                        type="button"
                                        className="button__item"
                                        disabled=""
                                    >
                                        <i className="icon-down"></i>
                                    </button>
                                    <ul className="sublist__nav">
                                        <li className="item__nav ">
                                            <a
                                                href="/revistas/revista-rolling-stone"
                                                className="link__item"
                                            >
                                                Rolling Stone
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/revistas/revista-living"
                                                className="link__item"
                                            >
                                                Living
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/revistas/ohlala"
                                                className="link__item"
                                            >
                                                Ohlala
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/revistas/revista-jardin"
                                                className="link__item"
                                            >
                                                Jardin
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/revistas/hola"
                                                className="link__item"
                                            >
                                                Hola
                                            </a>
                                        </li>
                                        <li className="item__nav ">
                                            <a
                                                href="/revistas/revista-lugares"
                                                className="link__item"
                                            >
                                                Lugares
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </div>
            </div>
            <main>
                <div className="lay">
                    <header className="row titulo">
                        <div className="col-12">
                            <nav className="com-breadcrumb ">
                                <a href="https://www.lanacion.com.ar">
                                    LA NACION
                                </a>
                                <a href="/economia">Economía</a>
                            </nav>
                            <h1 className="com-title-nota">
                                Pruebas de la migración
                            </h1>
                            <div class="com-tag cont_tags">
                                <a class="com-item" href="/recetas/tortas">
                                    Tortas
                                </a>
                                <a class="com-item" href="/recetas/veganas">
                                    Veganas
                                </a>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="lay-sidebar">
                    <div className="sidebar__main">
                        <div className="row">
                            <div class="col-12">
                                <div class="row mod-authordate">
                                    <div class="col-12">
                                        <p class="com-date">
                                            13 de Diciembre de 2019 • 15:51
                                        </p>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="com-author">
                                        <span>Por </span>
                                        <div class="com-author">
                                            <span> Mauro Massimino </span>
                                            <a href="#"> Mauro Massimino </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 ">
                                <section className="cont-figure">
                                    <a
                                        href="/deportes/probando-breaking-news-nid/"
                                        className="figure content-pic picture zoom"
                                    >
                                        <amp-img
                                            width="3"
                                            height="2"
                                            layout="responsive"
                                            src="https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                                            alt=""
                                        ></amp-img>
                                    </a>
                                    <section className="com-epigrafe">
                                        <p className="text">Epigrafe de foto</p>
                                        <p className="small">
                                            Fuente: LA NACION - Crédito: Enrique
                                            García Medina
                                        </p>
                                    </section>
                                </section>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1 hlp-marginBottom-40 hlp-tablet-none">
                                <div id="v-share" className="com-share">
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
                            </div>
                            <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                <div className="row">
                                    <p className="text capital">
                                        That said, &lt;a
                                        href="https://www.google.com/"
                                        target=_blank&gt;Google&lt;/a&gt; will
                                        tell you everything you need to know. An
                                        interview can be a very useful tool as
                                        well, but don’t waste time asking &lt;a
                                        href="https://www.lanacion.com.ar/"
                                        target=_blank&gt;Lanacion.com&lt;/a&gt;
                                        syntax or &lt;a
                                        href="https://www.google.com/"
                                        target=_blank&gt;language&lt;/a&gt;
                                        quirks. You need to see the big picture.
                                        Ask about
                                    </p>
                                    <p className="text">
                                        That said,{' '}
                                        <b>asda dhasuidash dsuiahd saui d</b>no
                                        single will{' '}
                                        <em> asda dhasuidash dsuiahd saui d</em>{' '}
                                        tell you everything you need to &lt;a
                                        href="https://www.lanacion.com.ar/"
                                        target=_blank&gt;know&lt;/a&gt;. An
                                        &lt;i&gt;interview&lt;/i&gt; can be a
                                        very useful tool as well, but don’t
                                        waste &lt;b&gt;time&lt;/b&gt; asking
                                        about syntax or language quirks. You
                                        need to see the big picture. Ask about
                                    </p>
                                    <p className="text">&lt;br/&gt;</p>
                                    <h2 className="com-subtitle-nota-1">
                                        soy un subtitulo de nota 1
                                    </h2>
                                    <h4 class="com-subtitle_list">
                                        Recetas con:
                                    </h4>
                                    <div class="row">
                                        <div class="col-tablet-3 hlp-marginBottom-mobile-40">
                                            <h4 class="com-title-section-s">
                                                Ingredientes
                                            </h4>
                                            <div>
                                                <h4 class="com-title-section-xs hlp-marginBottom-20">
                                                    Para la torta
                                                </h4>
                                                <ul class="com-unordered">
                                                    <li class="com-item">
                                                        aceite de girasol, 90 cc
                                                    </li>
                                                    <li class="com-item">
                                                        azúcar integral
                                                        organica, 400 gr
                                                    </li>
                                                    <li class="com-item">
                                                        tofu, 130 gr
                                                    </li>
                                                    <li class="com-item">
                                                        leche de almendras, 85
                                                        cc
                                                    </li>
                                                    <li class="com-item">
                                                        harina 0000 organica,
                                                        400 gr
                                                    </li>
                                                    <li class="com-item">
                                                        ralladura de naranja, 20
                                                        gr
                                                    </li>
                                                    <li class="com-item">
                                                        puré de moras, 500 gr
                                                    </li>
                                                    <li class="com-item">
                                                        esencia de vainilla, 12
                                                        gr
                                                    </li>
                                                    <li class="com-item">
                                                        moras enteras, 200 gr
                                                    </li>
                                                    <li class="com-item">
                                                        polvo de hornear, 20 gr
                                                    </li>
                                                    <li class="com-item">
                                                        sal marina, 3 gr
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 class="com-title-section-xs hlp-marginBottom-20">
                                                    Para la garrapiñada de
                                                    avellanas
                                                </h4>
                                                <ul class="com-unordered">
                                                    <li class="com-item">
                                                        avellanas, 200 gr
                                                    </li>
                                                    <li class="com-item">
                                                        agua, 200 cc
                                                    </li>
                                                    <li class="com-item">
                                                        azúcar, 200 gr
                                                    </li>
                                                    <li class="com-item">
                                                        vainilla, 200 cc
                                                    </li>
                                                    <li class="com-item">
                                                        sal, una pizca{' '}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 class="com-title-section-xs hlp-marginBottom-20">
                                                    Para la terminación
                                                </h4>
                                                <ul class="com-unordered">
                                                    <li class="com-item">
                                                        moras frescas, c/n
                                                    </li>
                                                    <li class="com-item">
                                                        arándanos frescos, c/n
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 class="com-title-section-xs hlp-marginBottom-20">
                                                    Para la crema “chantilly”
                                                </h4>
                                                <ul class="com-unordered">
                                                    <li class="com-item">
                                                        tofu, 220 gr
                                                    </li>
                                                    <li class="com-item">
                                                        azucar organica, 80 gr
                                                    </li>
                                                    <li class="com-item">
                                                        vainilla, 15 gr
                                                    </li>
                                                    <li class="com-item">
                                                        aceite de coco neutro,
                                                        50 gr
                                                    </li>
                                                    <li class="com-item">
                                                        leche de almendras, 30
                                                        gr
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-tablet-8 offset-tablet-1">
                                            <h4 class="com-title-section-m">
                                                Preparación
                                            </h4>
                                            <div>
                                                <h4 class="com-title-section-xs hlp-marginBottom-20">
                                                    Para la chantilly:{' '}
                                                </h4>
                                                <ol class="com-ordered">
                                                    <li class="com-item">
                                                        Colocar todos los
                                                        ingredientes dentro de
                                                        una licuadora. Licuar
                                                        hasta que la mezcla
                                                        quede lisa y homogénea.
                                                        Luego enfriar para que
                                                        tome consistencia.{' '}
                                                    </li>
                                                </ol>
                                            </div>
                                            <div>
                                                <h4 class="com-title-section-xs hlp-marginBottom-20">
                                                    Para la garrapiñada:{' '}
                                                </h4>
                                                <ol class="com-ordered">
                                                    <li class="com-item">
                                                        en una cacerolita sobre
                                                        el fuego, agregar el
                                                        agua y el azúcar.
                                                        Cocinar hasta disolver,
                                                        agregar las avellanas y
                                                        cocinar hasta que el
                                                        azúcar se cristalice.
                                                        Seguir cocinando un
                                                        instante más, agregar la
                                                        vainilla y la sal y
                                                        cocinar hasta lograr la
                                                        garrapiñada, debiendo
                                                        quedar esta crocante y
                                                        acaramelada.{' '}
                                                    </li>
                                                </ol>
                                            </div>
                                            <div>
                                                <h4 class="com-title-section-xs hlp-marginBottom-20">
                                                    Para la torta:{' '}
                                                </h4>
                                                <ol class="com-ordered">
                                                    <li class="com-item">
                                                        precalentar el horno a
                                                        170 ºC{' '}
                                                    </li>
                                                    <li class="com-item">
                                                        Mezclar por un lado el
                                                        azúcar con el aceite en
                                                        un bowl. Por otro lado
                                                        licuar el tofu con la
                                                        leche de almendras y la
                                                        vainilla. Incorporar la
                                                        mezcla de tofu a la
                                                        preparación anterior, la
                                                        ralladura de naranjas y
                                                        el puré de moras. Por
                                                        último, incorporar los
                                                        secos previamente
                                                        tamizados y las moras.
                                                        Colocar en un molde de
                                                        22 cm aceitado con papel
                                                        manteca la mezcla y
                                                        cocinar a 160ºC. Por 60
                                                        minutos aproximadamente.
                                                    </li>
                                                    <li class="com-item">
                                                        Retirar del horno y
                                                        enfriar. Terminar con la
                                                        crema “chantilly” de
                                                        tofu más los arándanos,
                                                        moras y garrapiñada.{' '}
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <blockquote className="blockquote">
                                        &lt;b&gt;Lorem ipsum dolor sit
                                        amet&lt;/b&gt;, consectetur adipiscing
                                        elit. Donec nulla elit, fermentum non
                                        neque sed, feugiat interdum
                                        &lt;i&gt;ligula&lt;/i&gt;. Nulla odio
                                        lacus, pretium quis lacus in, dapibus
                                        elementum purus.
                                    </blockquote>
                                    <p className="text">
                                        That said, no single exercise will tell
                                        you everything you need to know. An
                                        interview can be a very useful tool as
                                        well, but don’t waste time asking about
                                        syntax or language quirks. You need to
                                        see the big picture. Ask about
                                    </p>

                                    <div class="col-12">
                                        <amp-carousel
                                            width="450"
                                            height="300"
                                            layout="responsive"
                                            type="slides"
                                        >
                                            <section className="cont-figure">
                                                <a className="figure">
                                                    <amp-img
                                                        src="https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                                                        width="3"
                                                        height="2"
                                                        layout="responsive"
                                                    ></amp-img>
                                                </a>
                                                <section className="com-epigrafe">
                                                    <p className="text">
                                                        Epigrafe
                                                    </p>
                                                    <p className="small">
                                                        Fuente: LA NACION -
                                                        Crédito: LA NACION
                                                    </p>
                                                </section>
                                                <p className="paginator">
                                                    1&nbsp;de&nbsp;4
                                                </p>
                                            </section>

                                            <section className="cont-figure">
                                                <a className="figure">
                                                    <amp-img
                                                        src="https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                                                        width="3"
                                                        height="2"
                                                        layout="responsive"
                                                    ></amp-img>
                                                </a>
                                                <section className="com-epigrafe">
                                                    <p className="text">
                                                        Epigrafe
                                                    </p>
                                                    <p className="small">
                                                        Fuente: LA NACION -
                                                        Crédito: LA NACION
                                                    </p>
                                                </section>
                                                <p className="paginator">
                                                    1&nbsp;de&nbsp;4
                                                </p>
                                            </section>

                                            <section className="cont-figure">
                                                <a className="figure">
                                                    <amp-img
                                                        src="https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                                                        width="3"
                                                        height="2"
                                                        layout="responsive"
                                                    ></amp-img>
                                                </a>
                                                <section className="com-epigrafe">
                                                    <p className="text">
                                                        Epigrafe
                                                    </p>
                                                    <p className="small">
                                                        Fuente: LA NACION -
                                                        Crédito: LA NACION
                                                    </p>
                                                </section>
                                                <p className="paginator">
                                                    1&nbsp;de&nbsp;4
                                                </p>
                                            </section>
                                        </amp-carousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar__aside hlp-tablet-none"></div>
                </div>
            </main>
        </div>
    );
};

amp.propTypes = {
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string.isRequired
};

export default Context(amp);
