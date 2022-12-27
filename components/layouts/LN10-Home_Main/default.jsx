/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Header from '../../private/LN/common/header';
import Footer from '../../private/LN/common/footer';
import GlobalProvider from '../../private/common/context/globalContext';
import LoadBanners from '../../private/common/banners/LoadBanners';
import { bannersViewport } from '../../private/common/banners/bannersHome.json';
import Metarefresh from '../../features/LN-common/metarefresh';
import sectionHelper from '../../private/LN/common/utils/sectionHelperLN10';
import Ranking from '../../features/LN-common/ranking/default';
import SubHeader from '../../features/LN-common/subHeader';
import pageBuilderSections from '../config/LN10-PageBuilder.config.json';
import { getScriptForComercial } from '../../private/common/banners/bannersRules';
import PwaModals from '../../private/LN/common/pwaModals';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';
import { productClickFromServer } from '../../private/common/utils/viewability';
import createBannersIntersectionObserver from '../../private/common/banners/createBannersIntersectionObserver';
import StaticContent from '../../private/common/staticContent';
import bannersHome from '../../private/common/banners/bannersDivHome';

const LN10Home = props => {
    const { children, outputType, isAdmin, renderables } = props;

    const [
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
        // createViewabilityObservers();
        createBannersIntersectionObserver();
    }, []);

    return (
        <GlobalProvider>
            {bannersHome.b1x1}
            {bannersHome.comercialDsk}
            {getScriptForComercial('comercial_dsk')}
            {bannersHome.comercialMob}
            {getScriptForComercial('comercial_mob')}
            <div id="wrapper" className="home">
                <Header />
                <SubHeader />
                <main id="content">
                    {bannersHome.sticky2Mob}
                    <div>
                        <div id="content-main" className="lay-sidebar">
                            <div className="sidebar__main">
                                <div data-section="apertura">{preApertura}</div>
                                <div data-section="apertura">{apertura}</div>
                                {bannersHome.caja2Mob}
                                {bannersHome.cabezal}
                                <div data-section="breaking1">{breaking1}</div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {bannersHome.megalateralDsk}
                                </div>
                                {bannersHome.parallaxDsk}
                                {bannersHome.middle1Tab}
                                <div data-section="breaking2">{breaking2}</div>
                                <div
                                    id="content-main-2"
                                    className="lay-sidebar"
                                >
                                    <div className="sidebar__aside hlp-tabletlm-none">
                                        {bannersHome.megalateral2Dsk}
                                    </div>
                                </div>
                                {/*
                                parallax2dsk
                                 */}
                                {bannersHome.middle1Tab}
                                <div data-section="hashtag">{hashtag}</div>
                                <div className="sidebar__aside hlp-tabletlm-none">
                                    {bannersHome.megalateral3Dsk}
                                </div>
                                {/*
                                caja8mob - parallax3dsk -middle3tab
                                 */}
                                <div data-section="ranking" className="lay">
                                    <Ranking {...props} id="rankingHome" />
                                </div>
                                <div data-section="content">{content}</div>
                                <div data-section="canales1">{canales1}</div>
                                {/*
                                caja9mob - megalateral4dsk - parallax4dsk - middle4tab
                                 */}
                                <div data-section="canales2">{canales2}</div>
                            </div>
                        </div>
                    </div>
                    <div id="content-main-3" className="lay-sidebar">
                        <div className="sidebar__main">
                            {(isAdmin || outputType === 'json') && (
                                <div>
                                    <section data-section="app-anexo-1">
                                        {appAnexo1}
                                    </section>
                                    <section data-section="app-anexo-2">
                                        {appAnexo2}
                                    </section>
                                </div>
                            )}
                        </div>
                        <div className="lay-sidebar">
                            <div className="sidebar__main">
                                {bannersHome.adhesionDsk}
                                {bannersHome.adhesionMob}
                                {bannersHome.adhesionTab}
                            </div>
                        </div>
                    </div>
                </main>
                <StaticContent>
                    <Footer home />
                </StaticContent>
            </div>
            <LoadBanners blocksBanners={bannersViewport} />
            <Metarefresh />
            <PwaModals />
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
