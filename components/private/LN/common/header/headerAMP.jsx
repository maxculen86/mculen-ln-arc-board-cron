import React from 'react';
import NavBarMobile from '../navbar';
import Button from '../../../common/com-button';
import Link from '../../../common/link';
import Icon from '../../../common/icon';
import ComLogo from '../../../common/com-logo';

const headerAMP = props => {
    return (
        <>
            <header id="header" className="header">
                <div className="lay">
                    <div className="row">
                        <div className="col-4 header__left">
                            <Button
                                classCondition="--tertiary"
                                iconName="menu"
                                on="tap:sidebar-left.toggle"
                            >
                                Secciones
                            </Button>
                        </div>
                        <div className="col-7 col-desksm-4 header__middle">
                            <ComLogo
                                href="https://www.lanacion.com.ar/"
                                title="Ir a la página principal"
                                logoName="la-nacion"
                            />
                        </div>
                        <div className="col-5 col-desksm-4 header__right">
                            <div id="user-menu" className="com-usuario">
                                <Link
                                    mod="com-button --special"
                                    id="btnsuscribite"
                                    title="Suscribite a LA NACION"
                                    href="https://suscripciones.lanacion.com.ar/suscribirme"
                                    rel="nofollow"
                                >
                                    SUSCRIBITE
                                </Link>
                                <Link
                                    mod="com-button --secondary"
                                    href="https://ingresar.lanacion.com.ar/ingresar/D/1/"
                                >
                                    INGRESAR
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <NavBarMobile amp />
            <div id="target-element-left"></div>

            <amp-sidebar
                id="sidebar-left"
                class="sample-sidebar"
                layout="nodisplay"
                side="left"
            >
                {' '}
                <section className="header_sidebar">
                    <ComLogo
                        logoName="la-nacion-desktop"
                        href={isHome ? '#' : 'https://www.lanacion.com.ar/'}
                        title="Ir a la página principal"
                    />
                    <Button on="tap:sidebar-left.close" iconName="close" />
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
                                    <Icon name="arrow-right" />
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
                                    <Icon name="arrow-right" />
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
                                    <Icon name="arrow-right" />
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
                                    <Icon name="arrow-right" />
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
                                    <Icon name="arrow-right" />
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
                                    <Icon name="arrow-right" />
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
                                    <Icon name="arrow-right" />
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
                                        href="https://edicionimpresa.lanacion.com.ar/la-nacion"
                                        className="url-link"
                                    >
                                        Edición Impresa
                                    </a>
                                    <Icon name="arrow-right" />
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
                                    {/* <li className="menu_secciones">
                                        <a href="https://www.lanacion.com.ar/humor">
                                            Humor
                                        </a>
                                    </li> */}
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
                                    <Icon name="arrow-right" />
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
        </>
    );
};

export default headerAMP;
