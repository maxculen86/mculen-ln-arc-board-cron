/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Header from '../../private/LN10/header';
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
import PwaModals from '../../private/LN/common/pwaModals';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';
import {
    createViewabilityObservers,
    productClickFromServer
} from '../../private/common/utils/viewability';
import createBannersIntersectionObserver from '../../private/common/banners/createBannersIntersectionObserver';
import bannersHome from '../../private/common/banners/bannersDivHome';
import { hasBomba } from '../../private/common/banners/dynamicBanners/getDynamicBannersHelper';
import '../../../resources/packages/css/@ln/contenidos-ui-sass/index.css';
import '../../../resources/packages/css/@ln/contenidos-ui-banners/index.css';
import Ranking from '../../features/LN-10/ranking/default';
import RoofEventsScript from '../../private/common/scriptManager/RoofEventsScript';

const LN10Home = props => {
    const { children, outputType, isAdmin, renderables } = props;

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
    ] = pageBuilderSections.map((section, index) => {
        return sectionHelper(
            children[index],
            section,
            index,
            renderables,
            outputType,
            isAdmin
        );
    });

    useEffect(() => {
        createViewabilityObservers(true);
        createBannersIntersectionObserver();
    }, []);

    return (
        <GlobalProvider>
            {bannersHome.b1x1}
            {bannersHome.comercialDsk}
            {getScriptForComercial('comercial_dsk')}
            {bannersHome.comercialMob}
            {getScriptForComercial('comercial_mob')}
            <div className="wrapper home-page">
                {bannersHome.megatopDsk}
                {getStickyBanner(
                    '.ln-banner-container.--megatop_dsk.--megatop',
                    'div[data-section="pre-apertura"]'
                )}
                <section className="header-container">
                    <div data-section="cabezal">{cabezal}</div>
                    <Header />
                </section>

                <section data-section="pre-apertura" className="pre-container">
                    {preApertura}
                </section>
                <section
                    data-section="apertura"
                    className="open-container lay-container"
                >
                    {apertura}
                </section>
                <section id="content" className="main-container">
                    {bannersHome.sticky2Mob}
                    <div
                        id="content-main"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <main className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            {hasBomba(renderables) && bannersHome.caja1Mob}
                            {bannersHome.caja2Mob}
                            {bannersHome.cabezal}
                            <div data-section="breaking1">{breaking1}</div>
                        </main>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {bannersHome.megalateralDsk}
                        </aside>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            height: 300,
                            backgroundColor: 'orange',
                            margin: '56px 0 32px',
                            textAlign: 'center',
                            lineHeight: '300px'
                        }}
                    >
                        Cinturon 1
                    </div>

                    <div
                        id="content-main-2"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <main className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            {bannersHome.parallaxDsk}
                            {bannersHome.middle1Tab}

                            <div data-section="breaking2">{breaking2}</div>
                            {bannersHome.middle1Tab}
                            {/*
                            parallax2dsk
                            */}
                            {/*
                            caja8mob - parallax3dsk -middle3tab
                            */}
                            {/*
                            caja9mob - megalateral4dsk - parallax4dsk - middle4tab
                            */}
                        </main>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {bannersHome.megalateral2Dsk}
                        </aside>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            height: 300,
                            backgroundColor: 'orange',
                            margin: '56px 0 32px',
                            textAlign: 'center',
                            lineHeight: '300px'
                        }}
                    >
                        Cinturon 2
                    </div>

                    <div
                        id="content-main-3"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <main className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            <div data-section="hashtag">{hashtag}</div>

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
                        </main>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {bannersHome.megalateral3Dsk}
                        </aside>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            height: 300,
                            backgroundColor: 'orange',
                            margin: '56px 0 32px',
                            textAlign: 'center',
                            lineHeight: '300px'
                        }}
                    >
                        Cinturon 3
                    </div>

                    <div data-section="ranking" className="lay-container">
                        <Ranking {...props} id="rankingHome" />
                    </div>

                    <div
                        id="content-main-4"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <main className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            <div data-section="content">{content}</div>
                            <div data-section="canales1">{canales1}</div>
                        </main>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {/* {bannersHome.megalateral4Dsk} BORRA EL DIV DE ABAJO */}
                            <div
                                className="ln-banner-container --megalateral_dsk --megalateral --sticky"
                                style={{
                                    width: '100%',
                                    height: 600,
                                    backgroundColor: 'orange',
                                    lineHeight: '600px'
                                }}
                            >
                                Megalateral 4
                            </div>
                        </aside>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            height: 300,
                            backgroundColor: 'orange',
                            margin: '56px 0 32px',
                            textAlign: 'center',
                            lineHeight: '300px'
                        }}
                    >
                        Cinturon 4
                    </div>

                    <div
                        id="content-main-5"
                        className="lay-container grid container-op-top --grid-cols-8 --grid-cols-md-12 --grid-cols-lg-12 --grid-cols-xl-16 --gap-sm --grid-ai-stretch"
                    >
                        <main className="ln-main grid-item --0 --col-8 --col-md-12 --col-lg-12 --col-xl-12">
                            <div data-section="canales2">{canales2}</div>
                        </main>
                        <aside className="ln-aside --tablet-lg-none grid-item --1 --col-lg-4 --col-xl-4">
                            {/* {bannersHome.megalateral5Dsk} BORRAR EL DIV DE ABAJO */}
                            <div
                                className="ln-banner-container --megalateral_dsk --megalateral --sticky"
                                style={{
                                    width: '100%',
                                    height: 600,
                                    backgroundColor: 'orange',
                                    lineHeight: '600px'
                                }}
                            >
                                Megalateral 5
                            </div>
                        </aside>
                    </div>
                </section>
                <section className="footer-container">
                    <Footer />
                </section>
            </div>
            <LoadBanners blocksBanners={bannersViewport} />
            <Metarefresh />
            <PwaModals />
            <RoofEventsScript />
            {productClickFromServer()}
        </GlobalProvider>
    );
};

LN10Home.propTypes = {
    renderables: PropTypes.arrayOf(PropTypes.node),
    outputType: PropTypes.string,
    isAdmin: PropTypes.bool,
    ...homeLayoutsPropTypes
};

LN10Home.sections = pageBuilderSections;

export default Consumer(LN10Home);
