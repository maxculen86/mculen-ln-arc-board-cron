import React from 'react';
import { useAppContext } from 'fusion:context';
import { showGlossaryByLayout } from './helpers';
import Header from '../../header/default';
import Footer from '../../../../private/LN10/footer';
import Glossary from '../../glossary/default';
import PwaModal from '../../pwaModal/default';
import InitControlGroup from '../../../../layouts/helpers/initCtrlGrp';
import Toasts from '../toasts/default';
import AdsStrategySelector from '../../../LN/common/adsManager/components/adsStrategySelector';

export function BaseLayout({ children, className = '' }) {
    const { layout } = useAppContext();

    const showGlossary = showGlossaryByLayout(layout);

    return (
        <div id="wrapper" className={className}>
            <Header />
            {children}
            <div className="footer-container --no-app">
                <Footer />
            </div>
            <Toasts />
            <Glossary showGlossary={showGlossary} />
            <AdsStrategySelector />
            <PwaModal />
            <InitControlGroup />
        </div>
    );
}

export default BaseLayout;
