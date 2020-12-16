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
                            <div className="lay">
                                <ComTitle
                                    tag="h1"
                                    size="--l"
                                    content="LAYOUT HOME"
                                />
                            </div>
                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    <section className="row box-articles --left">
                                        <div className="col-tablet-8">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
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
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                authors="Por Maia Jastreblansky"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/300x200"
                                                link="#"
                                                titleText="Gestiones con Rusia para traer las primeras vacunas antes de fin de año"
                                                authors="Por Maia Jastreblansky"
                                            />
                                        </div>
                                    </section>

                                    <section className="row-gap-tablet-3">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x200"
                                            link="#"
                                            titleText="Titulo del article"
                                            subheadText="Marquesina"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x200"
                                            link="#"
                                            titleText="Titulo del article"
                                            subheadText="Marquesina"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/300x200"
                                            link="#"
                                            titleText="Titulo del article"
                                            subheadText="Marquesina"
                                        />
                                    </section>

                                    <section className="row-gap-tablet-2">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/600x400"
                                            link="#"
                                            titleText="Titulo del article"
                                            subheadText="Marquesina"
                                        />
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/600x400"
                                            link="#"
                                            titleText="Titulo del article"
                                            subheadText="Marquesina"
                                        />
                                    </section>

                                    <section className="row">
                                        <Article
                                            frontdemo
                                            srcdemo="https://source.unsplash.com/1260x500"
                                            link="#"
                                            titleText="Titulo del article"
                                            subheadText="Marquesina"
                                        />
                                    </section>

                                    <section className="box-articles --highlight">
                                        <ComTitle content="TECHO" />
                                        <div className="row-gap-tablet-3">
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="Titulo del article"
                                                subheadText="Marquesina"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="Titulo del article"
                                                subheadText="Marquesina"
                                            />
                                            <Article
                                                frontdemo
                                                srcdemo="https://source.unsplash.com/400x600"
                                                link="#"
                                                titleText="Titulo del article"
                                                subheadText="Marquesina"
                                            />
                                        </div>
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
