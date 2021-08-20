import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import LoginProvider from '../private/LN/common/context/loginContext';
import Article from '../private/common/mod-article';

// import '../../resources/dist/css/ln/base.css';
// import '../../resources/dist/css/ln/layouts/layout.css';
// import '../../resources/dist/css/ln/layouts/grid.css';
// import '../../resources/dist/css/ln/pages/acu.css';
// import '../../resources/dist/css/ln/components/com-ordered.css';
// import '../../resources/dist/css/ln/components/com-unordered.css';
// import '../../resources/dist/css/ln/components/hour.css';

const layoutItemsColumnistas = [
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Autores',
    'Aside'
];

/**
 * TODO: Consultar con daro para integrar un solo acumulado
 */
const LNAcumuladoColumnistasLayout = props => {
    const { children, globalContent } = props;
    const [headerDark, setHeaderDark] = useState('');

    useEffect(() => {
        const { style } = globalContent;

        setHeaderDark(
            style && style.headerdark && style.headerdark === 'true'
                ? ' --dark'
                : ''
        );
    }, [globalContent]);

    return (
        <LoginProvider>
            <div id="wrapper" className="acumulado columnistas">
                <Header headerDark={headerDark} />
                <main>
                    {/* CABEZAL REVISTA Y BANNERS: CABEZAL Y STICKY */}
                    {children[0]}
                    <div className="lay">
                        {/* <div className="sidebar__main"> */}
                        {
                            /* Espacio para breadcrum */
                            <div className="row">
                                <div className="col-12">{children[1]}</div>
                            </div>
                        }
                        {/* Espacio para el contenido */}
                        <section className="row-gap-5 hlp-degrade">
                            {children[2]}
                            <Article
                                frontdemo
                                srcdemo="https://source.unsplash.com/300x205"
                                isRenderAuthor
                                isRenderColumnista
                                link="#"
                                //leadText="Tragedia en al ruta."
                                //titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                authors="Nombre Apellido"
                                position="0203"
                            />
                            <Article
                                frontdemo
                                srcdemo="https://source.unsplash.com/300x205"
                                isRenderAuthor
                                isRenderColumnista
                                link="#"
                                // leadText="Tragedia en al ruta."
                                // titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                authors="Nombre Apellido Segundo Apellido"
                                position="0203"
                            />
                            <Article
                                frontdemo
                                srcdemo="https://source.unsplash.com/300x205"
                                isRenderAuthor
                                isRenderColumnista
                                link="#"
                                // leadText="Tragedia en al ruta."
                                // titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                authors="Autor Primer Segundo Tercer Nombre Primer Segundo Apellido"
                                position="0203"
                            />
                            <Article
                                frontdemo
                                srcdemo="https://source.unsplash.com/300x205"
                                isRenderAuthor
                                isRenderColumnista
                                link="#"
                                // leadText="Tragedia en al ruta."
                                // titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                authors="Nombre Apellido"
                                position="0203"
                            />
                            <Article
                                frontdemo
                                srcdemo="https://source.unsplash.com/300x205"
                                isRenderAuthor
                                isRenderColumnista
                                link="#"
                                // leadText="Tragedia en al ruta."
                                // titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                authors="Nombre Apellido"
                                position="0203"
                            />
                            <Article
                                frontdemo
                                srcdemo="https://source.unsplash.com/300x205"
                                isRenderAuthor
                                isRenderColumnista
                                link="#"
                                // leadText="Tragedia en al ruta."
                                // titleText='Piden al FMI que tenga en cuenta la "impunidad" en Argentina'
                                authors="Nombre Apellido"
                                position="0203"
                            />
                        </section>
                        {/* </div> */}
                        {/* <div className="sidebar__aside">
                            <div className="banner --desktop --large">
                                {children[3]}
                            </div>
                        </div> */}
                    </div>
                </main>
                <Static id="StaticFooter">
                    <Footer />
                </Static>
            </div>
        </LoginProvider>
    );
};

LNAcumuladoColumnistasLayout.propTypes = {
    children: PropTypes.node.isRequired,
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string,
            headerdark: PropTypes.string
        })
    }).isRequired
};

LNAcumuladoColumnistasLayout.sections = layoutItemsColumnistas;

export default Consumer(LNAcumuladoColumnistasLayout);
