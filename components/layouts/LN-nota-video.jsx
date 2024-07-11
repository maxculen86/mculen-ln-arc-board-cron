import React from 'react';
import classNames from 'classnames';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Header from '../features/LN-10-global/header/default';
import Footer from '../private/LN10/footer';
import PwaModal from '../features/LN-10-global/pwaModal/default';

import '../../resources/dist/css/ln/pages/video.css';

import GlobalProvider from '../private/common/context/globalContext';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';

import intersectionObserverForRelatedTags from '../private/common/utils/relatedTagTracker';

const lnNotaVideo = ({ children, outputType }) => {
    const bannerMegatop = children[0];

    const classNameWrapper = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        'video'
    );

    return (
        <GlobalProvider>
            {/* Banner MEGATOP */}
            {bannerMegatop}
            {/* Banner MEGATOP */}
            <div id="wrapper" className={classNameWrapper}>
                <Header />
                <main id="content">
                    <div className="--apertura">
                        {children[1]}
                        <div className="lay">
                            <div className="row">
                                <div className="col-desksm-4">
                                    {/* Titulo, bajada, fecha, firma y share, */}
                                    {children[2]}
                                </div>
                                <div className="col-desksm-8">
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
                                    <div className="col-12">{children[4]}</div>
                                </div>
                            </section>
                        </div>

                        {/* Tercera */}
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {children[5]}
                        </div>
                    </div>
                </main>
                <div className="footer-container --no-app">
                    <Footer />
                </div>
            </div>
            <LoadBannersSSR />
            <PwaModal />
            {intersectionObserverForRelatedTags(outputType)}
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
