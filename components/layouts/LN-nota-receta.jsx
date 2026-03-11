import React from 'react';
import Consumer from 'fusion:consumer';
import classNames from 'classnames';
import GlobalProvider from '../private/common/context/globalContext';
import Header from '../features/LN-10-global/header/default';
import Footer from '../private/LN10/footer';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import InitControlGroup from './helpers/initCtrlGrp';
import Toasts from '../features/LN-10-global/common/toasts/default';
import '../../resources/dist/css/ln/pages/recipe.css';

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

function LNNotaReceta({ children }) {
    const classNameWrapper = classNames(
        'wrapper',
        'nota',
        'recetas',
        '--top-fixed'
    );

    return (
        <GlobalProvider>
            <div id="wrapper" className={classNameWrapper}>
                <Header />
                <main id="content" className="--header-fixed-margin">
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
                                <div
                                    id="cuerpo__nota"
                                    className="col-deskxl-10 offset-deskxl-1 col-desksm-11 cuerpo__nota"
                                >
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
                <div className="footer-container --no-app">
                    <Footer />
                </div>
            </div>
            <Toasts />
            <LoadBannersSSR />
            <PwaModal />
            <InitControlGroup />
        </GlobalProvider>
    );
}

LNNotaReceta.sections = pageBuilderSections;

export default Consumer(LNNotaReceta);
