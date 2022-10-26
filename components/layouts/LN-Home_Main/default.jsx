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
import { isBombaVisible } from '../../private/LN/common/utils/homeHelper';
import sectionHelper from '../../private/LN/common/utils/sectionHelper';
import Ranking from '../../features/LN-common/ranking/default';
import SubHeader from '../../features/LN-common/subHeader';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';
import TagsListFeature from '../../features/LN-acumulado/tagList';
import CajaPromo from '../../features/LN-common/cajaPromo/default';
import { getScriptForComercial } from '../../private/common/banners/bannersRules';
import PwaModals from '../../private/LN/common/pwaModals';
import { homeLayoutsPropTypes } from '../../private/common/utils/propTypesHelper';
import {
    productClickFromServer,
    createObservers
} from '../../private/common/utils/viewability';
import createBannersIntersectionObserver from '../../private/common/banners/createBannersIntersectionObserver';
import StaticContent from '../../private/common/staticContent';
import bannersHome from '../../private/common/banners/bannersDivHome';

const LNMainHome = props => {
    const { children, outputType, isAdmin, renderables } = props;

    const [
        anticipo,
        anexo1,
        bomba,
        apertura1,
        apertura2,
        multimedia,
        anexo2,
        breaking1,
        breaking2,
        breaking3,
        anexo3,
        opinion,
        breaking4,
        breaking5,
        breaking6,
        comercial1,
        bloque2,
        comercial2,
        bloque3,
        bloque4,
        bloque5,
        bloque6,
        bloque7,
        bloque8,
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

    const showBomba = isBombaVisible(renderables);

    useEffect(() => {
        createObservers();
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
                {anticipo}

                <section
                    data-block-name="h_anexo-1"
                    data-diagramacion-id="9999"
                    data-is-block="true"
                >
                    {anexo1}
                </section>

                {showBomba && bannersHome.cabezal}

                {bomba}
                <main id="content">
                    {bannersHome.sticky2Mob}
                    <div>
                        <div id="content-main" className="lay-sidebar">
                            <div className="sidebar__main">
                                {!showBomba && bannersHome.cabezal}
                                <div data-section="apertura">
                                    {apertura1}
                                    {bannersHome.caja1Mob}
                                    {apertura2}
                                </div>
                                {bannersHome.billboard}
                                {bannersHome.caja2Mob}
                                <section data-section="multimedia">
                                    {multimedia}
                                </section>

                                <section
                                    data-section="anexo2"
                                    data-block-name="h_anexo-2"
                                    data-diagramacion-id="9999"
                                    data-is-block="true"
                                >
                                    {anexo2}
                                </section>

                                <div data-section="breaking1">{breaking1}</div>

                                <>
                                    {bannersHome.caja3Mob}
                                    <div className="row-gap-tablet-2 --ads">
                                        {bannersHome.caja1Tab}
                                        {bannersHome.caja2Tab}
                                    </div>
                                </>

                                <div className="row-gap-tablet-3 --ads">
                                    {bannersHome.caja1Dsk}
                                    {bannersHome.cajaProducto1Dsk}
                                    {bannersHome.caja2Dsk}
                                </div>

                                <div data-section="breaking2">{breaking2}</div>

                                <>
                                    {bannersHome.caja4Mob}
                                    {bannersHome.middle1Tab}
                                </>
                                {bannersHome.cinturonDsk}
                                <div data-section="breaking3">{breaking3}</div>
                                <section className="container --promos">
                                    <div className="row-gap-tablet-2">
                                        <CajaPromo
                                            customFields={{
                                                text:
                                                    'Casas, departamentos, inversiones y más',
                                                link:
                                                    'https://www.lanacion.com.ar/propiedades/',
                                                logoName: 'propiedades'
                                            }}
                                        />
                                        <CajaPromo
                                            customFields={{
                                                text:
                                                    'Agricultura, ganadería, tecnologías y más',
                                                link:
                                                    'https://www.lanacion.com.ar/economia/campo/',
                                                logoName: 'campo'
                                            }}
                                        />
                                        <CajaPromo
                                            customFields={{
                                                text:
                                                    'Vida sana, nutrición, descanso y más',
                                                link:
                                                    'https://www.lanacion.com.ar/salud/',
                                                logoName: 'salud'
                                            }}
                                        />
                                        <CajaPromo
                                            customFields={{
                                                text:
                                                    'Tendencias, test drives, eléctricos y más',
                                                link:
                                                    'https://www.lanacion.com.ar/autos/',
                                                logoName: 'autos'
                                            }}
                                        />
                                    </div>
                                </section>

                                <section
                                    data-section="anexo3"
                                    data-block-name="h_anexo-3"
                                    data-diagramacion-id="9999"
                                    data-is-block="true"
                                >
                                    {anexo3}
                                </section>

                                <>
                                    {bannersHome.caja5Mob}
                                    {bannersHome.cinturon2Dsk}
                                    {bannersHome.middle2Tab}
                                </>

                                <div
                                    data-section="opinion"
                                    className="container --opinion"
                                >
                                    {opinion}
                                </div>
                                <div className="row-gap-tablet-3 --ads">
                                    {bannersHome.caja3Dsk}
                                    {bannersHome.cajaProducto2Dsk}
                                    {bannersHome.caja4Dsk}
                                </div>
                                <div className="row-gap-tablet-2 --ads">
                                    {bannersHome.caja3Tab}
                                    {bannersHome.caja4Tab}
                                </div>
                                <div data-section="breaking4">{breaking4}</div>
                                <div data-section="breaking5">{breaking5}</div>
                                <div data-section="breaking6">{breaking6}</div>
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {bannersHome.megalateralDsk}
                            </div>
                        </div>
                        {bannersHome.parallaxMob}
                        {bannersHome.parallaxDsk}
                        <div data-section="ranking" className="lay">
                            <Ranking {...props} id="rankingHome" />
                        </div>

                        <div className="lay" data-section="comercial1">
                            {comercial1}
                        </div>
                        <div id="content-main-2" className="lay-sidebar">
                            {/* Cuerpo */}
                            <div className="sidebar__main">
                                <div id="bloque2" data-section="bloque2">
                                    {bloque2}
                                </div>
                                <div id="comercial2" data-section="comercial2">
                                    {comercial2}
                                </div>
                                <div id="bloque3" data-section="bloque3">
                                    {bloque3}
                                </div>
                                <div id="bloque4" data-section="bloque4">
                                    {bloque4}
                                </div>
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {bannersHome.megalateral2Dsk}
                            </div>
                        </div>

                        <div id="content-main-3" className="lay-sidebar">
                            <div className="sidebar__main">
                                <div data-section="bloque5">{bloque5}</div>
                                <div data-section="bloque6">{bloque6}</div>
                                <div data-section="bloque7">{bloque7}</div>
                                <div data-section="bloque8">{bloque8}</div>
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
                                <Ranking {...props} id="inverse-home" />
                                <div className="acumulado">
                                    <section className="mod-linklist">
                                        <TagsListFeature
                                            id="TagsListFeatureHome"
                                            title="Temas del día:"
                                            isHome
                                        />
                                    </section>
                                </div>
                            </div>
                            <div className="sidebar__aside hlp-tabletlm-none">
                                {bannersHome.megalateral3Dsk}
                            </div>
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

LNMainHome.propTypes = {
    renderables: PropTypes.arrayOf(PropTypes.node),
    outputType: PropTypes.string,
    isAdmin: PropTypes.bool,
    ...homeLayoutsPropTypes
};

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
