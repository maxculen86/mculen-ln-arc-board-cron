import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import ComTitle from '../private/common/com-title';
import Article from '../private/common/mod-article';
import HeaderSection from '../private/common/mod-headerSection';
import Dolar from '../private/common/mod-dolar';
import GlobalProvider from '../private/common/context/globalContext';
import ModPromo from '../private/common/mod-promo';
import ComButton from '../private/common/com-button';
import NewFooter from '../private/LN/common/footer';
import Anticipo from '../private/common/com-advance';
import Escudos from '../../components/features/LN-acumulado/cajaEscudo';
import SubHeader from '../private/LN/common/header/subHeader';

import '../../resources/dist/css/ln/pages/home.css';
import { GlobalProviderAcu } from '../private/LN/acumulado/context/globalContextAcu';

// import withCollections from '../private/LN/acumulado/hocs/withCollections';

const pageBuilderSections = ['Sección 1'];

const LNHome = props => {
    const {
        children: [seccion1],
        outputType
    } = props;
    const amp = outputType === 'amp' ? 'amp' : '';

    const powa = {
        _id: '76c88e0b-33e7-405f-b6ad-b6a98fef7c77',
        created_date: '2019-08-22T18:57:32Z',
        duration: 60053,
        headlines: { basic: 'FR Cibeles' },
        promo_items: {
            basic: {
                caption: 'FrontRow Cibeles',
                credits: {},
                height: 720,
                type: 'image',
                url:
                    'https://d3us6z9haan6vf.cloudfront.net/08-22-2019/t_ed25861f78d440428ed31a92b3f5c720_name_file_1280x720_2000_v3_1_.jpg',
                width: 1280
            }
        },
        publish_date: '2020-04-27T22:25:08Z',
        streams: [
            {
                height: 360,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/10/5cfe914c46e0fb000981496e/t_520577cda990476baa7a9ecf733e4a97_name_05_30_2019_t_a35f599ee6764026add3d7967f88b000_name_Marilina_Rolling_1920x1080_2/file_1280x720-2000-v3_1.mp4',
                width: 640
            },
            {
                height: 720,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/10/5cfe914c46e0fb000981496e/t_520577cda990476baa7a9ecf733e4a97_name_05_30_2019_t_a35f599ee6764026add3d7967f88b000_name_Marilina_Rolling_1920x1080_2/file_1280x720-2000-v3_1.mp4',
                width: 1280
            }
        ],
        type: 'video'
    };

    return (
        <GlobalProvider>
            <GlobalProviderAcu>
                <script
                    async
                    src="https://lanacionar.video-player.arcpublishing.com/prod/powaBoot.js"
                />
                {seccion1}
                {/* <div className="mod-banner --comercial">
                        <ComButton
                            classCondition="--secondary --compact"
                            textname="CERRAR"
                        />
                        <div
                            id="comercial_dsk"
                            className="com-banner"
                            data-google-query-id="CJa2odea1u8CFeoD0AQd0OQHtA"
                        >
                            <div id="google_ads_iframe_">
                                <iframe
                                    src="https://source.unsplash.com/800x600"
                                    width="800"
                                    height="600"
                                    scrolling="no"
                                ></iframe>
                            </div>
                        </div>
                    </div> */}
                <div id="wrapper" className={`home demofront ${amp}`}>
                    <Header />
                    <SubHeader />
                    {/* <Anticipo title="El Gobierno anticipó al mercado y dio indicios de su nueva estrategia" /> */}
                    <div className="com-anexo --anexo-1">
                        <iframe
                            src="https://especialess3.lanacion.com.ar/21/03/anexo-home-vacunas/?initialWidth=1905&amp;childId=bloque1-pymnro0&amp;parentTitle=%C3%9Altimas%20noticias%20de%20Argentina%20y%20el%20mundo%20-%20LA%20NACION&amp;parentUrl=https%3A%2F%2Fwww.lanacion.com.ar%2F"
                            width="100%"
                            scrolling="no"
                            marginheight="0"
                            frameborder="0"
                            height="198px"
                        ></iframe>
                    </div>
                    <div
                        data-module="tema_00"
                        data-is-loading="false"
                        data-is-loaded="true"
                    >
                        <section
                            className="mod-opening --bomba"
                            id="tema_00"
                            data-is-block="true"
                            data-block-name="h_tema-00"
                            data-diagramacion-id="h_bomba"
                        >
                            <Article
                                frontdemo
                                srcdemo="https://source.unsplash.com/1200x800"
                                link="#"
                                leadText="Bomba."
                                titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                titleTag="h1"
                                titleSize="--threexl"
                                // subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                authors="Por Maia Jastreblansky"
                                label="Infografía"
                                position="0001"
                            />
                        </section>
                    </div>
                    <main id="content">
                        <div className="">
                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    <section className="mod-banner">
                                        <div className="com-banner cabezal_dsk">
                                            Banner
                                        </div>
                                    </section>

                                    <Escudos />

                                    <div
                                        data-module="tema_01"
                                        data-is-loading="false"
                                        data-is-loaded="true"
                                    >
                                        <section
                                            className="box-articles --apertura --focal --left"
                                            id="tema_01"
                                            data-is-block="true"
                                            data-block-name="h_tema-01"
                                            data-diagramacion-id="h_apertura-focalIzq-3"
                                        >
                                            <div className="row">
                                                <div className="col-tablet-8">
                                                    <Article
                                                        frontdemo
                                                        srcdemo="https://source.unsplash.com/300x200"
                                                        link="#"
                                                        leadText="Sputnik V."
                                                        titleText="Focal izquierdo. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                        titleTag="h1"
                                                        titleSize="--xl"
                                                        subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                        authors="Por Maia Jastreblansky"
                                                        label="Chapita"
                                                        position="0101"
                                                    />
                                                </div>
                                                <div className="col-tablet-4">
                                                    <Article
                                                        frontdemo
                                                        srcdemo="https://source.unsplash.com/300x201"
                                                        link="#"
                                                        leadText="Vacuna rusa."
                                                        titleText="Los nexos ocultos entre los Moyano y la barra brava de Independiente"
                                                        authors="Por Maia Jastreblansky"
                                                        position="0102"
                                                    />
                                                    <Article
                                                        frontdemo
                                                        srcdemo="https://source.unsplash.com/300x202"
                                                        link="#"
                                                        leadText="Covid."
                                                        titleText='El Gobierno "autoengañado", el incendio y por qué cayó "en la trampa"'
                                                        authors="Por Maia Jastreblansky"
                                                        label="Chapita"
                                                        position="0103"
                                                    />
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div
                                        data-module="tema_02"
                                        data-is-loading="false"
                                        data-is-loaded="true"
                                    >
                                        <section
                                            className="box-articles"
                                            id="tema_02"
                                            data-is-block="true"
                                            data-block-name="h_tema-02"
                                            data-diagramacion-id="h_caja-3notas"
                                        >
                                            <div className="row-gap-tablet-3">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x203"
                                                    link="#"
                                                    leadText="Pandemia."
                                                    titleText="La dura respuesta de Bullrich a la acusación de Frederic"
                                                    authors="Por Nombre Apellido"
                                                    label="Chapita larga muy pero muy larga se corta"
                                                    position="0201"
                                                />
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x204"
                                                    link="#"
                                                    leadText="PJ."
                                                    titleText="La historia de la fábrica que prometía hacer cientos de vagones"
                                                    authors="Por Nombre Apellido"
                                                    position="0202"
                                                />
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x205"
                                                    renderAutor
                                                    link="#"
                                                    leadText="Tragedia en al ruta."
                                                    titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                                    authors="Nombre Apellido"
                                                    position="0203"
                                                />
                                            </div>
                                        </section>
                                    </div>

                                    <div
                                        data-module="tema_03"
                                        data-is-loading="false"
                                        data-is-loaded="true"
                                    >
                                        <section
                                            className="box-articles"
                                            id="tema_03"
                                            data-is-block="true"
                                            data-block-name="h_tema-03"
                                            data-diagramacion-id="h_caja-3notas"
                                        >
                                            <div className="row-gap-tablet-3">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x203"
                                                    link="#"
                                                    leadText="Pandemia."
                                                    titleText="La dura respuesta de Bullrich a la acusación de Frederic"
                                                    authors="Por Nombre Apellido"
                                                    label="Chapita larga muy pero muy larga se corta"
                                                    position="0301"
                                                />
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x204"
                                                    link="#"
                                                    leadText="PJ."
                                                    titleText="La historia de la fábrica que prometía hacer cientos de vagones"
                                                    authors="Por Nombre Apellido"
                                                    position="0302"
                                                />
                                            </div>
                                        </section>

                                        <section className="box-articles --grilla --video">
                                            <div className="row">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/460x600"
                                                    powa={powa}
                                                    link="#"
                                                    leadText="Video grilla."
                                                    titleText="La casa Breuer Moreno se prepara para su último remate"
                                                    titleSize="--l"
                                                    subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                    authors="Por Nombre Apellido"
                                                    //label="Chapita más larga"
                                                />
                                            </div>
                                        </section>

                                        <section className="box-articles --cinema --video">
                                            <div className="row">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/460x600"
                                                    video="https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/10/5cfe914c46e0fb000981496e/t_520577cda990476baa7a9ecf733e4a97_name_05_30_2019_t_a35f599ee6764026add3d7967f88b000_name_Marilina_Rolling_1920x1080_2/file_1280x720-2000-v3_1.mp4"
                                                    link="#"
                                                    leadText="Video background."
                                                    titleText="La casa Breuer Moreno se prepara para su último remate"
                                                    titleSize="--l"
                                                    authors="Por Nombre Apellido"
                                                    label="Chapita más larga"
                                                />
                                            </div>
                                        </section>

                                        <section className="box-articles --cinema">
                                            <div className="row">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x205"
                                                    isRenderAuthor
                                                    link="#"
                                                    leadText="Tragedia en al ruta."
                                                    titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                                    authors="Nombre Apellido"
                                                    position="0303"
                                                />
                                            </div>
                                        </section>
                                    </div>
                                    <section className="mod-banner">
                                        <div className="com-banner billboard_dsk">
                                            Banner
                                        </div>
                                    </section>
                                    <div className="row-gap-tablet-2">
                                        <ModPromo
                                            text="La información más completa del mercado inmobiliario minuto a minuto."
                                            link="https://www.lanacion.com.ar/propiedades/"
                                            logoName="propiedades"
                                        />
                                        <ModPromo
                                            text="La información más completa del mercado inmobiliario minuto a minuto."
                                            link="https://www.lanacion.com.ar/economia/campo/"
                                            logoName="campo"
                                        />
                                    </div>
                                    <div
                                        data-module="tema_04"
                                        data-is-loading="false"
                                        data-is-loaded="true"
                                    >
                                        <section
                                            className="box-articles --focal --right"
                                            id="tema_04"
                                            data-is-block="true"
                                            data-block-name="h_tema-04"
                                            data-diagramacion-id="h_caja-2notas"
                                        >
                                            <HeaderSection
                                                title="Techo con link"
                                                link="#"
                                            />
                                            <div className="row">
                                                <div className="col-tablet-8">
                                                    <Article
                                                        frontdemo
                                                        srcdemo="https://source.unsplash.com/300x206"
                                                        link="#"
                                                        leadText="Focal derecho."
                                                        titleSize="--l"
                                                        titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                        authors="Por Maia Jastreblansky"
                                                        label="Chapita"
                                                        position="0401"
                                                    />
                                                </div>
                                                <div className="col-tablet-4">
                                                    <Article
                                                        frontdemo
                                                        srcdemo="https://source.unsplash.com/300x207"
                                                        link="#"
                                                        leadText="Nota NYT."
                                                        titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                        titleTag="h1"
                                                        titleSize="--xl"
                                                        subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                        authors="Por Maia Jastreblansky"
                                                        position="0402"
                                                    />
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div
                                        data-module="tema_05"
                                        data-is-loading="false"
                                        data-is-loaded="true"
                                    >
                                        <section
                                            className="box-articles"
                                            id="tema_05"
                                            data-is-block="true"
                                            data-block-name="h_tema-05"
                                            data-diagramacion-id="h_caja-2notas"
                                        >
                                            <div className="row-gap-tablet-2">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/600x400"
                                                    link="#"
                                                    leadText="Volanta."
                                                    titleText="La casa Breuer Moreno se prepara para su último remate"
                                                    titleSize="--l"
                                                    authors="Por Nombre Apellido"
                                                    label="Chapita"
                                                    position="0501"
                                                />
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/600x401"
                                                    link="#"
                                                    leadText="Volanta."
                                                    titleText="La casa Breuer Moreno se prepara para su último remate"
                                                    titleSize="--l"
                                                    authors="Por Nombre Apellido"
                                                    label="Chapita"
                                                    position="0502"
                                                />
                                            </div>
                                        </section>
                                    </div>

                                    <div
                                        data-module="tema_06"
                                        data-is-loading="false"
                                        data-is-loaded="true"
                                        className="container --opinion"
                                    >
                                        <div>
                                            <section
                                                className="box-articles --opinion"
                                                id="tema_06"
                                                data-is-block="true"
                                                data-block-name="h_tema-06"
                                                data-diagramacion-id="h_caja-opinion"
                                            >
                                                <HeaderSection title="Techo caja opinión" />

                                                <div className="row">
                                                    <div className="col-tablet-5">
                                                        <Article
                                                            frontdemo
                                                            srcdemo="https://source.unsplash.com/300x208"
                                                            link="#"
                                                            leadText="Opinión 1."
                                                            titleSize="--l"
                                                            titleText="Sonrisas arriba del escenario y disputas abajo"
                                                            authors="Por Maia Jastreblansky"
                                                            label="Chapita"
                                                            position="0601"
                                                        />
                                                    </div>
                                                    <div className="col-tablet-4">
                                                        <Article
                                                            frontdemo
                                                            srcdemo="https://source.unsplash.com/300x300/?face"
                                                            link="#"
                                                            classCondition="--author"
                                                            leadText="Opinión 2."
                                                            titleSize="--xs"
                                                            titleText="Una ventana al bienestar que promete el verano"
                                                            authors="Nombre Apellido"
                                                            authorSize="--twoxs"
                                                            position="0602"
                                                        />
                                                        <Article
                                                            frontdemo
                                                            srcdemo="https://source.unsplash.com/300x301/?face"
                                                            link="#"
                                                            classCondition="--author"
                                                            leadText="Opinión 3."
                                                            titleSize="--xs"
                                                            titleText="Trumpismo, maoísmo y peronismo"
                                                            authors="Nombre Apellido"
                                                            authorSize="--twoxs"
                                                            position="0603"
                                                        />
                                                    </div>
                                                    <div className="col-tablet-3">
                                                        <Article
                                                            frontdemo
                                                            srcdemo="https://source.unsplash.com/300x302/?face"
                                                            link="#"
                                                            classCondition="--author"
                                                            leadText="Opinión 4."
                                                            titleSize="--l"
                                                            titleText="Inolvidable declaración de amor a la ciudad de Madrid"
                                                            authors="Nombre Apellido"
                                                            authorSize="--twoxs"
                                                            position="0604"
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div>
                                            <section
                                                className="box-articles --editoriales"
                                                id="tema_06"
                                                data-is-block="true"
                                                data-block-name="h_tema-06"
                                                data-diagramacion-id="h_caja-opinion"
                                            >
                                                <div className="mod-footersection">
                                                    <ComTitle
                                                        content="EDITORIALES"
                                                        size="--twoxs"
                                                        link="https://www.lanacion.com.ar/editoriales/"
                                                    />
                                                    <div className="col-12">
                                                        <article className="mod-article">
                                                            <div className="mod-description">
                                                                <h2 className="com-title --twoxs">
                                                                    <a
                                                                        href="/sociedad/comunidad/elefante-azul-la-tragica-historia-detras-del-imponente-edificio-abandonado-en-saavedra-nid22042021/"
                                                                        className="com-link"
                                                                        title="Elefante Azul: la trágica historia detrás del imponente edificio abandonado en Saavedra"
                                                                    >
                                                                        Elefante
                                                                        Azul: la
                                                                        trágica
                                                                        historia
                                                                        detrás
                                                                        del
                                                                        imponente
                                                                        edificio
                                                                        abandonado
                                                                        en
                                                                        Saavedra
                                                                    </a>
                                                                </h2>
                                                            </div>
                                                        </article>
                                                        <article className="mod-article">
                                                            <div className="mod-description">
                                                                <h2 className="com-title --twoxs">
                                                                    <a
                                                                        href="/editoriales/la-remocion-jueces-fiscales-nid2547655"
                                                                        className="com-link"
                                                                        title="La remoción de jueces y fiscales"
                                                                    >
                                                                        La
                                                                        remoción
                                                                        de
                                                                        jueces y
                                                                        fiscales
                                                                    </a>
                                                                </h2>
                                                            </div>
                                                        </article>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>

                                    <section className="mod-banner">
                                        <div className="com-banner billboard_dsk">
                                            Banner
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <HeaderSection title="Techo caja notas 3, 6 o 9 largo para que se corte" />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x209"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x210"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                noMedia
                                                subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                renderAutor
                                                srcdemo="https://source.unsplash.com/300x211"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <HeaderSection
                                            title="Techo caja color"
                                            classCondition="--bg --red"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x209"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x210"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x211"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --cinema">
                                        <div className="row">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/1260x500"
                                                link="#"
                                                leadText="Volanta más."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Nombre Apellido"
                                                label="Chapita más larga"
                                            />
                                        </div>
                                    </section>

                                    <section className="mod-banner">
                                        <div className="com-banner billboard_dsk">
                                            Banner
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <HeaderSection
                                            title="Techo caja autores"
                                            classCondition="--bg --red"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                isRenderAuthor
                                                srcdemo="https://source.unsplash.com/300x209"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                isRenderAuthor
                                                srcdemo="https://source.unsplash.com/300x210"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                isRenderAuthor
                                                srcdemo="https://source.unsplash.com/300x211"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    {/* <section className="mod-">
                                            <ComTitle size="--twoxs" content="Temáticas LA NACION" />
                                            <div className="row-gap-tablet-2">
                                                <a href="https://www.lanacion.com.ar/propiedades/">
                                                    <div className="mod-"><img src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/7AXX6ZVNCRGLBMXP5UPH5SWDIQ.png" loading="lazy" className="com-image " alt="Logo"/></div>
                                                    Toda la informacion del mercado inmobiliario 
                                                </a>
                                                <a href="https://www.lanacion.com.ar/propiedades/">
                                                    <div className="mod-"><img src="https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/7AXX6ZVNCRGLBMXP5UPH5SWDIQ.png" loading="lazy" className="com-image " alt="Logo"/></div>
                                                    Noticias, informes y referentes del campo argentino 
                                                </a>
                                            </div>
                                        </section> */}

                                    <section className="box-articles --bgcolor --bgteal">
                                        <HeaderSection
                                            title="Techo de sección: La casa Breuer Moreno se prepara para su último remate"
                                            classCondition="--bg"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x212"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x213"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x214"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x215"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x216"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x217"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --highlight --bgblue">
                                        <HeaderSection
                                            title="Techo con link"
                                            link="#"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita larga"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x601"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita muchísimo más larga"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x602"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita muchísimo más larga para que se llegue a cortar"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --bgpink --highlight --pink">
                                        <HeaderSection
                                            title="Techo con link"
                                            link="#"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x603"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x604"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x605"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --bgteal">
                                        <HeaderSection
                                            title="Techo de sección: La casa Breuer Moreno se prepara para su último remate"
                                            classCondition="--bg"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x212"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x213"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x214"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x215"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x216"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                                label="Chapita"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x217"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --bgblue --highlight --red">
                                        <HeaderSection
                                            title="Techo de notas color con título largo"
                                            link="#"
                                            classCondition="--bg"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x609"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x610"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x611"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --bgpink">
                                        <HeaderSection title="Techo de sección" />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x233"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x234"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x236"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x237"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x238"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <HeaderSection
                                            title="Techo de sección con link"
                                            link="#"
                                            classCondition="--bg"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x233"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x234"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x236"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x237"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x238"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none"></div>
                            </div>

                            <div className="lay">
                                <Dolar
                                    compra="84"
                                    venta="90"
                                    compraBlue="154"
                                    ventaBlue="160"
                                    compraLiqui="118,18"
                                />
                                <section className="mod-ranking">
                                    <HeaderSection title="Las más leídas" />

                                    <ol className="com-ordered row-gap-tablet-4">
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x220/?ranking"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x225/?ranking"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x230/?ranking"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235/?ranking"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </li>
                                    </ol>
                                </section>

                                <section className="box-articles --cinema">
                                    <div className="row">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/1260x500"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate a casa Breuer Moreno se prepara para su último remate a casa Breuer Moreno se prepara para su último remate a casa Breuer Moreno se prepara para su último remate"
                                            titleSize="--l"
                                            authors="Por Nombre Apellido"
                                            label="Content Lab"
                                        />
                                    </div>
                                </section>
                            </div>

                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    <section className="box-articles --cinema">
                                        <div className="row">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/1260x505"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Nombre Apellido"
                                                label="LIVING"
                                            />
                                        </div>
                                    </section>
                                    <section className="box-articles --focal --left">
                                        <HeaderSection
                                            title="Techo caja opinión con link"
                                            link="#"
                                        />
                                        <div className="row">
                                            <div className="col-tablet-8">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x200"
                                                    link="#"
                                                    leadText="Volanta."
                                                    titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
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
                                                    noMedia
                                                    subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
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
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x203"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La dura respuesta de Bullrich a la acusación de Frederic"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x204"
                                                link="#"
                                                leadText="Volanta."
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
                                        </div>
                                    </section>

                                    <section className="box-articles --focal --right">
                                        <div className="row">
                                            <div className="col-tablet-8">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x206"
                                                    link="#"
                                                    titleSize="--l"
                                                    leadText="Volanta."
                                                    titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                            <div className="col-tablet-4">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x207"
                                                    link="#"
                                                    leadText="Nota NYT."
                                                    titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
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
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate para su último remate"
                                                titleSize="--l"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/600x401"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <HeaderSection
                                            title="Techo caja notas 3, 6 o 9 con link"
                                            link="#"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x209"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x210"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x211"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --bgteal">
                                        <HeaderSection
                                            title="Techo de sección: La casa Breuer Moreno se prepara para su último remate"
                                            classCondition="--bg"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x212"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x213"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x214"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                isRenderAuthor
                                                authors="Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x215"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x216"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x217"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --highlight --blue">
                                        <HeaderSection
                                            title="Techo de sección"
                                            classCondition="--bg"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x601"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x602"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --highlight --pink">
                                        <HeaderSection
                                            title="Techo de sección con link"
                                            link="#"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x603"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x604"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x605"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --bgteal">
                                        <HeaderSection
                                            title="Techo de sección: La casa Breuer Moreno se prepara para su último remate"
                                            classCondition="--bg"
                                        />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x212"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x213"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x214"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                renderAutor
                                                authors="Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x215"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x216"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x217"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <section className="mod-headersection --bg --teal">
                                            <div className="mod-logo">
                                                <img
                                                    src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/FZTZM34MYZD47PZF4QLBPYIHCM.png"
                                                    loading="lazy"
                                                    className="com-image "
                                                    alt="Logo"
                                                />
                                            </div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x233"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x234"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x236"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x237"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                noMedia
                                                subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x238"
                                                link="#"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --bgpink">
                                        <section className="mod-headersection --bg">
                                            <div className="mod-logo">
                                                <img
                                                    src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/FZTZM34MYZD47PZF4QLBPYIHCM.png"
                                                    loading="lazy"
                                                    className="com-image "
                                                    alt="Logo"
                                                />
                                            </div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x233"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x234"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x235"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x236"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x237"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                noMedia
                                                subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                authors="Por Nombre Apellido"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x238"
                                                link="#"
                                                leadText="Volanta."
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Nombre Apellido"
                                            />
                                        </div>
                                    </section>
                                    <div className="row-gap-tablet-3">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x230"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            authors="Por Nombre Apellido"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x231"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            authors="Por Nombre Apellido"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x232"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            noMedia
                                            subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                            authors="Por Nombre Apellido"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x233"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            authors="Por Nombre Apellido"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x234"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            isRenderAuthor
                                            authors="Nombre Apellido"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x235"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            authors="Por Nombre Apellido"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x236"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            authors="Por Nombre Apellido"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x237"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            authors="Por Nombre Apellido"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x238"
                                            link="#"
                                            leadText="Volanta."
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            authors="Por Nombre Apellido"
                                        />
                                    </div>
                                    {/*
                                        <section className="demofonts">
                                            <i className="com-icon icon-snow"></i>
                                            <i className="com-icon icon-snow-cloudy"></i>
                                            <i className="com-icon icon-storm"></i>
                                            <i className="com-icon icon-storm-cloudy"></i>
                                            <i className="com-icon icon-sun"></i>
                                            <i className="com-icon icon-sun-cloudy"></i>
                                            <i className="com-icon icon-windy"></i>
                                        </section>
                                        
                                        <section className="demofonts">
                                            <div>
                                                <h1 className="--threexl">
                                                    <strong>
                                                        Arial en 3XL
                                                    </strong>
                                                </h1>
                                                <h1 className="--twoxl">
                                                    <strong>
                                                        Arial en 2XL
                                                    </strong>
                                                </h1>
                                                <h1 className="--xl">
                                                    <strong>Arial en XL</strong>
                                                </h1>
                                                <h1 className="--l">
                                                    <strong>Arial en L</strong>
                                                </h1>
                                                <h1 className="--m">
                                                    <strong>Arial en M</strong>
                                                </h1>
                                                <h1 className="--s">
                                                    <strong>Arial en S</strong>
                                                </h1>
                                                <h1 className="--xs">
                                                    <strong>Arial en XS</strong>
                                                </h1>
                                                <h1 className="--twoxs">
                                                    <strong>
                                                        Arial en 2XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--threexs">
                                                    <strong>
                                                        Arial en 3XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--fourxs">
                                                    <strong>
                                                        Arial en 4XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--fivexs">
                                                    <strong>
                                                        Arial en 5XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--sixxs">
                                                    <strong>
                                                        Arial en 6XS
                                                    </strong>
                                                </h1>
                                            </div>

                                            <div>
                                                <h1 className="--threexl">
                                                    Arial en 3XL
                                                </h1>
                                                <h1 className="--twoxl">
                                                    Arial en 2XL
                                                </h1>
                                                <h1 className="--xl">
                                                    Arial en XL
                                                </h1>
                                                <h1 className="--l">
                                                    Arial en L
                                                </h1>
                                                <h1 className="--m">
                                                    Arial en M
                                                </h1>
                                                <h1 className="--s">
                                                    Arial en S
                                                </h1>
                                                <h1 className="--xs">
                                                    Arial en XS
                                                </h1>
                                                <h1 className="--twoxs">
                                                    Arial en 2XS
                                                </h1>
                                                <h1 className="--threexs">
                                                    Arial en 3XS
                                                </h1>
                                                <h1 className="--fourxs">
                                                    Arial en 4XS
                                                </h1>
                                                <h1 className="--fivexs">
                                                    Arial en 5XS
                                                </h1>
                                                <h1 className="--sixxs">
                                                    Arial en 6XS
                                                </h1>
                                            </div>

                                            <div>
                                                <h1 className="--threexl suecas">
                                                    <strong>
                                                        SuecaSlab en 3XL
                                                    </strong>
                                                </h1>
                                                <h1 className="--twoxl suecas">
                                                    <strong>
                                                        SuecaSlab en 2XL
                                                    </strong>
                                                </h1>
                                                <h1 className="--xl suecas">
                                                    <strong>
                                                        SuecaSlab en XL
                                                    </strong>
                                                </h1>
                                                <h1 className="--l suecas">
                                                    <strong>
                                                        SuecaSlab en L
                                                    </strong>
                                                </h1>
                                                <h1 className="--m suecas">
                                                    <strong>
                                                        SuecaSlab en M
                                                    </strong>
                                                </h1>
                                                <h1 className="--s suecas">
                                                    <strong>
                                                        SuecaSlab en S
                                                    </strong>
                                                </h1>
                                                <h1 className="--xs suecas">
                                                    <strong>
                                                        SuecaSlab en XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--twoxs suecas">
                                                    <strong>
                                                        SuecaSlab en 2XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--threexs suecas">
                                                    <strong>
                                                        SuecaSlab en 3XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--fourxs suecas">
                                                    <strong>
                                                        SuecaSlab en 4XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--fivexs suecas">
                                                    <strong>
                                                        SuecaSlab en 5XS
                                                    </strong>
                                                </h1>
                                                <h1 className="--sixxs suecas">
                                                    <strong>
                                                        SuecaSlab en 6XS
                                                    </strong>
                                                </h1>
                                            </div>

                                            <div>
                                                <h1 className="--threexl suecas">
                                                    SuecaSlab en 3XL
                                                </h1>
                                                <h1 className="--twoxl suecas">
                                                    SuecaSlab en 2XL
                                                </h1>
                                                <h1 className="--xl suecas">
                                                    SuecaSlab en XL
                                                </h1>
                                                <h1 className="--l suecas">
                                                    SuecaSlab en L
                                                </h1>
                                                <h1 className="--m suecas">
                                                    SuecaSlab en M
                                                </h1>
                                                <h1 className="--s suecas">
                                                    SuecaSlab en S
                                                </h1>
                                                <h1 className="--xs suecas">
                                                    SuecaSlab en XS
                                                </h1>
                                                <h1 className="--twoxs suecas">
                                                    SuecaSlab en 2XS
                                                </h1>
                                                <h1 className="--threexs suecas">
                                                    SuecaSlab en 3XS
                                                </h1>
                                                <h1 className="--fourxs suecas">
                                                    SuecaSlab en 4XS
                                                </h1>
                                                <h1 className="--fivexs suecas">
                                                    SuecaSlab en 5XS
                                                </h1>
                                                <h1 className="--sixxs suecas">
                                                    SuecaSlab en 6XS
                                                </h1>
                                            </div>
                                        </section>
                                        */}
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none"></div>
                            </div>
                        </div>
                    </main>
                    {/* <Footer /> */}
                    <NewFooter home />
                </div>
            </GlobalProviderAcu>
        </GlobalProvider>
    );
};

LNHome.propTypes = {
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired
};

LNHome.sections = pageBuilderSections;

export default Consumer(LNHome);
