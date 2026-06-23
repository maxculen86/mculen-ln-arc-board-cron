import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import classNames from 'classnames';
import Header from '../features/LN-10-global/header/default';
import HtmlLibre, {
    HTML_LIBRE_SCROLL_CONTENT_SELECTOR
} from '../private/LN/nota/cuerpo/htmlLibre';
import AdsStrategySelector from '../features/LN/common/adsManager/components/adsStrategySelector';
import GlobalProvider from '../private/common/context/globalContext';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import InitControlGroup from './helpers/initCtrlGrp';
import useScrollDispatcher from '../features/LN-common/hooks/useScrollDispatcher';
import registerScrollTracking from '../features/LN/DS-Body/helpers/registerScrollTracking';

function lnNotaNoticia({
    children: [bannerMegatop, bottom, bottomTercera] = [],
    globalContent = {}
}) {
    const { _id: noteId } = globalContent;
    const classNameWrapper = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        'html-libre'
    );

    useScrollDispatcher({
        startSelector: HTML_LIBRE_SCROLL_CONTENT_SELECTOR,
        endSelector: HTML_LIBRE_SCROLL_CONTENT_SELECTOR
    });

    useEffect(() => {
        registerScrollTracking(noteId);
    }, [noteId]);

    return (
        <GlobalProvider>
            {bannerMegatop}
            <div id="wrapper" className={classNameWrapper}>
                <Header />
                <main id="content" className="--header-fixed-margin">
                    <div
                        className="lay --apertura"
                        style={{ maxWidth: '100%', padding: '0rem' }}
                    >
                        <div className="row">
                            <div className="col-12">
                                {/* Html libre */}
                                <HtmlLibre />
                            </div>
                        </div>
                    </div>

                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            {/* Bottom */}
                            {bottom}
                        </div>
                        <div className="sidebar__aside">
                            {/* Bottom-Tercera */}
                            {bottomTercera}
                        </div>
                    </div>
                </main>
            </div>
            <AdsStrategySelector />
            <PwaModal />
            <InitControlGroup />
        </GlobalProvider>
    );
}

lnNotaNoticia.sections = ['Banner-Megatop', 'Bottom', 'Bottom-Tercera'];

export default Consumer(lnNotaNoticia);
