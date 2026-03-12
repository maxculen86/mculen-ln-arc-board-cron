import React from 'react';
import { useAppContext } from 'fusion:context';
import { showGlossaryByLayout } from './helpers';
import Header from '../../header/default';
import Footer from '../../../../private/LN10/footer';
import Glossary from '../../glossary/default';
import PwaModal from '../../pwaModal/default';
import LoadBannersSSR from '../../../../private/common/banners/LoadBannersSSR';
import InitControlGroup from '../../../../layouts/helpers/initCtrlGrp';
import Toasts from '../toasts/default';

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
            <LoadBannersSSR />
            <PwaModal />
            <InitControlGroup />
        </div>
    );
}

export default BaseLayout;
