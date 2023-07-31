import React from 'react';
import Consumer from 'fusion:consumer';
import StaticValidation from '../private/common/staticValidation';
import Header from '../private/LN/common/header';
import Footer from '../private/LN10/footer';
import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';
import '../../resources/dist/css/ln/pages/storytelling.css';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import PwaModals from '../private/LN/common/pwaModals';
import { notaAl100andStorytellingLayoutsPropTypes } from '../private/common/utils/propTypesHelper';
import intersectionObserverForRelatedTags from '../private/common/utils/relatedTagTracker';
import isAllowedSection from '../private/LN/common/utils/isAllowedSection';
import listOfAllowedSection from '../private/LN/common/media/helpers/allowSectionAndLayout';
import get from '../private/common/utils/get';

const lnNotaStorytelling = ({
    children,
    outputType,
    tree,
    isAdmin,
    layout,
    globalContent: {
        taxonomy: { sections },
        distributor: { name },
        subtype = ''
    },
    globalContent
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const isLoadWithPicture =
        isAllowedSection({
            globalContent,
            listOfAllowedSection,
            noteType: subtype
        }) && !amp;

    const withVideoBackground = Boolean(
        get(globalContent, 'promo_items.storytelling', null)
    );

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

                    {isLoadWithPicture && !withVideoBackground ? (
                        <StaticValidation
                            id="static-opening"
                            htmlOnly
                            persistent
                        >
                            <AperturaStorytelling
                                isLoadWithPicture={isLoadWithPicture}
                            />
                        </StaticValidation>
                    ) : (
                        <AperturaStorytelling
                            isLoadWithPicture={isLoadWithPicture}
                        />
                    )}

                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            <section className="cuerpo__nota">
                                <div className="row">
                                    <div className="col-12 col-desksm-1">
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
                <div className="footer-container --no-app">
                    <Footer outputType={outputType} />
                </div>
            </div>
            <LoadBannersSSR />
            <PwaModals />
            {intersectionObserverForRelatedTags(outputType)}
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
