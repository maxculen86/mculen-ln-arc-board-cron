import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import Header from '../../features/LN-10-global/header/default';
import Footer from '../../private/LN10/footer';
import Text from '../../private/common/text';
import GlobalProvider from '../../private/common/context/globalContext';
import LoadBannersSSR from '../../private/common/banners/LoadBannersSSR';
import PwaModal from '../../features/LN-10-global/pwaModal/default';
import ComTitle from '../../private/common/com-title';
import InitControlGroup from '../helpers/initCtrlGrp';

const layoutItemsColumnistas = [
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Autores',
    'Aside'
];

function LNAcumuladoColumnistasLayout(props) {
    const { children } = props;

    return (
        <GlobalProvider>
            <div
                id="wrapper"
                className="wrapper --top-fixed acumulado columnistas"
            >
                <Header />
                <main id="content" className="--header-fixed-margin">
                    {/* CABEZAL REVISTA Y BANNERS: CABEZAL Y STICKY */}
                    {children[0]}
                    <div className="lay">
                        {
                            /* Espacio para breadcrum */
                            <div className="row">
                                <div className="col-12">
                                    {children[1]}
                                    <Static id="LN-acu-columnistas" htmlOnly>
                                        <ComTitle
                                            tag="h1"
                                            size="--xl"
                                            weight="--font-extra"
                                            content="Columnas y opinión: política, economía, internacionales y más"
                                        />
                                        <Text
                                            tag="p"
                                            extraClass="com-text mb-32 --font-primary --l --font-medium"
                                            text={
                                                'Leé los análisis de los columnistas, periodistas y escritores más destacados de la redacción. ' +
                                                'Además, descubrí contenidos especializados de nuestros colaboradores. Informate con LA NACION.'
                                            }
                                        />
                                    </Static>
                                </div>
                            </div>
                        }
                        {/* Espacio para el contenido */}
                        <section className="row-gap-2 row-gap-tablet-3 row-gap-desksm-5">
                            {children[2]}
                        </section>
                    </div>
                </main>
                <div className="footer-container --no-app">
                    <Footer />
                </div>
            </div>
            <LoadBannersSSR />
            <PwaModal />
            <InitControlGroup />
        </GlobalProvider>
    );
}

LNAcumuladoColumnistasLayout.sections = layoutItemsColumnistas;

export default Consumer(LNAcumuladoColumnistasLayout);
