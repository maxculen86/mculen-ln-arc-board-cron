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
                        </div>
                    </header>
                </div>
                <div className="lay-sidebar">
                    <div className="sidebar__main">
                        <div className="row">
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
                            <div className="col-1 hlp-marginBottom-40 hlp-tablet-none"></div>
                            <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                <div className="row"></div>
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
