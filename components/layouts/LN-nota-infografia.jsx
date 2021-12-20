/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import PwaModals from '../private/LN/common/pwaModals';

const lnNotaInfografia = ({
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
            {bannerMegatop}
            <div id="wrapper" className={`nota --info ${magazine} ${amp}`}>
                <Header />
                <main id="content">
                    {children[1]}
                    <div className="lay --apertura">
                        <div className="row">
                            <div className="col-12">
                                {/* Titulo (breadcrumb, logo+titulo) */}
                                {children[2]}
                            </div>
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
            <LoadBannersSSR />
            <PwaModals />
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

lnNotaInfografia.sections = pageBuilderSections;

lnNotaInfografia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    outputType: PropTypes.string,
    tree: PropTypes.shape(PropTypes.node),
    isAdmin: PropTypes.bool,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string
                })
            )
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        })
    }),
    layout: PropTypes.string
};

export default Consumer(lnNotaInfografia);
