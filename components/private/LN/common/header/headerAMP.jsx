import React from 'react';

const headerAMP = props => {
    return (
        <>
            <header id="header" className="header">
                <div className="lay">
                    <div className="row">
                        <div className="col-4 header__left">
                            {/* <button
                                on="tap:sidebar-left.toggle"
                                className="icon-menu"
                            >
                                Secciones
                            </button> */}
                            <button
                                type="button"
                                on="tap:sidebar-left.toggle"
                                class="com-button  --tertiary --icon menu "
                            >
                                <i class="com-icon icon-menu   "></i>
                                <span class="com-text  ">Secciones</span>
                            </button>
                        </div>
                        <div className="col-7 col-desksm-4 header__middle">
                            <a
                                href="https://www.lanacion.com.ar"
                                className="header__middle__logo"
                            >
                                <i className="logo-la-nacion"></i>
                            </a>
                        </div>
                        <div className="col-5 col-desksm-4 header__right">
                            <div id="user-menu" className="com-usuario">
                                {/* <div className="row">
                                    <div class="col-desksm-4 hlp-tablet-none">
                                        {' '}
                                    </div>
                                    <div className="col-12 col-desksm-4">
                                        <a
                                            className="suscribir__header com-button --special --compact"
                                            href="https://suscripciones.lanacion.com.ar/suscribirme"
                                        >
                                            SUSCRIBITE
                                        </a>
                                    </div>
                                    <div className="col-12 col-desksm-4">
                                        <button
                                            type="button"
                                            className="com-button --secondary --compact"
                                        >
                                            INGRESAR
                                        </button>
                                    </div>
                                </div> */}
                                <a
                                    className=" com-button --special"
                                    href="https://suscripciones.lanacion.com.ar/suscribirme"
                                >
                                    SUSCRIBITE
                                </a>

                                <button
                                    type="button"
                                    className="com-button --secondary"
                                >
                                    INGRESAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <amp-sidebar
                id="sidebar-left"
                class="sample-sidebar"
                layout="nodisplay"
                side="left"
            >
                {' '}
                <section className="header_sidebar">
                    <a
                        href="https://www.lanacion.com.ar"
                        className="header__middle__logo"
                    >
                        <i className="logo-la-nacion"></i>
                    </a>
                    <button
                        on="tap:sidebar-left.close"
                        className="icon-close"
                    ></button>
                </section>
                <ul className="menu-nav">
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a
                                        href="https://www.lanacion.com.ar/ultimas-noticias"
                                        className="url-link"
                                    >
                                        Últimas noticias
                                    </a>
                                </h2>

                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/transito">
                                            Tránsito
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://servicios.lanacion.com.ar/pronostico-del-tiempo">
                                            Clima
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/data">
                                            LN-data
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li">
                        <a href="https://www.lanacion.com.ar/politica">
                            Política
                        </a>
                    </li>
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a
                                        href="https://www.lanacion.com.ar/economia"
                                        className="url-link"
                                    >
                                        Economía
                                    </a>
                                </h2>
                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/dolar-hoy">
                                            Dolar hoy
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/economia/campo">
                                            Campo
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/propiedades">
                                            Propiedades
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/economia/comercio-exterior">
                                            Comercio exterior
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/autos">
                                            Autos
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/economia/indices">
                                            Indices
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/economia/calcula-cuanto-vas-pagar-ganancias-2019-nid2201209">
                                            Calculadora ganancias
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://remates.lanacion.com.ar/">
                                            Remates ganaderos
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li">
                        <a href="https://www.lanacion.com.ar/el-mundo">
                            El mundo
                        </a>
                    </li>
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a
                                        href="https://www.lanacion.com.ar/sociedad"
                                        className="url-link"
                                    >
                                        Sociedad
                                    </a>
                                </h2>
                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/buenos-aires">
                                            Buenos aires
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/seguridad">
                                            Seguridad
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/educacion">
                                            Educación
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/cultura">
                                            Cultura
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/comunidad">
                                            Comunidad
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/salud">
                                            Salud
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/ciencia">
                                            Ciencia
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/opinion">
                                            Guia: Hablemos de...
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a
                                        href="https://www.lanacion.com.ar/opinion/"
                                        className="url-link"
                                    >
                                        Opinión
                                    </a>
                                </h2>
                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/opinion/columnistas">
                                            Columnistas
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a
                                        href="https://www.lanacion.com.ar/deportes"
                                        className="url-link"
                                    >
                                        Deportes
                                    </a>
                                </h2>
                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/deportes/futbol">
                                            Fútbol
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/deportes/estadisticas/argentina-primera-anual-c2703/fixture#">
                                            Fixture
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/deportes/estadisticas/argentina-primera-anual-c2703/posiciones#">
                                            Posiciones
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/deportes/rugby">
                                            Rugby
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/deportes/tenis">
                                            Tenis
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a
                                        href="https://www.lanacion.com.ar/lifestyle"
                                        className="url-link"
                                    >
                                        Lifestyle
                                    </a>
                                </h2>
                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/moda-y-belleza">
                                            Moda y belleza
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/tema/turismo-tid46731">
                                            Turismo
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/tecnologia-t47502">
                                            Tecnología
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/horoscopo">
                                            Horóscopo
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/feriados">
                                            Feriados
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://servicios.lanacion.com.ar/loterias">
                                            Loterías y quinielas
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/recetas/">
                                            Cocina y recetas
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="#">Avisos fúnebres</a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a
                                        href="https://www.lanacion.com.ar/espectaculos"
                                        className="url-link"
                                    >
                                        Espectáculos
                                    </a>
                                </h2>
                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/cartelera-de-cine">
                                            Cartelera de cine
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/cartelera-de-teatro">
                                            Cartelera de teatro
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a
                                        href="https://www.lanacion.com.ar/edicion-impresa"
                                        className="url-link"
                                    >
                                        Ed Impresa
                                    </a>
                                </h2>
                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://pdf.lanacion.com.ar/">
                                            Acceso PDF
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/tema/la-nacion-revista-tid56307">
                                            LA NACION revista
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/sabado">
                                            Sábado
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/ideas">
                                            Ideas
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/editoriales">
                                            Editoriales
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/opinion/carta-de-lectores">
                                            Carta de lectores
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/humor">
                                            Humor
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://servicios.lanacion.com.ar/edicion-impresa/avisos-funebres">
                                            Avisos fúnebres
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="http://servicios.lanacion.com.ar/edicion-impresa/avisos-sociales">
                                            Avisos Sociales
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li desplegable">
                        <amp-accordion class="sample">
                            <section>
                                <h2 className="arrow-right">
                                    <a href="#" className="url-link">
                                        Revistas
                                    </a>
                                </h2>
                                <ul className="menu">
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/revista-ohlala">
                                            OHLALÁ!
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/revista-hola">
                                            ¡HOLA!
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/revista-rolling-stone">
                                            RollingStone
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/revista-lugares">
                                            Lugares
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/revista-living">
                                            Living
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/revista-brando">
                                            Brando
                                        </a>
                                    </li>
                                    <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/revista-jardin">
                                            Jardín
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </amp-accordion>
                    </li>
                    <li className="menu_li">
                        <a
                            href="https://lnmas.lanacion.com.ar/"
                            target="_blank"
                        >
                            LN+
                        </a>
                    </li>
                    <li className="menu_li">
                        <a href="https://club.lanacion.com.ar/">
                            Club LA NACION
                        </a>
                    </li>
                </ul>
            </amp-sidebar>

            <nav className="com-nav-mobile">
                <div className="row">
                    <a
                        href="https://www.lanacion.com.ar/"
                        className="col-3 item-foo"
                    >
                        <i className="icon-home" />
                        <p>Home</p>
                    </a>
                    <button
                        type="button"
                        className="col-3 item-foo"
                        on="tap:sidebar-left.toggle"
                    >
                        <i className="icon-sections" />
                        <p>Secciones</p>
                    </button>
                    <a
                        href="https://club.lanacion.com.ar/"
                        className="col-3 item-foo"
                    >
                        <i className="icon-club" />
                        <p>Club LA NACION</p>
                    </a>
                    <a
                        href="https://myaccount.lanacion.com.ar/mi-usuario"
                        className="col-3 item-foo"
                    >
                        <i className="icon-user" />
                        <p>Mi Cuenta</p>
                    </a>
                </div>
                {/* <a href="https://www.lanacion.com.ar/" className="col-3 icon-home">
                        Home
                    </a>
                    <button on="tap:sidebar-left.toggle" className="col-3 icon-menu">
                        Secciones
                    </button>
                    <a href="https://club.lanacion.com.ar/" className="col-3 icon-club">
                        Club LA NACIÓN
                    </a>
                    <a
                        href="https://micuenta.lanacion.com.ar/mis-datos"
                        className="col-3 icon-user"
                    >
                        Mi cuenta
                    </a> */}
                <div id="target-element-left"></div>
            </nav>
        </>
    );
};

export default headerAMP;
