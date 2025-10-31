/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Header from '../../features/LN-10-global/header/default';
import Footer from '../../private/LN10/footer';
import GlobalProvider from '../../private/common/context/globalContext';
import LoadBanners from '../../private/common/banners/LoadBanners';
import { bannersViewport } from '../../private/common/banners/bannersHomeLN10.json';
import Metarefresh from '../../features/LN-common/metarefresh';
import sectionHelper from '../../private/LN/common/utils/sectionHelperLN10';
import pageBuilderSections from '../config/LN10-PageBuilder.config.json';
import {
    getScriptForComercial,
    getStickyBanner
} from '../../private/common/banners/bannersRules';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';
import { createViewabilityObservers } from '../../private/common/utils/viewability';
import bannersHome from '../../private/common/banners/bannersDivHome';
import { hasBomba } from '../../private/common/banners/dynamicBanners/getDynamicBannersHelper';
import Ranking from '../../features/LN-10/ranking/default';
import RoofEventsScript from '../../private/common/scriptManager/RoofEventsScript';
import YouTubeLazyLoadScript from '../../private/common/scriptManager/YouTubeLazyLoadScript';
import ScriptViewability from '../../private/common/utils/ScriptViewability';
import DynamicStylesheetLoader from '../../output-types/criticalCss/dynamicStylesheetLoader';
import {
    createBannersIntersectionObserver,
    createDifferVideosObserver
} from '../../private/common/banners/intersectionObservers';
import PwaModal from '../../features/LN-10-global/pwaModal/default';
import InitControlGroup from '../helpers/initCtrlGrp';

function LN10Home(props) {
    const {
        children,
        outputType,
        isAdmin,
        renderables,
        contextPath,
        deployment,
        layout,
        arcSite
    } = props;

    const [
        cabezal,
        preApertura,
        apertura,
        breaking1,
        breaking2,
        hashtag,
        content,
        canales1,
        canales2,
        appAnexo1,
        appAnexo2
    ] = pageBuilderSections.map((section, index) =>
        sectionHelper(
            children[index],
            section,
            index,
            renderables,
            outputType,
            isAdmin
        )
    );

    useEffect(() => {
        createViewabilityObservers(true);
        createBannersIntersectionObserver();
        if (!isAdmin) {
            createDifferVideosObserver();
        }
    }, [isAdmin]);

    return (
        <GlobalProvider>
            {bannersHome.b1x1}
            {bannersHome.comercialDsk}
            {getScriptForComercial()}
            {bannersHome.comercialMob}
            <DynamicStylesheetLoader
                contextPath={contextPath}
                deployment={deployment}
                layout={layout}
                arcSite={arcSite}
            />
            <div className="wrapper homepage overflow-x-clip">
                {bannersHome.megatopDsk}
                {bannersHome.megatopTab}
                {getStickyBanner(
                    '.ln-banner-container.--megatop_dsk.--megatop,.ln-banner-container.--megatop_tab.--megatop',
                    'section[data-section="pre-apertura"]'
                )}
                <div className="--no-app">
                    <div data-section="cabezal">{cabezal}</div>
                    <Header />
                </div>
                <main className="main-container">
                    <section
                        data-section="pre-apertura"
                        className="pre-container mb-32"
                    >
                        {preApertura}
                    </section>
                    {hasBomba(renderables) && bannersHome.caja1Mob}
                    <section
                        data-section="apertura"
                        className="open-container lay-container"
                    >
                        {apertura}
                    </section>
                    {bannersHome.sticky2Mob}
                    <section
                        id="content-main"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <div className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            {bannersHome.caja2Mob}
                            {bannersHome.cabezal}
                            <div data-section="breaking1">{breaking1}</div>
                        </div>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {bannersHome.megalateralDsk}
                        </aside>
                    </section>
                    {bannersHome.cinturonDsk}
                    <section
                        id="content-main-2"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <div className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            <div data-section="breaking2">{breaking2}</div>
                            {bannersHome.middle1Tab}
                        </div>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {bannersHome.megalateral2Dsk}
                        </aside>
                    </section>
                    {bannersHome.cinturon2Dsk}
                    <section
                        id="content-main-3"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <div className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            <div data-section="hashtag">{hashtag}</div>
                            {bannersHome.caja8Mob}
                            {(isAdmin || outputType === 'json') && (
                                <>
                                    <section data-section="app-anexo-1">
                                        {appAnexo1}
                                    </section>
                                    <section data-section="app-anexo-2">
                                        {appAnexo2}
                                    </section>
                                </>
                            )}
                            {bannersHome.adhesionDsk}
                            {bannersHome.adhesionMob}
                            {bannersHome.adhesionTab}
                        </div>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {bannersHome.megalateral3Dsk}
                        </aside>
                    </section>
                    {bannersHome.cinturon3Dsk}
                    <section data-section="ranking" className="lay-container">
                        <Ranking {...props} id="rankingHome" />
                    </section>

                    <section data-section="content" className="lay-container">
                        {content}
                    </section>

                    <section
                        id="content-main-4"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <div className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            <div data-section="canales1">{canales1}</div>
                            {bannersHome.caja9Mob}
                        </div>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {bannersHome.megalateral4Dsk}
                        </aside>
                    </section>
                    {bannersHome.cinturon4Dsk}
                    <section
                        id="content-main-5"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <div className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            <div data-section="canales2">{canales2}</div>
                        </div>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {bannersHome.megalateral5Dsk}
                        </aside>
                    </section>
                </main>
                <div className="footer-container --no-app">
                    <Footer />
                </div>
            </div>
            <LoadBanners blocksBanners={bannersViewport} />
            <Metarefresh />
            <PwaModal />
            <RoofEventsScript />
            <YouTubeLazyLoadScript />
            <ScriptViewability />
            <InitControlGroup />
        </GlobalProvider>
    );
}

LN10Home.propTypes = {
    renderables: PropTypes.arrayOf(PropTypes.node),
    outputType: PropTypes.string,
    isAdmin: PropTypes.bool,
    ...homeLayoutsPropTypes
};

LN10Home.sections = pageBuilderSections;

export default Consumer(LN10Home);
