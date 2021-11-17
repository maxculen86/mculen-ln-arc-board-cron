// React
import React from 'react';

// Fusion
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';

// Private Components
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';

import '../../resources/dist/css/ln/pages/storytelling.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';

const lnNotaStorytelling = ({
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
    const magazine = logo ? logo.logoName : '';
    return (
        <GlobalProvider>
            <CommentsProvider>
                {/* Banner MEGATOP */}
                {bannerMegatop}

                <div
                    id="wrapper"
                    className={`nota ${magazine} --storytelling --transparent ${amp}`}
                >
                    <Header />
                    <main id="content">
                        {children[1]}
                        <AperturaStorytelling />
                        <div className="lay-sidebar">
                            <div className="sidebar__main">
                                <section className="cuerpo__nota">
                                    <div className="row">
                                        <div className="col-12 col-desksm-1">
                                            {/* // ***** INICIO PREGUNTAR A DARO */}
                                            {/* hlp-mobile-show */}
                                            {/* // ***** FIN PREGUNTAR A DARO */}
                                            {/* Left-Cuerpo Shared */}
                                            {children[2]}
                                        </div>
                                        <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                            <div className="row">
                                                <div className="col-12">
                                                    {/* Cuerpo */}
                                                    {children[3]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            {/* Tercera */}
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {children[4]}
                            </div>
                        </div>
                        {/* Newsletter */}
                        <div className="lay">{children[5]}</div>
                        <div className="lay-sidebar">
                            <div className="sidebar__main">
                                {/* Bottom */}
                                {children[6]}
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {/* Bottom-Tercera */}
                                {children[7]}
                            </div>
                        </div>
                    </main>
                    <Static id="StaticFooter">
                        <Footer />
                    </Static>
                </div>
                <LoadBannersSSR />
            </CommentsProvider>
        </GlobalProvider>
    );
};

const pageBuilderSections = [
    'Banner-Megatop',
    'Pre-Titulo',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaStorytelling.sections = pageBuilderSections;

lnNotaStorytelling.propTypes = {
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

export default Consumer(lnNotaStorytelling);
