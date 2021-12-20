import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';

import '../../resources/dist/css/ln/pages/photo100.css';

import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import PwaModals from '../private/LN/common/pwaModals';

const lnNotaFotoAl100 = ({
    children: [
        bannerMegatop,
        preTitulo,
        leftCuerpo,
        cuerpo,
        postCuerpo,
        postCuerpoTercera,
        newsletter,
        bottom,
        bottomTercera
    ],
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
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';
    return (
        <GlobalProvider>
            {/* Banner MEGATOP */}
            {getBannerMegatop(bannerMegatop, amp, tree, isAdmin)}

            <div
                id="wrapper"
                className={`nota ${magazine} --photo100 --transparent ${amp}`}
            >
                <Header />
                <main id="content">
                    {preTitulo}
                    <AperturaStorytelling />

                    {/* Cuerpo al 100% */}
                    <div className="row">
                        {leftCuerpo}
                        {cuerpo}
                    </div>

                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            {/* Post-Cuerpo */}
                            {postCuerpo}
                        </div>
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {/* Post-Cuerpo-Tercera */}
                            {postCuerpoTercera}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="lay">{newsletter}</div>

                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            {/* Bottom */}
                            {bottom}
                        </div>
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {/* Bottom-Tercera */}
                            {bottomTercera}
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
    'Left-Cuerpo',
    'Cuerpo',
    'Post-Cuerpo',
    'Post-Cuerpo-Tercera',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaFotoAl100.sections = pageBuilderSections;

lnNotaFotoAl100.propTypes = {
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

export default Consumer(lnNotaFotoAl100);
