import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer';
import Text from '../../private/common/text';
import GlobalProvider from '../../private/common/context/globalContext';
import LoadBannersSSR from '../../private/common/banners/LoadBannersSSR';
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
        <GlobalProvider>
            <div id="wrapper" className="acumulado columnistas">
                <Header headerDark={headerDark} />
                <main>
                    {/* CABEZAL REVISTA Y BANNERS: CABEZAL Y STICKY */}
                    {children[0]}
                    <div className="lay">
                        {
                            /* Espacio para breadcrum */
                            <div className="row">
                                <div className="col-12">
                                    {children[1]}
                                    <Text
                                        tag="h1"
                                        size="--l"
                                        extraClass="com-title"
                                        text="Todos los columnistas"
                                    />
                                </div>
                            </div>
                        }
                        {/* Espacio para el contenido */}
                        <section className="row-gap-2 row-gap-tablet-3 row-gap-desksm-5">
                            {children[2]}
                        </section>
                    </div>
                </main>
                <Static id="StaticFooter">
                    <Footer />
                </Static>
            </div>
            <LoadBannersSSR />
        </GlobalProvider>
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
