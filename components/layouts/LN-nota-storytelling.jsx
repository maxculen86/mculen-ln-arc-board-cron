import React from 'react';
import Consumer from 'fusion:consumer';
import classNames from 'classnames';
import Header from '../features/LN-10-global/header/default';
import Footer from '../private/LN10/footer';
import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';
import GlobalProvider from '../private/common/context/globalContext';
import {
    getSectionLogo,
    getAFondoLogo
} from '../private/common/utils/sectionUtils';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import { notaAl100andStorytellingLayoutsPropTypes } from '../private/common/utils/propTypesHelper';
import get from '../private/common/utils/get';
import Glossary from '../features/LN-10-global/glossary/default';
import InitControlGroup from './helpers/initCtrlGrp';
import Toasts from '../features/LN-10-global/common/toasts/default';
import AdsStrategySelector from '../features/LN/common/adsManager/components/adsStrategySelector';
import '../../resources/dist/css/ln/pages/storytelling.css';

function lnNotaStorytelling({
    children,
    outputType,
    layout,
    globalContent: {
        taxonomy: { sections, tags = [] },
        distributor: { name }
    },
    globalContent
}) {
    const withoutVideoBackground = !(
        get(globalContent, 'promo_items.storytelling', null) ||
        get(globalContent, 'promo_items.video_jw', null)
    );
    const bannerMegatop = children[0];
    const aFondoLogo = getAFondoLogo(tags, layout);
    const logo = aFondoLogo || getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';

    const classNameWrapper = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        magazine,
        '--storytelling'
    );

    return (
        <GlobalProvider>
            {bannerMegatop}
            <div id="wrapper" className={classNameWrapper}>
                <Header />
                <main id="content" className="--header-fixed-margin">
                    {children[1]}
                    <AperturaStorytelling
                        withoutVideoBackground={withoutVideoBackground}
                    />
                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            <section id="cuerpo__nota" className="cuerpo__nota">
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
            <Toasts />
            <AdsStrategySelector />
            <PwaModal />
            <Glossary />
            <InitControlGroup />
        </GlobalProvider>
    );
}

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
