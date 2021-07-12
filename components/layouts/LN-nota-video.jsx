import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import LoginProvider from '../private/LN/common/context/loginContext';

//import '../../resources/dist/css/ln/pages/magazine.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import LoadBanners from '../private/common/banners/LoadBanners';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';

const lnNotaNoticia = ({
    children,
    outputType,
    tree,
    isAdmin,
    globalContent: {
        taxonomy: { sections },
        distributor: { name }
    },
    layout
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);
    const logo = getSectionLogo(sections, layout, name);
    //const magazine = logo ? logo.logoName : '';
    return (
        <GlobalProvider>
            <LoginProvider>
                <CommentsProvider>
                    {/* Banner MEGATOP */}
                    {bannerMegatop}
                    {/* Banner MEGATOP */}

                    <div id="wrapper" className={`nota video ${amp}`}>
                        <Header />
                        <main>
                            {children[1]}
                            <div className="lay --apertura">
                                <div className="row">
                                    <div className="col-4">
                                        {/* Titulo (breadcrumb, logo+titulo) */}
                                        {children[2]}
                                    </div>
                                    <div className="col-8"></div>
                                </div>
                            </div>
                            <div className="lay-sidebar">
                                {/* Cuerpo */}
                                <div className="sidebar__main">
                                    <div className="row">
                                        <div className="col-12 ">
                                            {/* Bajada y autor fecha más apertura */}
                                            {children[3]}
                                        </div>
                                    </div>
                                    <section className="cuerpo__nota">
                                        <div className="row">
                                            <div className="col-12 col-desksm-1">
                                                {/* hlp-mobile-show */}
                                                {/* Left-Cuerpo Shared */}
                                                {children[4]}
                                            </div>
                                            <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                                <div className="row">
                                                    <div className="col-12">
                                                        {/* Pos-Apertura */}
                                                        {children[5]}
                                                        {/* Logo al pie */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Tercera */}
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {children[6]}
                                </div>
                            </div>
                            {/* Newsletter */}
                            <div className="lay">{children[8]}</div>
                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    {/* Bottom */}
                                    {children[9]}
                                </div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {/* Bottom-Tercera */}
                                    {children[10]}
                                </div>
                            </div>
                        </main>
                        <Static id="StaticFooter">
                            <Footer />
                        </Static>
                    </div>
                    <LoadBanners />
                </CommentsProvider>
            </LoginProvider>
        </GlobalProvider>
    );
};

const pageBuilderSections = [
    'Banner-Megatop',
    'Pre-Titulo',
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Pos-Cuerpo',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaNoticia.sections = pageBuilderSections;

lnNotaNoticia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.shape({
                _id: PropTypes.string
            })
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(lnNotaNoticia);
