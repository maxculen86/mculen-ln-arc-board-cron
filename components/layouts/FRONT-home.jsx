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
                                    <section className="row box-articles --focal --left">
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
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                authors="Por Maia Jastreblansky"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Maia Jastreblansky"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles">
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </section>
                                    </section>

                                    <section className="row box-articles --focal --right">
                                        <div className="col-tablet-8">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleSize="--l"
                                                titleText="Focal derecho. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                authors="Por Maia Jastreblansky"
                                            />
                                        </div>
                                        <div className="col-tablet-4">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="Nota NYT. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                titleTag="h1"
                                                titleSize="--xl"
                                                subheadText="Desde Moscú, la delegación argentina se mostró confiada en poder transportar los primeros lotes antes de que termine diciembre"
                                                authors="Por Maia Jastreblansky"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --opinion">
                                        <section className="mod-headersection ">
                                            <ComTitle
                                                content="Techo caja opinión"
                                                size="--l"
                                            />
                                            <div className="com-line  "></div>
                                        </section>
                                        <section className="row">
                                            <div className="col-tablet-5">
                                                <Article
                                                    frontdemo
                                                    srcdemo="https://source.unsplash.com/300x200"
                                                    link="#"
                                                    titleSize="--l"
                                                    titleText="Opinión 1. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    authors="Por Maia Jastreblansky"
                                                />
                                            </div>
                                            <div className="col-tablet-4">
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x300/?face"
                                                    link="#"
                                                    titleText="Opinión 2. Gestiones con Rusia para traer las primeras vacunas"
                                                    authors="Daro Aguilar"
                                                />
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x300/?face"
                                                    link="#"
                                                    titleText="Opinión 3. Gestiones con Rusia para traer las primeras vacunas"
                                                    authors="Daro Aguilar"
                                                />
                                            </div>
                                            <div className="col-tablet-3">
                                                <Article
                                                    frontdemo
                                                    classCondition="--author"
                                                    srcdemo="https://source.unsplash.com/300x300/?face"
                                                    link="#"
                                                    titleText="Opinión 4. Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                    authors="Daro Aguilar"
                                                />
                                            </div>
                                        </section>
                                    </section>

                                    <section className="box-articles">
                                        <div className="row-gap-tablet-2">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/600x400"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/600x400"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                titleSize="--l"
                                                authors="Por Daro Aguilar"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --cinema">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/1260x500"
                                            link="#"
                                            titleText="La casa Breuer Moreno se prepara para su último remate"
                                            titleSize="--l"
                                            authors="Por Daro Aguilar"
                                        />
                                    </section>

                                    <section className="box-articles --highlight --blue">
                                        <section className="mod-headersection ">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line  "></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --highlight --pink">
                                        <section className="mod-headersection ">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line  "></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --teal">
                                        <section className="mod-headersection --bg">
                                            <ComTitle
                                                content="Techo de sección: La casa Breuer Moreno se prepara para su último remate"
                                                size="--l"
                                            />
                                            <div className="com-line  "></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </section>
                                    </section>

                                    <section className="box-articles --highlight --teal">
                                        <section className="mod-headersection ">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line  "></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --highlight --red">
                                        <section className="mod-headersection ">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line  "></div>
                                        </section>
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </div>
                                    </section>

                                    <section className="box-articles --bgcolor --pink">
                                        <section className="mod-headersection ">
                                            <ComTitle
                                                content="Techo de sección"
                                                size="--l"
                                            />
                                            <div className="com-line  "></div>
                                        </section>
                                        <section className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </section>
                                    </section>
                                </div>
                                <div className="sidebar__aside hlp-tablet-none"></div>
                            </div>
                            <div className="lay">
                                <section className="box-articles --cinema">
                                    <Article
                                        frontdemo
                                        srcdemo="https://source.unsplash.com/1260x500"
                                        link="#"
                                        titleText="La casa Breuer Moreno se prepara para su último remate"
                                        titleSize="--l"
                                        authors="Por Daro Aguilar"
                                    />
                                </section>
                                <section className="box-articles --ranking">
                                    <ol className="com-ordered row-gap-tablet-4">
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200/?ranking"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200/?ranking"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200/?ranking"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </li>
                                        <li>
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200/?ranking"
                                                link="#"
                                                titleText="La casa Breuer Moreno se prepara para su último remate"
                                                authors="Por Daro Aguilar"
                                            />
                                        </li>
                                    </ol>
                                </section>
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
