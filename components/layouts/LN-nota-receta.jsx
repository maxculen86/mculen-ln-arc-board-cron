import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../private/common/staticValidation';
import GlobalProvider from '../private/common/context/globalContext';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import PwaModals from '../private/LN/common/pwaModals';

const pageBuilderSections = [
    'Pre-Titulo',
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Pos-Apertura',
    'Cuerpo',
    'Tercera',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

const LNNotaReceta = ({ outputType, children }) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    return (
        <GlobalProvider>
            <div id="wrapper" className={`nota recetas ${amp}`}>
                <Header />
                <main id="content">
                    {/* Pre-Titulo: Banners */}
                    {children[0]}
                    <div className="lay --apertura">
                        {/* Apertura nota */}
                        <div className="row">
                            <div className="col-12">
                                {/* Titulo (breadcrumb, logo+titulo) */}
                                {children[1]}
                                {/* Pos-Apertura (bajada, fecha, autor) */}
                                {children[4]}
                                {/* Apertura receta */}
                                {children[2]}
                            </div>
                        </div>
                    </div>

                    <div className="lay-sidebar">
                        {/* Cuerpo */}
                        <div className="sidebar__main">
                            <div className="row">
                                <div className="col-12 col-desksm-1">
                                    {/* Left-Cuerpo Shared */}
                                    {children[3]}
                                </div>
                                <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11 cuerpo__nota">
                                    {/* Cuerpo */}
                                    {children[5]}
                                </div>
                            </div>
                        </div>
                        {/* Tercera */}
                        <div className="sidebar__aside hlp-desklm-none">
                            {children[6]}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="lay">{children[7]}</div>

                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            {/* Bottom */}
                            {children[8]}
                        </div>
                        <div className="sidebar__aside">
                            {/* Bottom-Tercera */}
                            {children[9]}
                        </div>
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

LNNotaReceta.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
    outputType: PropTypes.string.isRequired
};

LNNotaReceta.sections = pageBuilderSections;

export default Consumer(LNNotaReceta);
