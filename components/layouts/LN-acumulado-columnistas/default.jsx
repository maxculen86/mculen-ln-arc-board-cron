import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import StaticValidation from '../../private/common/staticValidation';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer';
import Text from '../../private/common/text';
import GlobalProvider from '../../private/common/context/globalContext';
import LoadBannersSSR from '../../private/common/banners/LoadBannersSSR';
import PwaModals from '../../private/LN/common/pwaModals';

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
    const { children } = props;

    return (
        <GlobalProvider>
            <div id="wrapper" className="acumulado columnistas">
                <Header />
                <main id="content">
                    {/* CABEZAL REVISTA Y BANNERS: CABEZAL Y STICKY */}
                    {children[0]}
                    <div className="lay">
                        {
                            /* Espacio para breadcrum */
                            <div className="row">
                                <div className="col-12">
                                    {children[1]}
                                    <Static
                                        id="columnistas-layout"
                                        htmlOnly
                                        persistent
                                    >
                                        <Text
                                            tag="h1"
                                            size="--l"
                                            extraClass="com-title"
                                            text="Todos los columnistas"
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
                <StaticValidation id="StaticFooter">
                    <Footer />
                </StaticValidation>
            </div>
            <LoadBannersSSR />
            <PwaModals />
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
