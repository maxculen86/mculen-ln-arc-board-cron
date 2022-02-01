import React from 'react';
import Consumer from 'fusion:consumer';
import StaticValidation from '../private/common/staticValidation';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';
import '../../resources/dist/css/ln/pages/storytelling.css';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import PwaModals from '../private/LN/common/pwaModals';
import { notaAl100andStorytellingLayoutsPropTypes } from '../private/common/utils/propTypesHelper';

const lnNotaStorytelling = ({
    children,
    outputType,
    tree,
    isAdmin,
    layout,
    globalContent: {
        taxonomy: { sections },
        distributor: { name }
    }
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';
    return (
        <GlobalProvider>
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
                                                {children[3]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {children[4]}
                        </div>
                    </div>
                    <div className="lay">{children[5]}</div>
                    <div className="lay-sidebar">
                        <div className="sidebar__main">{children[6]}</div>
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {children[7]}
                        </div>
                    </div>
                </main>
                <StaticValidation id="StaticFooter" htmlOnly persistent>
                    <Footer />
                </StaticValidation>
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
    'Tercera',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaStorytelling.sections = pageBuilderSections;

lnNotaStorytelling.propTypes = notaAl100andStorytellingLayoutsPropTypes;

export default Consumer(lnNotaStorytelling);
