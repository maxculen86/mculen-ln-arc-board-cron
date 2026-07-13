import React from 'react';
import Consumer from 'fusion:consumer';
import classNames from 'classnames';
import Header from '../features/LN-10-global/header/default';
import Footer from '../private/LN10/footer';
import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import { notaAl100andStorytellingLayoutsPropTypes } from '../private/common/utils/propTypesHelper';
import InitControlGroup from './helpers/initCtrlGrp';
import Toasts from '../features/LN-10-global/common/toasts/default';
import AdsStrategySelector from '../features/LN/common/adsManager/components/adsStrategySelector';
import '../../resources/dist/css/ln/pages/photo100.css';

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
    globalContent: {
        taxonomy: { sections },
        distributor: { name }
    },
    layout
}) {
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';
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
                    <AperturaStorytelling />
                    <div id="cuerpo__nota" className="row">
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
            <Toasts />
            <AdsStrategySelector />
            <PwaModal />
            <InitControlGroup />
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
