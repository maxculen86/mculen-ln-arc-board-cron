import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

import '../../resources/dist/css/ln/pages/video.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';

const lnNotaVideo = ({ children, outputType, tree, isAdmin }) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);
    return (
        <GlobalProvider>
            <CommentsProvider>
                {/* Banner MEGATOP */}
                {bannerMegatop}
                {/* Banner MEGATOP */}
                <div id="wrapper" className={`nota video --transparent ${amp}`}>
                    <Header />
                    <main>
                        <div className="--apertura">
                            {children[1]}
                            <div className="lay">
                                <div className="row">
                                    <div className="col-tablet-4">
                                        {/* Titulo, bajada, fecha, firma y share, */}
                                        {children[2]}
                                    </div>
                                    <div className="col-tablet-8">
                                        {/* Apertura Video */}
                                        {children[3]}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                <section className="cuerpo__nota">
                                    <div className="row">
                                        <div className="col-12">
                                            {children[4]}
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Tercera */}
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {children[5]}
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
    'Titulo',
    'Apertura',
    'Cuerpo',
    'Tercera'
];

lnNotaVideo.sections = pageBuilderSections;

lnNotaVideo.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(lnNotaVideo);
