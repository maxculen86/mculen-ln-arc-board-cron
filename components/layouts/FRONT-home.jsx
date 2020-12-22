import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import LoginProvider from '../private/LN/common/context/loginContext';
import ComTitle from '../private/common/com-title';
import Article from '../private/common/mod-article';

import '../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../private/LN/acumulado/context/globalContextAcu';

// import withCollections from '../private/LN/acumulado/hocs/withCollections';

const pageBuilderSections = ['Sección 1'];

const LNHome = props => {
    const {
        children: [seccion1],
        outputType
    } = props;
    const amp = outputType === 'amp' ? 'amp' : '';

    return (
        <LoginProvider>
            <GlobalProviderAcu>
                {seccion1}
                <div id="wrapper" className={`home ${amp}`}>
                    <Header />
                    <main>
                        <div className="row">
                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    <section className="mod-banner">
                                        <div className="com-banner cabezal_dsk">
                                            Banner
                                        </div>
                                    </section>
                                    <section className="box-articles --focal --left">
                                        <div className="row">
                                            <div className="col-tablet-8">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x200"
                                                    link="#"
                                                    titleText="Focal izquierdo. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    titleTag="h1"
                                                    titleSize="--xl"
                                                    subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                            <div className="col-tablet-4">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x201"
                                                    link="#"
                                                    titleText="Los nexos ocultos entre los Moyano y la barra brava de Independiente"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x202"
                                                    link="#"
                                                    titleText='El Gobierno "autoengañado", el incendio y por qué cayó "en la trampa"'
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x203"
                                                link="#"
                                                titleText="La dura respuesta de Bullrich a la acusación de Frederic"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x204"
                                                link="#"
                                                titleText="La historia de la fábrica que prometía hacer cientos de vagones"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x205"
                                                link="#"
                                                titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>

                                    <section className="mod-banner">
                                        <div className="com-banner billboard_dsk">
                                            Banner
                                        </div>
                                    </section>

                                    <section className="mod-anexo">
                                        <div className="com-anexo">ANEXO 2</div>
                                    </section>

                                    <section className="box-articles --focal --right">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row">
                                            <div className="col-tablet-8">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x206"
                                                    link="#"
                                                    titleSize="--l"
                                                    titleText="Focal derecho. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                            <div className="col-tablet-4">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x207"
                                                    link="#"
                                                    titleText="Nota NYT. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    titleTag="h1"
                                                    titleSize="--xl"
                                                    subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <div className="row-gap-tablet-2">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/600x400"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/600x401"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --opinion">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo caja opinión"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row">
                                            <div className="col-tablet-5">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x208"
                                                    link="#"
                                                    titleSize="--l"
                                                    titleText="Opinión 1. Sonrisas arriba del escenario y disputas abajo"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                            <div className="col-tablet-4">
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x300/?face"
                                                    link="#"
                                                    titleText="Opinión 2. Una ventana al bienestar que promete el verano"
                                                    authors="Nombre Apellido"
                                                />
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x301/?face"
                                                    link="#"
                                                    titleText="Opinión 3. Trumpismo, maoísmo y peronismo"
                                                    authors="Nombre Apellido"
                                                />
                                            </div>
                                            <div className="col-tablet-3">
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x302/?face"
                                                    link="#"
                                                    titleText="Opinión 4. Inolvidable declaración de amor a la ciudad de Madrid"
                                                    authors="Nombre Apellido"
                                                />
                                            </div>
                                        </section>
                                        <section className="mod-footersection">
                                            <ComTitle
                                                content="EDITORIALES"
                                                size="--xs"
                                            />
                                            <ul className="com-unordered">
                                                <li>
                                                    <a
                                                        href="/editoriales/mafia-politica-narcotrafico-peor-pandemia-nid2547665"
                                                        className="--xs"
                                                        title="Mafia política y narcotráfico, la peor pandemia"
                                                    >
                                                        Mafia política y
                                                        narcotráfico, la peor
                                                        pandemia
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="/editoriales/la-remocion-jueces-fiscales-nid2547655"
                                                        className="--xs"
                                                        title="La remoción de jueces y fiscales"
                                                    >
                                                        La remoción de jueces y
                                                        fiscales
                                                    </a>
                                                </li>
                                            </ul>
                                        </section>
                                    </section>

                                    <section className="mod-banner">
                                        <div className="com-banner billboard_dsk">
                                            Banner
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo caja notas 3, 6 o 9"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x209"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x210"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x211"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>

                                    <section className="box-articles --cinema">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/1260x500"
                                            link="#"
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            titleSize="--l"
                                            authors="Por Nombre Apellido"
                                        />
                                    </section>

                                    <section className="box-articles --highlight --blue">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x601"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x602"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --highlight --pink">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x603"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x604"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x605"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --teal">
                                        <section className="mod-headersection --bg">
                                            <ComTitle
                                                content="Techo de sección: La casa Breuer Moreno se prepara para su último remate"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x212"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x213"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x214"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x215"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x216"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x217"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>

                                    <section className="box-articles --highlight --teal">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x606"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x607"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x608"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --highlight --red">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x609"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x610"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x611"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --pink">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x233"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x234"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x236"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x237"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x238"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>

                                    <section className="box-articles">
                                        <section className="mod-headersection --bg">
                                            <ComTitle
                                                content="Techo de sección: La casa Breuer Moreno se prepara para su último remate"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x233"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x234"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x236"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x237"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x238"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>
                                </div>
                                <div className="sidebar__aside hlp-tablet-none"></div>
                            </div>
                            <div className="lay">
                                <section className="mod-ranking">
                                    <section className="mod-headersection">
                                        <ComTitle
                                            content="Las más leídas"
                                            size="--l"
                                        />
                                        <div className="com-line"></div>
                                    </section>
                                    <ol className="com-ordered row-gap-tablet-4">
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x220/?ranking"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x225/?ranking"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x230/?ranking"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235/?ranking"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </li>
                                    </ol>
                                </section>

                                <section className="box-articles --cinema">
                                    <Article
                                        frontdemo
                                        srcdemo="https://source.unsplash.com/1260x500"
                                        link="#"
                                        titleText="La casa Breuer Moreno se prepara para su último remate"
                                        titleSize="--l"
                                        authors="Por Nombre Apellido"
                                    />
                                </section>
                            </div>

                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    <section className="box-articles --cinema">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/1260x505"
                                            link="#"
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            titleSize="--l"
                                            authors="Por Nombre Apellido"
                                        />
                                    </section>
                                    <section className="box-articles --focal --left">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo caja opinión"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row">
                                            <div className="col-tablet-8">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x200"
                                                    link="#"
                                                    titleText="Focal izquierdo. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    titleTag="h1"
                                                    titleSize="--xl"
                                                    subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                            <div className="col-tablet-4">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x201"
                                                    link="#"
                                                    titleText="Los nexos ocultos entre los Moyano y la barra brava de Independiente"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x202"
                                                    link="#"
                                                    titleText='El Gobierno "autoengañado", el incendio y por qué cayó "en la trampa"'
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x203"
                                                link="#"
                                                titleText="La dura respuesta de Bullrich a la acusación de Frederic"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x204"
                                                link="#"
                                                titleText="La historia de la fábrica que prometía hacer cientos de vagones"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x205"
                                                link="#"
                                                titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>

                                    <section className="box-articles --focal --right">
                                        <div className="row">
                                            <div className="col-tablet-8">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x206"
                                                    link="#"
                                                    titleSize="--l"
                                                    titleText="Focal derecho. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                            <div className="col-tablet-4">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x207"
                                                    link="#"
                                                    titleText="Nota NYT. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    titleTag="h1"
                                                    titleSize="--xl"
                                                    subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <div className="row-gap-tablet-2">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/600x400"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/600x401"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --opinion">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo caja opinión"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row">
                                            <div className="col-tablet-5">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x208"
                                                    link="#"
                                                    titleSize="--l"
                                                    titleText="Opinión 1. Sonrisas arriba del escenario y disputas abajo"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                            <div className="col-tablet-4">
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x300/?face"
                                                    link="#"
                                                    titleText="Opinión 2. Una ventana al bienestar que promete el verano"
                                                    authors="Nombre Apellido"
                                                />
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x301/?face"
                                                    link="#"
                                                    titleText="Opinión 3. Trumpismo, maoísmo y peronismo"
                                                    authors="Nombre Apellido"
                                                />
                                            </div>
                                            <div className="col-tablet-3">
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x302/?face"
                                                    link="#"
                                                    titleText="Opinión 4. Inolvidable declaración de amor a la ciudad de Madrid"
                                                    authors="Nombre Apellido"
                                                />
                                            </div>
                                        </section>
                                    </section>

                                    <section className="box-articles">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo caja notas 3, 6 o 9"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x209"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x210"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x211"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>

                                    <section className="box-articles --cinema">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/1260x500"
                                            link="#"
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            titleSize="--l"
                                            authors="Por Nombre Apellido"
                                        />
                                    </section>

                                    <section className="box-articles --highlight --blue">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x601"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x602"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --highlight --pink">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x603"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x604"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x605"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --teal">
                                        <section className="mod-headersection --bg">
                                            <ComTitle
                                                content="Techo de sección: La casa Breuer Moreno se prepara para su último remate"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x212"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x213"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x214"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x215"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x216"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x217"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>

                                    <section className="box-articles --highlight --teal">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x606"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x607"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x608"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --highlight --red">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x609"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x610"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x611"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --pink">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x233"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x234"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x236"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x237"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x238"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>

                                    <section className="box-articles">
                                        <section className="mod-headersection">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line"></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x230"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x231"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x232"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x233"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x234"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x236"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x237"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x238"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </section>
                                    </section>
                                </div>
                                <div className="sidebar__aside hlp-tablet-none"></div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </GlobalProviderAcu>
        </LoginProvider>
    );
};

LNHome.propTypes = {
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired
};

LNHome.sections = pageBuilderSections;

export default Consumer(LNHome);
