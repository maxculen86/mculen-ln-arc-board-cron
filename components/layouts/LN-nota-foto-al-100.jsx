import React from 'react';
import Consumer from 'fusion:consumer';
import classNames from 'classnames';
import Header from '../features/LN-10-global/header/default';
import Footer from '../private/LN10/footer';
import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';
import '../../resources/dist/css/ln/pages/photo100.css';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import { PwaModal } from '../features/LN-10-global/pwaModal/default';
import listOfAllowedSection from '../private/LN/common/media/helpers/allowSectionAndLayout';
import { notaAl100andStorytellingLayoutsPropTypes } from '../private/common/utils/propTypesHelper';
import intersectionObserverForRelatedTags from '../private/common/utils/relatedTagTracker';
import isAllowedSection from '../private/LN/common/utils/isAllowedSection';
import get from '../private/common/utils/get';
import Glossary from '../features/LN-10-global/glossary/default';
import InitControlGroup from './helpers/initCtrlGrp';

function lnNotaFotoAl100({
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
    globalContent: {
        taxonomy: { sections },
        distributor: { name },
        subtype
    },
    layout,
    globalContent
}) {
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';
    const isLoadWithPicture = isAllowedSection({
        globalContent,
        listOfAllowedSection,
        noteType: subtype
    });
    const withoutVideoBackground = !(
        get(globalContent, 'promo_items.storytelling', null) ||
        get(globalContent, 'promo_items.video_jw', null)
    );
    const classNameWrapper = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        magazine,
        '--photo100'
    );

    return (
        <GlobalProvider>
            {bannerMegatop}
            <div id="wrapper" className={classNameWrapper}>
                <Header />
                <main id="content" className="--header-fixed-margin">
                    {preTitulo}
                    {isLoadWithPicture &&
                        withoutVideoBackground(
                            <AperturaStorytelling
                                isLoadWithPicture={isLoadWithPicture}
                            />
                        )}
                    <div className="row">
                        {leftCuerpo}
                        {cuerpo}
                    </div>

                    <div className="lay-sidebar">
                        <div className="sidebar__main">{postCuerpo}</div>
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {postCuerpoTercera}
                        </div>
                    </div>
                    <div className="lay">{newsletter}</div>
                    <div className="lay-sidebar">
                        <div className="sidebar__main">{bottom}</div>
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {bottomTercera}
                        </div>
                    </div>
                </main>
                <div className="footer-container --no-app">
                    <Footer />
                </div>
            </div>
            <LoadBannersSSR />
            <PwaModal />
            <Glossary />
            <InitControlGroup />
            {intersectionObserverForRelatedTags(outputType)}
        </GlobalProvider>
    );
}

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

lnNotaFotoAl100.propTypes = notaAl100andStorytellingLayoutsPropTypes;

export default Consumer(lnNotaFotoAl100);
