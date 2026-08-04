import React from 'react';
import Header from '../../header/default';
import Footer from '../../../../private/LN10/footer';
import PwaModal from '../../pwaModal/default';
import InitControlGroup from '../../../../layouts/helpers/initCtrlGrp';
import ToastsContainer from '../../../ui/ln/toastsContainer/default';
import AdsStrategySelector from '../../../LN/common/adsManager/components/adsStrategySelector';

export function BaseLayout({ children, className = '' }) {
    return (
        <div id="wrapper" className={className}>
            <Header />
            {children}
            <div className="footer-container --no-app">
                <Footer />
            </div>
            <ToastsContainer />
            <AdsStrategySelector />
            <PwaModal />
            <InitControlGroup />
        </div>
    );
}

export default BaseLayout;
