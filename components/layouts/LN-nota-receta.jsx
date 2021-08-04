import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import LoginProvider from '../private/LN/common/context/loginContext';
import GlobalProvider from '../private/common/context/globalContext';
import LoadBanners from '../private/common/banners/LoadBanners';
import { CommentsProvider } from '../private/common/context/commentsContext';
/* import Article from '../private/common/mod-article';
import HeaderSection from '../private/common/mod-headerSection'; */
import Header from '../private/LN/common/header';
import NewFooter from '../private/LN/common/footer';

// import '../../resources/dist/css/ln/base.css';
// import '../../resources/dist/css/ln/layouts/grid.css';
// import '../../resources/dist/css/ln/layouts/layout.css';
// import '../../resources/dist/css/ln/components/com-authormarquee.css';
// import '../../resources/dist/css/ln/components/com-link-new.css';
// import '../../resources/dist/css/ln/components/com-paragraph-new.css';
// import '../../resources/dist/css/ln/components/com-subhead-new.css';
// import '../../resources/dist/css/ln/components/com-title-new.css';
// import '../../resources/dist/css/ln/components/com-unordered-new.css';
// import '../../resources/dist/css/ln/components/com-tip-new.css';
import '../../resources/dist/css/ln/modules/mod-banner.css';

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
            <LoginProvider>
                <CommentsProvider>
                    <div id="wrapper" className={`recetas ${amp}`}>
                        <Header />
                        <main>
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
                                        <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
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
                        <Static id="StaticFooter">
                            <NewFooter />
                        </Static>
                    </div>
                    <LoadBanners />
                </CommentsProvider>
            </LoginProvider>
        </GlobalProvider>
    );
};

LNNotaReceta.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
    outputType: PropTypes.string.isRequired
};

LNNotaReceta.sections = pageBuilderSections;

export default Consumer(LNNotaReceta);
