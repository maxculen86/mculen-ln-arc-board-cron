import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import HtmlLibre from '../private/LN/nota/cuerpo/htmlLibre';

import GlobalProvider from '../private/common/context/globalContext';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import PwaModals from '../private/LN/common/pwaModals';

const lnNotaNoticia = ({
    children: [bannerMegatop, bottom, bottomTercera],
    outputType,
    tree,
    isAdmin
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';

    return (
        <GlobalProvider>
            {/* Banner Megatop */}
            {getBannerMegatop(bannerMegatop, amp, tree, isAdmin)}

            <div id="wrapper" className={`nota html-libre ${amp}`}>
                <Header />
                <main id="content">
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
            <LoadBannersSSR />
            <PwaModals />
        </GlobalProvider>
    );
};

lnNotaNoticia.sections = ['Banner-Megatop', 'Bottom', 'Bottom-Tercera'];

lnNotaNoticia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(lnNotaNoticia);
