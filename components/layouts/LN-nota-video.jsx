import React from 'react';
import classNames from 'classnames';
import Consumer from 'fusion:consumer';
import { cx } from '@ln/cva';
import Header from '../features/LN-10-global/header/default';
import Footer from '../private/LN10/footer';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import GlobalProvider from '../private/common/context/globalContext';
import AdsStrategySelector from '../features/LN/common/adsManager/components/adsStrategySelector';
import InitControlGroup from './helpers/initCtrlGrp';
import Toasts from '../features/LN-10-global/common/toasts/default';
import '../../resources/dist/css/ln/pages/video.css';
import NotaVideoOpening from './LN-nota-video/components/NotaVideoOpening';
import NotaVideoOpeningDescription from './LN-nota-video/components/NotaVideoOpeningDescription';
import NotaVideoOpeningMedia from './LN-nota-video/components/NotaVideoOpeningMedia';
import { getNotaVideoOpeningData } from './LN-nota-video/_helpers/helpers';

function lnNotaVideo({ children, globalContent, layout }) {
    const bannerMegatop = children[0];
    const { promo_items: promoItems = {}, subtype } = globalContent || {};

    const { variant, mediaData } = getNotaVideoOpeningData(promoItems, subtype);

    const classNameWrapper = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        'video'
    );

    return (
        <GlobalProvider>
            {/* Banner MEGATOP */}
            {bannerMegatop}
            {/* Banner MEGATOP */}
            <div id="wrapper" className={classNameWrapper}>
                <Header />
                <main id="content">
                    <section
                        className={cx(
                            'opening-video',
                            `video-${variant}`,
                            'text-neutral-light-1',
                            'mb-32',
                            'pb-24 pb-16_md pb-32_l pb-24_lg',
                            '-mt-65',
                            '-mt-87_md',
                            '-mt-57_l',
                            variant === 'horizontal'
                                ? [
                                      'bg-light-900',
                                      'pt-86',
                                      'pt-111_md',
                                      'pt-89_l'
                                  ]
                                : [
                                      'bg-neutral-dark-1',
                                      'pt-65',
                                      'pt-87_md',
                                      'pt-57_l'
                                  ]
                        )}
                    >
                        {children[1]}
                        <NotaVideoOpening>
                            <NotaVideoOpeningMedia
                                mediaData={mediaData}
                                variant={variant}
                            />
                            <NotaVideoOpeningDescription
                                globalContent={globalContent}
                                layout={layout}
                                variant={variant}
                            />
                        </NotaVideoOpening>
                    </section>
                    <div className="lay-sidebar">
                        {/* Cuerpo */}
                        <div className="sidebar__main">
                            <section id="cuerpo__nota" className="cuerpo__nota">
                                <div className="row">
                                    <div className="col-12">{children[4]}</div>
                                </div>
                            </section>
                        </div>

                        {/* Tercera */}
                        <div className="sidebar__aside hlp-tabletlm-none">
                            {children[5]}
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
    'Titulo',
    'Apertura',
    'Cuerpo',
    'Tercera'
];

lnNotaVideo.sections = pageBuilderSections;

export default Consumer(lnNotaVideo);
